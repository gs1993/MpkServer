﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketServer.Connection
{
    public interface IConnectionHolder
    {
        void AddConnection(IConnection con);
        void RemoveConnection(IConnection con);
    }
}