using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebSocketServer.Connection;

namespace WebSocketServer.Events
{
    public class EventEmitter:IEventEmitter
    {
        private readonly List<IConnection> _cons = new List<IConnection>(); 


        public void Emit<T>(T obj)
        {
            var sendData = new EmitMsg {Data = JsonConvert.SerializeObject(obj)};
            foreach (var con in _cons)
            {
                con.Send(sendData);
            }
        }

        public void Subscribe(IConnection connection)
        {
            _cons.Add(connection);
        }

        public void UnSubscribe(IConnection connection)
        {
            _cons.Remove(connection);
        }
    }
}
