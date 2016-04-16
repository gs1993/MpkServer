using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApiServer.Session;

namespace WebApiServer.Services
{
    public interface IUserService
    {
        UserManager<ApiUser> GetUserManager();
        Principal GetPrincipal(string id);
        bool ActivateUser(ApiUser user, string token);
        RegisterToken GenerateToken(ApiUser user);
        void SaveChanges();
    }
}
