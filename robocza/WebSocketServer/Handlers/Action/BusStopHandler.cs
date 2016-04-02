using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Base;
using Core.Transfer.BusStopHandler;
using Core.Transfer.Emit;
using Data.Enums;
using Data.Models;
using Data.Service;
using WebSocketServer.Connection;
using WebSocketServer.Events;
using WebSocketServer.MessageResolver;
using WebSocketServer.MessageResolver.Dto;

namespace WebSocketServer.Handlers.Action
{
    public class BusStopHandler:IMessageHandler<BusStopActivityDto, EmptyDto>
    {
        private readonly IEventEmitter _emitter;
        private readonly IDatabaseService _db;

        public BusStopHandler(IEventEmitter emitter,IDatabaseService db)
        {
            _emitter = emitter;
            _db = db;
        }

        public Task<EmptyDto> Handle(BusStopActivityDto dto, IConnection connection)
        {
            using (var db = _db.CreateContext())
            {

                var user = db.Users.First(x => x.Id == connection.User.Id);

                var bus = db.Buss.FirstOrDefault(x => x.Id == dto.BusId);
                var busstop = db.BusStops.FirstOrDefault(x => x.Id == dto.BusStopId);

                if (bus == null || busstop == null)
                {
                    throw new HandlingException(ResultState.Error, "Id busa lub przystanku jest nieprawidłowe");
                }

                if (!(user?.Rank==UserRank.Device&&user.Activated&&connection.State==WSState.Authorized))
                {
                    throw new HandlingException(ResultState.Error, "Dany użytkownik nie ma uprawnień do aktywności");
                }

                var course = db.Courses.FirstOrDefault(x => !x.Ended && x.Bus.Id == dto.BusId);
                if (course == null)
                {
                    course = db.Courses.Add(new Course()
                    {
                        Bus = bus,
                        Ended = false
                    });
                }
                var activity = db.Activities.Add(new Activity()
                {
                    BusStop = busstop,
                    ActivityType = ActivityType.BusStopCheck,
                    Course = course,
                    Bus = bus,
                    User = user,
                    Date = DateTime.Now,
                    Lat = busstop.Lat,
                    Lng = busstop.Lng
                });

                course.Activities.Add(activity);
                var trackString = course.Activities.Select(a => a.Id.ToString()).Aggregate((y, z) => y + ";" + z);
                var track = db.Tracks.FirstOrDefault(x => x.BusStops == trackString );
                if (track!=null)
                {
                    course.Ended = true;
                }

                db.SaveChanges();

                _emitter.Emit(new EventDto<string>()
                {
                   Id = activity.Id,
                   Lng = busstop.Lng,
                   Lat = busstop.Lng,
                   Info = activity.ActivityType.ToString()
                });

            }
            return Task.FromResult(new EmptyDto());
        }
    }
}
