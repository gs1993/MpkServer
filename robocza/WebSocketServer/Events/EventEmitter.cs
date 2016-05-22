using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Newtonsoft.Json;
using WebSocketServer.Connection;

namespace WebSocketServer.Events
{
    public class EventEmitter:IEventEmitter
    {
        private readonly Dictionary<EventType, Dictionary<int, List<IConnection>>> _connections = new Dictionary<EventType, Dictionary<int, List<IConnection>>>();

        public void Emit<T>(T obj, EventType type, int id)
        {
            var sendData = new EmitMsg { Data = JsonConvert.SerializeObject(obj), DeviceId = id, EventType = type};
            if (!_connections.ContainsKey(type)) _connections[type] = new Dictionary<int, List<IConnection>>();
            if (!_connections[type].ContainsKey(id)) _connections[type][id] = new List<IConnection>();
            foreach (var connection in _connections[type][id])
            {
                if (connection.State == WSState.Authorized)
                {
                    connection.Send(sendData);
                }
            }
        }

        public void Subscribe(IConnection connection, EventType type, int id)
        {
            if (!_connections.ContainsKey(type)) _connections[type] = new Dictionary<int, List<IConnection>>();
            if (!_connections[type].ContainsKey(id)) _connections[type][id] = new List<IConnection>();
            _connections[type][id].Add(connection);
        }

        public void UnSubscribe(IConnection connection, EventType type, int id)
        {
            _connections[type][id].Remove(connection);
        }
    }
}
