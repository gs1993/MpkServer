using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WebApiServer.Session
{
    public class Identity:IIdentity
    {
        public ApiUser User {get;private set; }

        public List<IdentityRole> UserRoles { get; private set; }

        public Identity(ApiUser user,List<IdentityRole> userRoles)
        {
            User = user;
            UserRoles = userRoles;
        }

        public string Name => User.UserName;

        public string AuthenticationType => "basic";

        public bool IsAuthenticated => true;
    }
}
