using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.TrackController
{
    public class TrackDto
    {
        public int Id { get; set; }

        public ICollection<int> BusStops { get; set; }

        public bool IsArchive { get; set; }
    }
}
