using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Models;
using Data.Service;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApiServer.Services.Services;
using WebApiServer.Session;

namespace WebApiServer.Services
{
    public class UserService : IUserService
    {
        private readonly IDatabaseService _db;
        private readonly MainDbContex _userContext;
        private readonly UserManager<ApiUser> _um;
        private readonly RoleManager<IdentityRole> _rm;


        public UserService(IDatabaseService db)
        {
            _db = db;
            _userContext = _db.CreateContext();
            Tokens = _userContext.Tokens;
                _um = new UserManager<ApiUser>(new UserStore<ApiUser>(_userContext));
                _rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_userContext));
                _um.EmailService = new SendGridEmailService();
        }

        public Principal GetPrincipal(string id)
        {
            using (var db = _db.CreateContext())
            {
                var user = _um.FindById(id);
                var userRoles = db.Roles.Where(role => user.Roles.Any(userRole => userRole.RoleId == role.Id)).ToList();

                var identity = new Identity(user, userRoles);
                var principal = new Principal(identity);
                
                return principal;
            }
            
        }

        public UserManager<ApiUser> GetUserManager()
        {
            return _um;
        }

        public RoleManager<IdentityRole> GetRoleManager()
        {
            return _rm;
        }

        public DbSet<RegisterTokens> Tokens { get; }
    }
}
