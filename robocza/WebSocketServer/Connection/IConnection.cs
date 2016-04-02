using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Data.Models;

namespace WebSocketServer.Connection
{
    public interface IConnection
    {
        void OnOpn();
        void OnClose();
        void OnMsg(string msg);
        void Send(string msg);
        void Send(object obj);
        WSState State { get; }
        ApiUser User { get; }
        void Auth(ApiUser user);
        void SetState(WSState state);
    }
}
