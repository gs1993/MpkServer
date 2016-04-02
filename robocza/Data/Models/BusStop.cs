using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Enums;

namespace Data.Models
{
    public class BusStop
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Lat { get; set; }
        
        public double Lng { get; set; }

        public string LocalizationString { get; set; }

        public bool GotMachine { get; set; }

        public bool GotKiosk { get; set; }

        public BusStopType BusStopType { get; set; }

        public DateTime LastControl { get; set; }

        public bool IsArchive { get; set; }
    }
}
