using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Enums;

namespace Data.Models
{
    public class Activity
    {
        public int Id { get; set; }

        public ActivityType ActivityType { get; set; }

        public DateTime Date { get; set; }

        public float Lat { get; set; }

        public float Lng { get; set; }

        public BusStop BusStop { get; set; }

        public Bus Bus { get; set; }
        
        public ApiUser User { get; set; }
        
        public Course Course { get; set; } 

    }
}
