using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using WebSocketServer.Connection;

namespace WebSocketServer.Events
{
    public interface IEventEmitter
    {
        void Emit<T>(T obj,EventType type,int id);
        void Subscribe(IConnection connection,EventType type,int id);
        void UnSubscribe(IConnection connection, EventType type, int id);
    }
}
