using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.Connection
{
    public class ConnectionHolder:IConnectionHolder
    {
        public List<IConnection> Connections { get; }

        public ConnectionHolder()
        {
                Connections = new List<IConnection>();
        }

        public void AddConnection(IConnection con)
        {
            Connections.Add(con);
        }

        public void RemoveConnection(IConnection con)
        {
            Connections.Remove(con);
        }
    }
}
