using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.User;
using Data.Models;

namespace WebApiServer.Converters
{
    public static class UserExpressions
    {
        public static UserDto MapToDto(this ApiUser obj)
        {
            return new UserDto()
            {
                Activated = obj.Activated,
                Email = obj.Email,
                Rank = obj.Rank
            };
        }
    }
}
