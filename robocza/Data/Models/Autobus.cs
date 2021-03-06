﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace Data.Models
{
    public class Bus
    {
        public int Id { get; set; }
        
        public string RegistrationNumber { get; set; }

        public string BusNumber { get; set; }

        public bool GotMachine { get; set; }  //(Czy ma biletomat)

        public BusType BusType { get; set; }

        public DateTime LastControl { get; set; }

        public Status BusStatus { get; set; }

        public ApiUser Driver { get; set; }
    }
}
