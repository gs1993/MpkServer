using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Course
    {
        public int Id { get; set; }

        public bool Ended { get; set; }

        public List<Activity> Activities { get; set; }

        public Track Track { get; set; }

        public Bus Bus { get; set; } 
    }
}
