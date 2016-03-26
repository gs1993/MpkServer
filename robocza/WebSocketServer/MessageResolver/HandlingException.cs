using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketServer.MessageResolver.Dto;

namespace WebSocketServer.MessageResolver
{
    public class HandlingException:Exception
    {
        public ResultState State { get; }
        public string Msg { get; }
        public HandlingException(ResultState state,string msg)
        {
            State = state;
            Msg = msg;
        }
    }
}
