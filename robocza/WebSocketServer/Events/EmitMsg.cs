using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace WebSocketServer.Events
{
    public class EmitMsg:IEmitMsg
    {
        public string Data { get; set; }
        public int DeviceId { get; set; }
        public EventType EventType { get; set; }
    }
}
