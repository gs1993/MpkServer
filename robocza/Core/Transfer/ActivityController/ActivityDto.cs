using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer.Bus;
using Core.Transfer.BusStop;
using Core.Transfer.User;

namespace Core.Transfer.ActivityController
{
    public class ActivityDto
    {
        public int Id { get; set; }

        public ActivityType ActivityType { get; set; }

        public DateTime Date { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }

        public BusStopDto BusStop { get; set; }

        public BusDto Bus { get; set; }

        public UserDto User { get; set; }
    }
}
