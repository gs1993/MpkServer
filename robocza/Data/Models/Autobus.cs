using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Enums;

namespace Data.Models
{
    public class Bus
    {
        public int Id { get; set; }
        
        public string RegistrationNumber { get; set; }

        public bool GotMachine { get; set; }

        public BusType BusType { get; set; }

        public bool IsActive { get; set; }

        public DateTime LastControl { get; set; }   
    }
}
