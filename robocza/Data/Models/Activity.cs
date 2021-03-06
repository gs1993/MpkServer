﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace Data.Models
{
    public class Activity
    {
        public int Id { get; set; }

        public ActivityType ActivityType { get; set; }

        public DateTime Date { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }

        public string AdditionalInfo { get; set; }

        public BusStop BusStop { get; set; }

        public Bus Bus { get; set; }
        
        public ApiUser User { get; set; }
        
        public Course Course { get; set; } 

    }
}
