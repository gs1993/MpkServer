using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer.Base;
using Core.Transfer.SubscribeHandler;
using WebSocketServer.Connection;
using WebSocketServer.Events;

namespace WebSocketServer.Handlers.Action
{
    public class SubscribeHandler:IMessageHandler<SubscribeDto,EmptyDto>,
        IMessageHandler<UnSubscribeDto,EmptyDto>
    {
        private readonly IEventEmitter _emitter;

        public SubscribeHandler(IEventEmitter emitter)
        {
            _emitter = emitter;
        }


        public Task<EmptyDto> Handle(SubscribeDto dto, IConnection connection)
        {
            _emitter.Subscribe(connection,dto.EventType,dto.IdOfObject);

            return Task.FromResult(new EmptyDto());
        }

        public Task<EmptyDto> Handle(UnSubscribeDto dto, IConnection connection)
        {
            _emitter.UnSubscribe(connection, dto.EventType, dto.IdOfObject);

            return Task.FromResult(new EmptyDto());
        }
    }
}
