using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Base;
using Core.Transfer.EventEmitterHandler;
using WebSocketServer.Connection;
using WebSocketServer.Events;

namespace WebSocketServer.Handlers.Action
{
    public class EventEmitterHandler:
        IMessageHandler<RegisterForEmitDto, EmptyDto>,
        IMessageHandler<UnregisterForEmitDto,EmptyDto>
    {
        private readonly IEventEmitter  _emitter;

        public EventEmitterHandler(IEventEmitter emitter)
        {
            _emitter = emitter;
        }

        public Task<EmptyDto> Handle(RegisterForEmitDto dto,IConnection connection)
        {
            _emitter.Subscribe(connection);
            return TaskHelper.EmptyResult();
        }

        public Task<EmptyDto> Handle(UnregisterForEmitDto dto, IConnection connection)
        {
            _emitter.UnSubscribe(connection);
            return TaskHelper.EmptyResult();
        }
    }
}
