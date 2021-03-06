﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Track
    {
        public int Id { get; set; }

        public int LineNumber { get; set; }

        public string BusStops { get; set; }

        public bool IsArchive { get; set; }

        [NotMapped]
        public int[] BusStopsIds
        {
            get { return BusStops.Split(';').Select(x => Convert.ToInt32(x)).ToArray(); }
            set { BusStops = String.Join(";", value); }
        }
    }
}
