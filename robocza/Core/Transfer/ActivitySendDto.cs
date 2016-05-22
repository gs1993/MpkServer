using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer.Attributes;
using Core.Transfer.Base;

namespace Core.Transfer
{
    [Message("activity.send", typeof(EmptyDto))]
    public class ActivitySendDto
    {
        public string DeviceId { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }

        public ActivityType Type { get; set; }

        public string AdditionalInfo { get; set; }
    }
}
