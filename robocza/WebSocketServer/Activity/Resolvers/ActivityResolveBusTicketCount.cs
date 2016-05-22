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
    public class ActivityResolveBusTicketCount:IActivityResolver
    {
        public ActivityType ActivityType => ActivityType.TicketCheck;

        private IDatabaseService _databaseService;

        private IEventEmitter _eventEmitter;

        public ActivityResolveBusTicketCount(IDatabaseService databaseService, IEventEmitter eventEmitter)
        {
            _databaseService = databaseService;
            _eventEmitter = eventEmitter;
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

                activity.Course = course;

                db.Activities.Add(activity);

                db.SaveChanges();

                _eventEmitter.Emit(ActivityHelper.CreateEventDto(dto, dto.Type.ToString()), EventType.BusAction, bus.Id);
            }
        }
    }
}
