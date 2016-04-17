using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.BusStop;
using Data.Models;

namespace WebApiServer.Converters
{
    public static class BusStopExpressions
    {
        public static BusStopDto MapToDto(this BusStop busStop)
        {
            return new BusStopDto()
            {
                BusStopType = busStop.BusStopType,
                GotKiosk = busStop.GotKiosk,
                GotMachine = busStop.GotMachine,
                Id = busStop.Id,
                LastControl = busStop.LastControl,
                Lat = busStop.Lat,
                Lng = busStop.Lng,
                LocalizationString = busStop.LocalizationString,
                Name = busStop.Name,
                BusStopStatus = busStop.BusStopStatus
            };
        }
    }
}
