using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Models;
using Data.Service;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebSocketServer.Services;

namespace WebSocketServer.Services
{
    public class UserService : IUserService
    {
        private IDatabaseService _db;
        private MainDbContex _userContext;
        private UserManager<ApiUser> _um;
        private RoleManager<IdentityRole> _rm;  

        public UserService(IDatabaseService db)
        {
            _db = db;
            _userContext = _db.CreateContext();
                _um = new UserManager<ApiUser>(new UserStore<ApiUser>(_userContext));
                _rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_userContext));
        }

        public UserManager<ApiUser> GetUserManager()
        {
            return _um;
        }

        public RoleManager<IdentityRole> GetRoleManager()
        {
            return _rm;
        }
    }
}
