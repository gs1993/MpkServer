using System.Collections.Generic;
using System.Security.Principal;
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

        public string Name => User.Email;

        public string AuthenticationType => "basic";

        public bool IsAuthenticated => true;
    }
}
