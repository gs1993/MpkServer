using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.Connection
{
    public interface IConnection
    {
        void OnOpn();
        void OnClose();
        void OnMsg(string msg);
        void Send(string msg);
        WSState State { get; }
    }
}
