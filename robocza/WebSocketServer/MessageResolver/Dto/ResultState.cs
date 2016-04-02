using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.MessageResolver.Dto
{
    public enum ResultState
    {
        Ok=0,
        Event=100,
        Error=400
    }
}
