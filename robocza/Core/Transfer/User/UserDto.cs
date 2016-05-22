using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace Core.Transfer.User
{
    public class UserDto
    {
        public string Email { get; set; }
        public UserRank Rank { get; set; }
        public bool Activated { get; set; }
        public string Details { get; set; }
    }
}
