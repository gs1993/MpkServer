using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApiServer.Session;

namespace WebApiServer.Services
{
    public interface IUserService
    {
        UserManager<ApiUser> GetUserManager();
        RoleManager<IdentityRole> GetRoleManager();
        Principal GetPrincipal(string id);
    }
}
