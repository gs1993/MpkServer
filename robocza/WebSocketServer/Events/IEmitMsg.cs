using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketServer.MessageResolver.Dto;

namespace WebSocketServer.Events
{
    public interface IEmitMsg
    {
        string Data { get; set; }
    }
}
