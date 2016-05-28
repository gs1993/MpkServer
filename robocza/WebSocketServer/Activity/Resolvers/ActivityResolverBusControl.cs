using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer;
using Data.Models;
using Data.Service;
using Newtonsoft.Json;
using WebSocketServer.Connection;
using WebSocketServer.Events;

namespace WebSocketServer.Activity.Resolvers
{
    public class ActivityResolverBusControl : IActivityResolver
    {
        public ActivityType ActivityType => ActivityType.Control;

        private readonly IEventEmitter _eventEmitter;
        private readonly IDatabaseService _databaseService;

        public ActivityResolverBusControl(IDatabaseService databaseService, IEventEmitter eventEmitter)
        {
            _databaseService = databaseService;
            _eventEmitter = eventEmitter;
        }


        //Ile złapano osób
        public static string CatchAmout { get; } = "CATCHAMOUT";

        public void Resolve(ActivitySendDto dto, IConnection connection)
        {
            var data = ActivityHelper.GetData(dto.AdditionalInfo);
            using (var db = _databaseService.CreateContext())
            {
                if (string.IsNullOrEmpty(dto.DeviceId)) throw new InvalidOperationException("Brak CATCHAMOUT");

                var busId = Convert.ToInt32(dto.DeviceId);

                var bus = db.Buss.Find(busId);

                var course = db.Courses.FirstOrDefault(x => x.Ended == false && x.Bus.Id == bus.Id);

                if (course == null) throw new Exception("Cant find course");

                var activity = ActivityHelper.GetPreparedActivity(dto, connection, db);

                activity.Course = course;

                activity.AdditionalInfo = JsonConvert.SerializeObject(new ControlAdditionalInfo() {Catched = Convert.ToInt32(data[CatchAmout])});

                db.Activities.Add(activity);

                db.SaveChanges();

                _eventEmitter.Emit(ActivityHelper.CreateEventDto(dto, dto.Type.ToString(),activity.AdditionalInfo), EventType.BusAction, bus.Id);


            }

        }
    }
}
