using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.Emit
{
    public class EventDto<T>
    {
        public int Id { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public T Info { get; set; }
    }
}
