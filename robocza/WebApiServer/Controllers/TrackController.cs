﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web.Http;
using Core.Helpers;
using Core.Logger;
using Core.Transfer.BusStop;
using Core.Transfer.TrackController;
using Data;
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

                trackDto.BusStops = new List<BusStopDto>();

                //trackDto.BusStops =
                //    db.BusStops.Where(x => track.BusStopsIds.Contains(x.Id)).ToArray().Select(x => x.MapToDto()).ToList();

                if(track==null) throw new Exception("Nie istnieje kurs o takim id");
                foreach (var busStopId in track.BusStopsIds) {
                    var busStop = db.BusStops.FirstOrDefault(x => x.Id == busStopId).MapToDto();
                    if (busStop != null) {
                        trackDto.BusStops.Add(busStop);
                    }
                }
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
                    track.IsArchive = true;
                    db.Entry(track).State=EntityState.Modified;
                    db.SaveChanges();
                    _logger.Log($"Archive track {id}");
                    return true;
                }
                return false;
            }
        }

        public bool Restore(int id)
        {
            using (var db = _databaseService.CreateContext())
            {
                var track = db.Tracks.FirstOrDefault(x => x.Id == id);
                if (track != null)
                {
                    track.IsArchive = false;

                    TryCreateTrack(db, track.LineNumber);

                    db.Entry(track).State = EntityState.Modified;
                    db.SaveChanges();
                    _logger.Log($"Restore track {id}");
                    return true;
                }
                return false;
            }
        }

        public TrackDto Create(TrackDto dto)
        {
            using (var db = _databaseService.CreateContext())
            {
                ValidationHelper.Validate(dto);

                var track = new Track()
                {
                    LineNumber = dto.LineNumber,
                    IsArchive = false,
                    BusStopsIds = dto.BusStops.ToArray()
                };
                if (dto.LineNumber == 0) return null;
                db.Tracks.Add(track);

                TryCreateTrack(db, dto.LineNumber);

                db.SaveChanges();
                _logger.Log($"Created track {dto.LineNumber}");

                return track.MapToDto();
            }
        }

        public TrackDto Update(EditableTrackDto dto)
        {
            using (var db = _databaseService.CreateContext())
            {
                ValidationHelper.Validate(dto);

                if (dto.Id != 0)
                {
                    db.Tracks.AddOrUpdate(new Track()
                    {
                        Id = dto.Id.Value,
                        LineNumber = dto.LineNumber.Value,
                        BusStopsIds = dto.BusStops.ToArray()
                    });

                    TryCreateTrack(db,dto.LineNumber.Value);

                    db.SaveChanges();
                    return db.Tracks.First(x=>x.Id==dto.Id).MapToDto();
                }
                return null;

            }
        }

        private void TryCreateTrack(MainDbContex db,int line)
        {
            if (db.Tracks.Local.Count(x => x.IsArchive == false && x.LineNumber == line) + 
                db.Tracks.Count(x => x.IsArchive == false && x.LineNumber == line) > 1)
                throw new Exception("Nie można posiadać dwóch aktywnych tras o takim samym numerze lini");
        }
    }
}
