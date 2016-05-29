using Core.Transfer.ActivityController;
using Data.Models;

namespace WebApiServer.Converters
{
    public static class ActivityExpressions
    {
        public static ActivityDto MapToDto(this Activity obj)
        {
            return new ActivityDto()
            {
                Id = obj.Id,
                ActivityType = obj.ActivityType,
                Bus = obj.Bus?.MapToDto(),
                BusStop = obj.BusStop?.MapToDto(),
                Date = obj.Date,
                Lat = obj.Lat,
                Lng = obj.Lng,
                User = obj.User?.MapToDto()
            };
        }
    }
}
