using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Logger;
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
        private readonly IEmailService _tokenEmailService;
        private readonly ILogger _logger;

        private readonly MainDbContex _userContext;
        private readonly UserManager<ApiUser> _um;


        public UserService(IDatabaseService db,IEmailService email,ILogger logger)
        {
            _db = db;
            _tokenEmailService = email;
            _logger = logger;
            _logger.Log("Init userService");
            _userContext = _db.CreateContext();
            _um = new UserManager<ApiUser>(new UserStore<ApiUser>(_userContext));
        }
        public Principal GetPrincipal(string id)
        {
            using (var db = _db.CreateContext())
            {
                var user = _um.FindById(id);
                var userRoles = new List<IdentityRole>();
                var identity = new Identity(user, userRoles);
                var principal = new Principal(identity);
                
                return principal;
            }
            
        }

        public RegisterToken GenerateToken(ApiUser user)
        {
            using (var db = _db.CreateContext())
            {
                var token =
                    db.Tokens
                        .FirstOrDefault(x => x.User.Id == user.Id && x.ExpireDate < DateTime.Now);
                if (token==null)
                {
                    var contextUser = db.Users.Find(user.Id);
                    var tokenObj = db.Tokens.Add(new RegisterToken()
                    {
                        ExpireDate = DateTime.Now.AddMinutes(20),
                        Token = Guid.NewGuid().ToString(),
                        User = contextUser
                    });
                    token = tokenObj;
                }
                db.SaveChanges();

                _logger.Log($"Send email to:{user.Email}");
                _tokenEmailService.Send(user.Email,"Rejestracja do systemu MPK",$"Twój token do aktywacji to :{token.Token}");

                return token;
            }
        }

        public void SaveChanges()
        {
            _userContext.SaveChanges();
        }

        public bool ActivateUser(ApiUser user, string token)
        {
            using (var db = _db.CreateContext())
            {
                var tokenObj = db.Tokens
                    .FirstOrDefault(x => x.Token == token && x.User.Id == user.Id && x.ExpireDate > DateTime.Now);
                if (tokenObj == null) return false;

                var userObj = db.Users.First(x => x.Id == user.Id);
                userObj.Activated = true;

                db.SaveChanges();
                return true;

            }
        }

        public UserManager<ApiUser> GetUserManager() => _um;
    }
}
