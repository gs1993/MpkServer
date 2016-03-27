using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketServer.Connection;

namespace WebSocketServer.Events
{
    public interface IEventEmitter
    {
        void Emit<T>(T obj);
        void Subscribe(IConnection connection);
        void UnSubscribe(IConnection connection);
    }
}
