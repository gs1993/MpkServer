using Core.Transfer.Bus;
using Data.Models;
using Data.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Core.Enums;

namespace WebApiServer.Controllers
{
    [EnableCors("*", "*", "*")]
    [Authorize]
    public class BusController : ApiController
    {
        private readonly IDatabaseService _db;

        public BusController(IDatabaseService db)
        {
            _db = db;
        }

        public List<BusDto> GetBusList()
        {
            using (var db = _db.CreateContext())
            {
                return db.Buss.ToList().Select(b => Rewrite(b)).ToList();
            }
        }

        [EnableCors("*", "*", "*")]
        public BusDto GetBus(int Id)
        {
            using (var db = _db.CreateContext())
            {
                var bus = db.Buss.FirstOrDefault(b => b.Id == Id);//BusId.id);
                if (bus == null)
                {
                    
                }
                return Rewrite(bus);
            }
        }

        public BusConfirmed PutBus(Bus busToUpdate)
        {
            using (var db = _db.CreateContext())
            {
                bool result = false;

                if (ModelState.IsValid)
                {
                    db.Entry(busToUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    result = true;
                }
                return new BusConfirmed() { Ok = result };
            }
        }

        public BusConfirmed PostBus(BusDto busDto)
        {
            using (var db = _db.CreateContext())
            {
                bool result = ModelState.IsValid;
                try
                {
                    var bus = Rewrite(busDto);
                    bus.BusStatus = Status.Inactive; // chwilowo

                    db.Buss.Add(bus);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }
                
                return new BusConfirmed() {Ok = result};
            }
        }

        public BusConfirmed Delete(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var bus = db.Buss.FirstOrDefault(b => b.Id == Id);
                if (bus == null)
                {
                    result = false;
                }
                try
                {
                    bus.BusStatus = Status.Inactive;
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }


                return new BusConfirmed() { Ok = result };
            }
        }

        public BusConfirmed DeleteFromDb(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var bus = db.Buss.FirstOrDefault(b => b.Id == Id);
                if (bus == null)
                {
                    result = false;
                }
                try
                {
                    db.Buss.Remove(bus);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }


                return new BusConfirmed() { Ok = result };
            }
        }

        public BusConfirmed PutRestore(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var bus = db.Buss.FirstOrDefault(b => b.Id == Id);

                try
                {
                    bus.BusStatus = Status.Active;
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }
                return new BusConfirmed() { Ok = result };
            }
        }
       
        private BusDto Rewrite(Bus bus)
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
        private Bus Rewrite(BusDto busDto)
        {
            return new Bus()
            {
                BusNumber = busDto.BusNumber,
                BusType = busDto.BusType,
                GotMachine = busDto.GotMachine,
                LastControl = busDto.LastControl,
                RegistrationNumber = busDto.RegistrationNumber,
                Id = busDto.Id,
                BusStatus = busDto.BusStatus
            };
        }
    }
}
