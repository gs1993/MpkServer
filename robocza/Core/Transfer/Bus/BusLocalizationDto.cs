using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.Bus
{
    public class BusLocalizationDto
    {
        public int Id { get; set; }

        public string BusNumber { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }

        public string LocalizationString { get; set; }
    }
}
