using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.BusStopHandler;

namespace WebSocketServer.Handlers.Action
{
    public class BusStopHandler:IMessageHandler<BusStopActivityDto,BusStopResultDto>
    {

        public BusStopResultDto Handle(BusStopActivityDto dto)
        {
            return new BusStopResultDto() {Test="Test"};
        }
    }
}
