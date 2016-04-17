using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Bus;
using Data.Models;

namespace WebApiServer.Converters
{
    public static class BusExpressions
    {
        public static BusDto MapToDto(this Bus bus)
        {
            return new BusDto()
            {
                BusNumber = bus.BusNumber,
                BusType = bus.BusType,
                GotMachine = bus.GotMachine,
                LastControl = bus.LastControl,
                RegistrationNumber = bus.RegistrationNumber,
                Id = bus.Id,
                BusStatus = bus.BusStatus
            };
        }
    }
}
