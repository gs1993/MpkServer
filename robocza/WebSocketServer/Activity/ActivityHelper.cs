using System;
using System.Collections.Generic;
using System.Linq;
using Core.Transfer;
using Core.Transfer.Emit;
using Data;
using WebSocketServer.Connection;

namespace WebSocketServer.Activity
{
    public static class ActivityHelper
    {
        public static Data.Models.Activity GetPreparedActivity(ActivitySendDto dto, IConnection con, MainDbContex context)
        {
            return new Data.Models.Activity()
            {
                ActivityType = dto.Type,
                Lat = dto.Lat,
                Lng = dto.Lng,
                User = context.Users.First(x => x.Id == con.User.Id),//ENTITY framework taki piękny, nie można przypisywać obiektó z różnych kontekstów xd
                Date = DateTime.Now
            };
        }

        public static Dictionary<string, string> GetData(string additionalinfo)
        {
            var pairs = additionalinfo.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
            var pairsOfPairs = pairs.Select(x => x.Split('='));

            return pairsOfPairs.ToDictionary(x => x[0], x => x[1]);
        }

        public static EventDto<T> CreateEventDto<T>(ActivitySendDto dto, T info)
        {
            return new EventDto<T>()
            {
                Info = info,
                Lat = dto.Lat,
                Lng = dto.Lng
            };
        }
    }
}
