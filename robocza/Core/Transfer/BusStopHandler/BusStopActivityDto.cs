using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Attributes;

namespace Core.Transfer.BusStopHandler
{
    [Message("busStop.Activity",typeof(BusStopResultDto))]
    public class BusStopActivityDto
    {
        public int BusId { get; set; }
        public int BusStopId { get; set; }
    }
}
