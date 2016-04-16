using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Enums;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Data.Models
{
    public class ApiUser:IdentityUser
    {
        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public bool Activated { get; set; }

        public UserRank Rank { get; set; }
    }
}
