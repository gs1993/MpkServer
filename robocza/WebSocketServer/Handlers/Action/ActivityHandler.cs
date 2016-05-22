using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer;
using Core.Transfer.Base;
using WebSocketServer.Activity;
using WebSocketServer.Connection;

namespace WebSocketServer.Handlers.Action
{
    public class ActivityHandler:IMessageHandler<ActivitySendDto,EmptyDto>
    {
        private readonly IActivityResolverProvider _provider;

        public ActivityHandler(IActivityResolverProvider provider)
        {
            _provider = provider;
        }


        public Task<EmptyDto> Handle(ActivitySendDto dto, IConnection connection)
        {
            _provider.GetResolver(dto.Type).Resolve(dto,connection);
            return Task.FromResult(new EmptyDto());
        }
    }
}
