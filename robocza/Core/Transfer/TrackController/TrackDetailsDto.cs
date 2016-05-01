using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.BusStop;

namespace Core.Transfer.TrackController
{
    public class TrackDetailsDto
    {
        public int Id { get; set; }

        public ICollection<BusStopDto> BusStops { get; set; }

        public bool IsArchive { get; set; }
    }
}
