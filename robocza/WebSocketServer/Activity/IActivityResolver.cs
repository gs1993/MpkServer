using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer;
using Core.Transfer.ActivityController;
using WebSocketServer.Connection;

namespace WebSocketServer.Activity
{
    public interface IActivityResolver
    {
        ActivityType ActivityType { get; }

        void Resolve(ActivitySendDto dto,IConnection connection);
    }
}
