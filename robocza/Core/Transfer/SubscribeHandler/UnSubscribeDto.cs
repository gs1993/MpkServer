﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer.Attributes;
using Core.Transfer.Base;

namespace Core.Transfer.SubscribeHandler
{
    [Message("unsubscribe", typeof(EmptyDto))]
    public class UnSubscribeDto
    {
        public EventType EventType { get; set; }

        public int IdOfObject { get; set; }
    }
}
