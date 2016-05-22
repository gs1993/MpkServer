using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer;
using Data.Service;
using WebSocketServer.Connection;
using WebSocketServer.Events;

namespace WebSocketServer.Activity.Resolvers
{
    public class ActivityResolveBusEndCourse:IActivityResolver
    {
        public ActivityType ActivityType => ActivityType.EndCourse;

        private readonly IEventEmitter _eventEmitter;

        private readonly IDatabaseService _databaseService;

        public ActivityResolveBusEndCourse(IEventEmitter eventEmitter, IDatabaseService databaseService)
        {
            _eventEmitter = eventEmitter;
            _databaseService = databaseService;
        }

        public void Resolve(ActivitySendDto dto, IConnection connection)
        {
            using (var db = _databaseService.CreateContext())
            {
                if (string.IsNullOrEmpty(dto.DeviceId)) throw new InvalidOperationException();

                var busId = Convert.ToInt32(dto.DeviceId);

                var bus = db.Buss.Find(busId);

                var course = db.Courses.Include(x => x.Bus).FirstOrDefault(x => x.Ended == false && x.Bus.Id == bus.Id);

                if (course == null) throw new Exception("Cant find course");

                var activity = ActivityHelper.GetPreparedActivity(dto, connection, db);

                activity.Bus = bus;
                activity.Course = course;

                db.Activities.Add(activity);

                course.Ended = true;

                db.SaveChanges();

                _eventEmitter.Emit(ActivityHelper.CreateEventDto(dto, dto.Type.ToString()), EventType.BusAction, bus.Id);
            }
        }
    }
}
