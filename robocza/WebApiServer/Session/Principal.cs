using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Data.Models;

namespace WebApiServer.Session
{
    public class Principal: IPrincipal
    {
        private Identity _identity { get; set; }


        public Principal(Identity identity)
        {
            _identity = identity;
        }

        public bool IsInRole(string role)
        {
            return _identity.UserRoles.Any(x => x.Name == role);
        }

        public IIdentity Identity => _identity;
    }
}
