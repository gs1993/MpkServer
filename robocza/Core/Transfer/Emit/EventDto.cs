using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.Emit
{
    public class EventDto
    {
        public int Id { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string Type { get; set; }
        public string AdditionalInfo { get; set; }
    }
}
