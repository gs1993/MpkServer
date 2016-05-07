using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Attributes;
using Core.Transfer.Base;

namespace Core.Transfer.SubscribeHandler
{
    [Message("unsubscribe", typeof(EmptyDto))]
    public class UnSubscribeDto
    {
        public int EventType { get; set; }

        public int IdOfObject { get; set; }
    }
}
