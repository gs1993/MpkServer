using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.User
{
    public class UserDto
    {
        public string Email { get; set; }
        public int Rank { get; set; }
        public string Status { get; set; }
        public string Details { get; set; }
    }
}
