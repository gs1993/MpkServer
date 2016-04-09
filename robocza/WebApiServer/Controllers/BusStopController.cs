﻿using Data.Models;
using Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiServer.Services;
using Core.Transfer.BusStop;

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
                return db.BusStops.Where(b => !b.IsArchive).ToList().Select(b => Rewrite(b)).ToList();
            }
        }

        public BusStopDto GetBusStop(int Id)
        {
            using (var db = _db.CreateContext())
            {
                var busStop = db.BusStops.FirstOrDefault(b => b.Id == Id);//BusId.Id);
                if (busStop == null && busStop.IsArchive)
                {

                }
                return Rewrite(busStop);
            }
        }

        public BusStopConfirmed DeleteBusStop(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = false;
                var busStop = db.Buss.FirstOrDefault(b => b.Id == Id);
                if (busStop != null && !busStop.IsArchive)
                {
                    busStop.IsArchive = true;
                    result = true;
                }
                return new BusStopConfirmed() { Ok = result };
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
                    busStop.IsArchive = false; // chwilowo

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
                Name = busStop.Name
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
                Name = dto.Name
            };
        }
    }
}
