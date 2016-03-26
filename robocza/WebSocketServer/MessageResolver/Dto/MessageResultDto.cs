using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.MessageResolver.Dto
{
    public class MessageResultDto
    {
        public ResultState State { get; set; }
        public string Data { get; set; }
    }
}
