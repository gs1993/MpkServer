using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;
using Newtonsoft.Json;
using SimpleInjector;
using WebSocketServer.MessageResolver;

namespace WebSocketServer.Connection
{
    public class Connection:IConnection
    {
        private readonly IWebSocketConnection _con;
        private WSState _state;
        private readonly IMessageResolver _resolver;


        public Connection(IWebSocketConnection connection,Container container)
        {
            _con = connection;
            _resolver = container.GetInstance<IMessageResolver>();
            _con.OnMessage = OnMsg;
            _con.OnClose = OnClose;
            _con.OnOpen = OnOpn;
        }

        public void OnOpn()
        {
            _state=WSState.Connected;
        }

        public void OnClose()
        {
            GC.SuppressFinalize(this);
        }

        public async void OnMsg(string msg)
        {
            var result = await _resolver.ResolveRequest(msg,this);
            this.Send(result);
        }

        public void Send(string msg)
        {
            _con.Send(msg);
        }

        public void Send(object obj)
        {
            _con.Send(JsonConvert.SerializeObject(obj));
        }

        public WSState State => _state;
    }
}
