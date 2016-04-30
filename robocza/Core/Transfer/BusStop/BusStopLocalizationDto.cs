using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.BusStop
{
    public class BusStopLocalizationDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }

        public string LocalizationString { get; set; }
    }
}
