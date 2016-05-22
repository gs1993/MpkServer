using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace WebSocketServer.Activity
{
    public interface IActivityResolverProvider
    {
        IActivityResolver GetResolver(ActivityType type);
    }
}
