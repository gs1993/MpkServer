using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Core.Logger;
using Core.Transfer.TrackController;
using Data.Models;
using Data.Service;
using WebApiServer.Converters;

namespace WebApiServer.Controllers
{
    [Authorize]
    public class TrackController:ApiController
    {
        private IDatabaseService _databaseService;
        private ILogger _logger;

        public TrackController(IDatabaseService databaseService, ILogger logger)
        {
            _databaseService = databaseService;
            _logger = logger;
        }

        public List<TrackDto> GetList()
        {
            using (var db = _databaseService.CreateContext())
            {
                return db.Tracks.ToArray().Select(x => x.MapToDto()).ToList();
            }
        }

        public TrackDetailsDto Get(int id)
        {
            using (var db = _databaseService.CreateContext())
            {
                var track = db.Tracks.FirstOrDefault(x => x.Id == id);

                var trackDto = track.MapToDetailsDto();
                trackDto.BusStops =
                    db.BusStops.Where(x => track.BusStopsIds.Contains(x.Id)).ToArray().Select(x => x.MapToDto()).ToList();

                return trackDto;
            }
        }

        public bool Delete(int id)
        {
            using (var db = _databaseService.CreateContext())
            {
                var track = db.Tracks.FirstOrDefault(x => x.Id == id);
                if (track != null)
                {
                    db.Tracks.Remove(track);
                    db.SaveChanges();
                    _logger.Log($"Deleted track {id}");
                    return true;
                }
                return false;
            }
        }

        public TrackDto Create(TrackDto dto)
        {
            using (var db = _databaseService.CreateContext())
            {
                var track = new Track()
                {
                    Id = dto.Id,
                    IsArchive = dto.IsArchive,
                    BusStopsIds = dto.BusStops.ToArray()
                };
                if (dto.Id == 0) return null;

                
                db.Tracks.Add(track);
                db.SaveChanges();
                _logger.Log($"Created track{dto.Id}");

                return track.MapToDto();
            }
        }

        public TrackDto Update(TrackDto dto)
        {
            using (var db = _databaseService.CreateContext())
            {
                if (dto.Id != 0)
                {
                    db.Tracks.AddOrUpdate(new Track()
                    {
                        Id = dto.Id,
                        IsArchive = dto.IsArchive,
                        BusStopsIds = dto.BusStops.ToArray()
                    });
                    db.SaveChanges();
                    return dto;
                }
                return null;

            }
        }
    }
}
