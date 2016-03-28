using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.BusStopHandler;
using Data.Service;
using WebSocketServer.Connection;
using WebSocketServer.Events;

namespace WebSocketServer.Handlers.Action
{
    public class BusStopHandler:IMessageHandler<BusStopActivityDto,BusStopResultDto>
    {
        private readonly IEventEmitter _emitter;
        private readonly IDatabaseService _db;

        public BusStopHandler(IEventEmitter emitter,IDatabaseService db)
        {
            _emitter = emitter;
            _db = db;
        }

        public Task<BusStopResultDto> Handle(BusStopActivityDto dto, IConnection connection)
        {
            using (var db = _db.CreateContext())
            {
                   
            }


            return Task.FromResult(new BusStopResultDto() {Test="Test"});
        }
    }
}
