using Core.Transfer.Bus;
using Data.Models;
using Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiServer.Services;

namespace WebApiServer.Controllers
{
    [EnableCors("*", "*", "*")]
    [Authorize]
    public class BusController : ApiController
    {
        private IDatabaseService _db;

        public BusController(IDatabaseService db)
        {
            _db = db;
        }

        public List<BusDto> GetBusList()
        {
            using (var db = _db.CreateContext())
            {
                return db.Buss.Where(b => !b.IsArchive).ToList().Select(b => Revrite(b)).ToList();
            }
        }

        [EnableCors("*", "*", "*")]
        public BusDto GetBus(GetBusDto BusId)
        {
            using (var db = _db.CreateContext())
            {
                var bus = db.Buss.FirstOrDefault(b => b.Id == 1);//BusId.Id);
                if (bus == null && bus.IsArchive)
                {

                }
                return Revrite(bus);
            }
        }



        private BusDto Revrite(Bus bus)
        {
            return new BusDto()
            {
                BusNumber = bus.BusNumber,
                BusType = bus.BusType,
                GotMachine = bus.GotMachine,
                LastControl = bus.LastControl,
                RegistrationNumber = bus.RegistrationNumber,
                Id = bus.Id
            };
        }
    }
}
