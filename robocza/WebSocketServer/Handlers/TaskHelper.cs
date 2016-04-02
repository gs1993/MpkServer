using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Base;

namespace WebSocketServer.Handlers
{
    public static class TaskHelper
    {
        public static Task<EmptyDto> EmptyResult()
        {
            return Task.FromResult(new EmptyDto());
        }
    }
}
