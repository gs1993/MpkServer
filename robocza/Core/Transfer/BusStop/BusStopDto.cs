using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;


namespace Core.Transfer.BusStop
{
    public class BusStopDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }

        public string LocalizationString { get; set; }

        public bool GotMachine { get; set; }

        public Status BusStopStatus { get; set; }

        public bool GotKiosk { get; set; }

        public BusStopType BusStopType { get; set; }

        public DateTime LastControl { get; set; }
    }
}
