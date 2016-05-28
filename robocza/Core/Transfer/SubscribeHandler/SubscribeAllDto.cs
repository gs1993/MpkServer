using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer.Attributes;
using Core.Transfer.Base;

namespace Core.Transfer.SubscribeHandler
{
    [Message("subscribeAll", typeof(EmptyDto))]
    public class SubscribeAllDto
    {
        public EventType EventType { get; set; }
    }
}
