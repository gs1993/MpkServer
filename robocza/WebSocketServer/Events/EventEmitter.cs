using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Newtonsoft.Json;
using WebSocketServer.Connection;

namespace WebSocketServer.Events
{
    public class EventEmitter : IEventEmitter
    {
        private readonly Dictionary<EventType, Dictionary<int, List<IConnection>>> _subscribers = new Dictionary<EventType, Dictionary<int, List<IConnection>>>();

        private readonly ConcurrentDictionary<EventType, List<IConnection>> _allSubscribers = new ConcurrentDictionary<EventType, List<IConnection>>();

        public void Emit<T>(T obj, EventType type, int id)
        {
            if (!_subscribers.ContainsKey(type)) _subscribers[type] = new Dictionary<int, List<IConnection>>();
            if (!_subscribers[type].ContainsKey(id)) _subscribers[type][id] = new List<IConnection>();


            var connectionsToSend = new List<IConnection>();
            if (_allSubscribers.ContainsKey(type)) connectionsToSend.AddRange(_allSubscribers[type]);
            connectionsToSend.AddRange(_subscribers[type][id]);
            connectionsToSend = connectionsToSend.Distinct().ToList();

            var sendData = new EmitMsg { Data = JsonConvert.SerializeObject(obj), DeviceId = id, EventType = type };
            foreach (var connection in connectionsToSend)
            {
                if (connection.State == WSState.Authorized)
                {
                    connection.Send(sendData);
                }
            }
        }

        public void Subscribe(IConnection connection, EventType type, int id)
        {
            if (!_subscribers.ContainsKey(type)) _subscribers[type] = new Dictionary<int, List<IConnection>>();
            if (!_subscribers[type].ContainsKey(id)) _subscribers[type][id] = new List<IConnection>();
            _subscribers[type][id].Add(connection);
        }

        public void UnSubscribe(IConnection connection, EventType type, int id)
        {
            if (_subscribers.ContainsKey(type) && _subscribers[type].ContainsKey(id))
                _subscribers[type][id].Remove(connection);
        }

        public void SubscribeAll(IConnection connection, EventType type)
        {
            if (!_allSubscribers.ContainsKey(type)) _allSubscribers.TryAdd(type, new List<IConnection>());
            _allSubscribers[type].Add(connection);
        }

        public void UnsubscribeAll(IConnection connection, EventType type)
        {
            if (_allSubscribers.ContainsKey(type))
                _allSubscribers[type].Remove(connection);

            foreach (var id in _subscribers[type])
            {
                if (id.Value.Contains(connection)) id.Value.Remove(connection);
            }
        }
    }
}
