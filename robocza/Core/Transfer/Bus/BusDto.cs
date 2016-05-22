using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace Core.Transfer.Bus
{
    public class BusDto
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; }
        public string BusNumber { get; set; }
        public bool GotMachine { get; set; }  //(Czy ma biletomat)
        public BusType BusType { get; set; }
        public Status BusStatus { get; set; }
        public DateTime LastControl { get; set; }
    }
}
