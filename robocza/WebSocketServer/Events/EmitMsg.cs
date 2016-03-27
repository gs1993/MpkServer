using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.Events
{
    public class EmitMsg:IEmitMsg
    {
        public string Data { get; set; }
    }
}
