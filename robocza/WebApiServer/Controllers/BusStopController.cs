using Data.Models;
using Data.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiServer.Services;
using Core.Transfer.BusStop;
using Data.Enums;

namespace WebApiServer.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class BusStopController : ApiController
    {
        private IDatabaseService _db;

        public BusStopController(IDatabaseService db)
        {
            _db = db;
        }

        public List<BusStopDto> GetBusStopList()
        {
            using (var db = _db.CreateContext())
            {
                return db.BusStops.ToList().Select(b => Rewrite(b)).ToList();
            }
        }

        public BusStopDto GetBusStop(int Id)
        {
            using (var db = _db.CreateContext())
            {
                var busStop = db.BusStops.FirstOrDefault(b => b.Id == Id);//BusId.Id);
                if (busStop == null)
                {

                }
                return Rewrite(busStop);
            }
        }

        public BusStopLocalizationDto BusStopLocalization(int Id)
        {
            using (var db = _db.CreateContext())
            {
                var busStop = db.BusStops.FirstOrDefault(b => b.Id == Id);

                var busStopLocalization = new BusStopLocalizationDto();
                if (busStop != null)
                {
                    busStopLocalization.Id = busStop.Id;
                    busStopLocalization.Name = busStop.Name;
                    busStopLocalization.Lat = busStop.Lat;
                    busStopLocalization.Lng = busStop.Lng;
                }

                return busStopLocalization;
            }
        }

        public List<BusStopLocalizationDto> BusStopLocalizationList()
        {
            using (var db = _db.CreateContext())
            {
                var busStopLocalizations = db.BusStops.ToArray().Select(x => new BusStopLocalizationDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Lat = x.Lat,
                    Lng = x.Lng
                }).ToList();

                return busStopLocalizations;
            }
        }

        public BusStopConfirmed DeleteBusStop(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var busStop = db.BusStops.FirstOrDefault(b => b.Id == Id);
                try
                {
                    busStop.BusStopStatus = Status.InActive;
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }


                return new BusStopConfirmed() { Ok = result };
            }
        }

        public BusStopConfirmed DeleteFromDb(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var busStop = db.BusStops.FirstOrDefault(b => b.Id == Id);
                try
                {
                    db.BusStops.Remove(busStop);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }


                return new BusStopConfirmed() { Ok = result };
            }
        }

        public BusStopConfirmed PutRestore(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var busStop = db.BusStops.FirstOrDefault(bs => bs.Id == Id);

                try
                {
                    busStop.BusStopStatus = Status.Active;
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }
                return new BusStopConfirmed() {Ok = result};
            }
        }

        public BusStopConfirmed PostBusStop(BusStopDto busStopDto)
        {
            using (var db = _db.CreateContext())
            {
                bool result = ModelState.IsValid;
                try
                {
                    var busStop = Rewrite(busStopDto);
                    busStop.BusStopStatus = Status.InActive; // chwilowo

                    db.BusStops.Add(busStop);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    result = false;
                }
                           
                return new BusStopConfirmed() {Ok = result};
            }
        }
        
        public BusStopConfirmed PutBusStop(BusStop busStopToUpdate)
        {
            using (var db = _db.CreateContext())
            {
                bool result = false;

                if (ModelState.IsValid)
                {
                    db.Entry(busStopToUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    result = true;
                }
                return new BusStopConfirmed() { Ok = result };
            }
        }

        private BusStopDto Rewrite(BusStop busStop)
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
        private BusStop Rewrite(BusStopDto dto)
        {
            return new BusStop()
            {
                BusStopType = dto.BusStopType,
                GotKiosk = dto.GotKiosk,
                GotMachine = dto.GotMachine,
                Id = dto.Id,
                LastControl = dto.LastControl,
                Lat = dto.Lat,
                Lng = dto.Lng,
                LocalizationString = dto.LocalizationString,
                Name = dto.Name,
                BusStopStatus = dto.BusStopStatus
            };
        }
    }
}
