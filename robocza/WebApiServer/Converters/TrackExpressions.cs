using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.TrackController;
using Data.Models;

namespace WebApiServer.Converters
{
    public static class TrackExpressions
    {
        public static TrackDto MapToDto(this Track track)
        {
            return new TrackDto()
            {
                BusStops = track.BusStopsIds,
                IsArchive = track.IsArchive,
                Id = track.Id
            };
        }

        public static TrackDetailsDto MapToDetailsDto(this Track track)
        {
            return new TrackDetailsDto()
            {
                Id = track.Id,
                IsArchive = track.IsArchive
            };
        }
    }
}
