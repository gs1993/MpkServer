using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Attributes;
using Core.Transfer.Base;

namespace Core.Transfer.BusStopHandler
{
    [Message("busStop.Activity",typeof(EmptyDto))]
    public class BusStopActivityDto
    {
        public int BusId { get; set; }
        public int BusStopId { get; set; }
    }
}
