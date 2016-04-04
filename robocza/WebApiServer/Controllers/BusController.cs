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
                return db.Buss.Where(b => !b.IsArchive).ToList().Select(b => Rewrite(b)).ToList();
            }
        }

        [EnableCors("*", "*", "*")]
        public BusDto GetBus(int Id)
        {
            using (var db = _db.CreateContext())
            {
                var bus = db.Buss.FirstOrDefault(b => b.Id == Id);//BusId.Id);
                if (bus == null && bus.IsArchive)
                {
                    
                }
                return Rewrite(bus);
            }
        }

        public BusDto PutBus(BusDto busToUpdateDto)
        {
            using (var db = _db.CreateContext())
            {
                var bus = db.Buss.FirstOrDefault(b => b.Id == busToUpdateDto.Id);
                if (bus == null)
                {

                }

                bus.GotMachine = busToUpdateDto.GotMachine;
                bus.LastControl = busToUpdateDto.LastControl;
                bus.RegistrationNumber = busToUpdateDto.RegistrationNumber;
                bus.BusType = busToUpdateDto.BusType;
                bus.BusNumber = busToUpdateDto.BusNumber;
                db.SaveChanges();

                return Rewrite(bus);
            }
        }

        public BusDeleteConfirmDto DeleteBus(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var bus = db.Buss.FirstOrDefault(b => b.Id == Id);
                if (bus == null || bus.IsArchive)
                {
                    result = false;
                }
                bus.IsArchive = true;
                return new BusDeleteConfirmDto() { Deleted = result };
            }
        }
        //public async Task<IHttpActionResult> PostBus(BusDto dto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
            

        //    db.Bus.Add(bus);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = bus.Id }, bus);
        //}

        private BusDto Rewrite(Bus bus)
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
        private Bus Rewrite(BusDto busDto)
        {
            return new Bus()
            {
                BusNumber = busDto.BusNumber,
                BusType = busDto.BusType,
                GotMachine = busDto.GotMachine,
                LastControl = busDto.LastControl,
                RegistrationNumber = busDto.RegistrationNumber,
                Id = busDto.Id
            };
        }
    }
}
