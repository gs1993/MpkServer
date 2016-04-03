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

        public UserManager<ApiUser> GetUserManager(MainDbContex db)
        {
            return new UserManager<ApiUser>(new UserStore<ApiUser>(db));
        }
    }
}
