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
    public class ActivityResolveBusMove : IActivityResolver
    {
        public ActivityType ActivityType => ActivityType.BusStopCheck;

        private readonly IEventEmitter _eventEmitter;

        private readonly IDatabaseService _databaseService;

        public ActivityResolveBusMove(IEventEmitter eventEmitter, IDatabaseService databaseService)
        {
            this._eventEmitter = eventEmitter;
            this._databaseService = databaseService;
        }

        private const string StopId = "STOPID";

        /// <summary>
        /// ADITIONAL INFO STOPID=IDPRZYSKANTKU;
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="connection"></param>
        public void Resolve(ActivitySendDto dto, IConnection connection)
        {
            using (var db = _databaseService.CreateContext())
            {
                var additionalInfo = ActivityHelper.GetData(dto.AdditionalInfo);
                if (string.IsNullOrEmpty(dto.DeviceId) ||
                    !additionalInfo.ContainsKey(StopId) ||
                    string.IsNullOrEmpty(additionalInfo[StopId])) throw new InvalidOperationException();


                var busId = Convert.ToInt32(dto.DeviceId);

                var bus = db.Buss.Find(busId);

                var course = db.Courses.Include(x => x.Bus).FirstOrDefault(x => x.Ended == false && x.Bus.Id == bus.Id);

                var busStopId = Convert.ToInt32(additionalInfo[StopId]);

                var busstop = db.BusStops.First(x => x.Id == busStopId);

                if (course == null) throw new Exception("Cant find course");

                var activity = ActivityHelper.GetPreparedActivity(dto, connection, db);

                activity.BusStop = busstop;
                activity.Bus = bus;
                activity.Course = course;

                db.Activities.Add(activity);

                db.SaveChanges();

                _eventEmitter.Emit(ActivityHelper.CreateEventDto(dto, dto.Type.ToString()), EventType.BusAction, bus.Id);
            }
        }
    }
}
