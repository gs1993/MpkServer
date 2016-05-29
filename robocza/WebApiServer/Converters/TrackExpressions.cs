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
                LineNumber = track.LineNumber,
                Id = track.Id,
            };
        }

        public static TrackDetailsDto MapToDetailsDto(this Track track)
        {
            return new TrackDetailsDto()
            {
                Id = track.Id,
                IsArchive = track.IsArchive,
                LineNumber = track.LineNumber

            };
        }
    }
}
