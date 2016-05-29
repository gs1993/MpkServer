using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApiServer.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Core.Transfer.Bus;
using Data.Models;

namespace WebApiServer.Converters.Tests
{
    [TestClass()]
    public class BusExpressionsTests
    {
        [TestMethod()]
        public void MapToDtoTest()
        {
            Bus bus = new Bus {Id = 1, BusNumber = "1", BusStatus = Status.Active, BusType = BusType.Articulated, GotMachine = true, LastControl = new DateTime(2015, 01, 01), RegistrationNumber = "111"};

            BusDto dto = bus.MapToDto();

            Assert.AreEqual(bus.Id, dto.Id);
            Assert.AreEqual(bus.BusNumber, dto.BusNumber);
            Assert.AreEqual(bus.BusStatus, dto.BusStatus);
            Assert.AreEqual(bus.BusType, dto.BusType);
            Assert.AreEqual(bus.GotMachine, dto.GotMachine);
            Assert.AreEqual(bus.LastControl, dto.LastControl);
            Assert.AreEqual(bus.RegistrationNumber, dto.RegistrationNumber);
        }
    }
}