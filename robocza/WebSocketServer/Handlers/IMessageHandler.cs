using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.Handlers
{
    public interface IMessageHandler<T1,T2>
    {
        T2 Handle(T1 dto);
    }
}
