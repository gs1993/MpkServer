using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer;
using Core.Transfer.ActivityController;
using Core.Transfer.Emit;
using Data.Models;
using Data.Service;
using WebSocketServer.Connection;
using WebSocketServer.Events;

namespace WebSocketServer.Activity.Resolvers
{
    public class ActivityResolveBurStartCourse : IActivityResolver
    {
        public ActivityType ActivityType => ActivityType.StartCourse;

        private readonly IDatabaseService _databaseService;

        private readonly IEventEmitter _eventEmitter;

        public ActivityResolveBurStartCourse(IDatabaseService databaseService, IEventEmitter eventEmitter)
        {
            _databaseService = databaseService;
            _eventEmitter = eventEmitter;
        }

        private const string TrackId = "TRACKID";

        /// <summary>
        /// ADITIONAL INFO TRACKID
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="connection"></param>
        public void Resolve(ActivitySendDto dto, IConnection connection)
        {
            using (var db = _databaseService.CreateContext())
            {
                var additionalInfo = ActivityHelper.GetData(dto.AdditionalInfo);
                //TODO przerobić aditional info, teraz nie mam na to czasu
                if (string.IsNullOrEmpty(dto.DeviceId) ||
                    !additionalInfo.ContainsKey(TrackId) ||
                    string.IsNullOrEmpty(additionalInfo[TrackId])) throw new InvalidOperationException("Brak TRACKID");

                var busId = Convert.ToInt32(dto.DeviceId);

                var trackId = Convert.ToInt32(additionalInfo[TrackId]);

                var track = db.Tracks.First(x => x.Id == trackId);

                var activity = ActivityHelper.GetPreparedActivity(dto, connection, db);

                var bus = db.Buss.Find(busId);

                if (db.Courses.Any(x => x.Bus.Id == bus.Id && x.Ended == false))
                    throw new Exception("Bus already doing course");


                bus.BusStatus=Status.Working;

                activity.Bus = bus;

                activity = db.Activities.Add(activity);

                var course = new Course()
                {
                    Bus = bus,
                    Activities = new List<Data.Models.Activity>() { activity },
                    Ended = false,
                    Track = track
                };

                db.Courses.Add(course);

                db.SaveChanges();

                _eventEmitter.Emit(ActivityHelper.CreateEventDto(dto,dto.Type.ToString()),EventType.BusAction,bus.Id);
            }

        }
    }
}
