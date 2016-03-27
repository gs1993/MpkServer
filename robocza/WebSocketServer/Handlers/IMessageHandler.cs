using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketServer.Connection;

namespace WebSocketServer.Handlers
{
    public interface IMessageHandler<T1,T2>
    {
        Task<T2> Handle(T1 dto,IConnection connection);
    }
}
