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
                return db.BusStops.Where(b => !b.IsArchive).ToList().Select(b => Revrite(b)).ToList();
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
                return Revrite(busStop);
            }
        }

        public BusStopDeleteConfirmDto DeleteBusStop(int Id)
        {
            using (var db = _db.CreateContext())
            {
                bool result = true;
                var busStop = db.Buss.FirstOrDefault(b => b.Id == Id);
                if (busStop == null || busStop.IsArchive)
                {
                    result = false;
                }
                busStop.IsArchive = true;
                return new BusStopDeleteConfirmDto() { Deleted = result };
            }
        }


        private BusStopDto Revrite(BusStop bs)
        {
            return new BusStopDto()
            {
                BusStopType = bs.BusStopType,
                GotKiosk = bs.GotKiosk,
                GotMachine = bs.GotMachine,
                Id = bs.Id,
                LastControl = bs.LastControl,
                Lat = bs.Lat,
                Lng = bs.Lng,
                LocalizationString = bs.LocalizationString,
                Name = bs.Name
            };
        }
    }
}
