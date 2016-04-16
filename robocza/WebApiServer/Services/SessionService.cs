using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Logger;
using Data.Models;
using Microsoft.AspNet.Identity;

namespace WebApiServer.Services
{
    public class SessionService:ISessionService
    {
        Dictionary<string,string> _sessionTokens { get; set; }

        private IUserService _userService;
        private ILogger _logger;

        public SessionService(IUserService userService, ILogger logger)
        {
            _userService = userService;
            _logger = logger;
            _logger.Log("Init session service");
            _sessionTokens = new Dictionary<string, string>();
        }

        public string Login(string email, string password)
        {
            _logger.Log($"Trying to login: {email} {password}");
            var um = _userService.GetUserManager();

            var user =um.FindByEmail(email);
            var passwordCheck = um.CheckPassword(user, password);
            _logger.Log($"Result:{passwordCheck}");

            if (passwordCheck)
            {
                var sessionToken = Guid.NewGuid().ToString();
                _logger.Log($"Generated token:{sessionToken}");
                _sessionTokens.Add(sessionToken, user.Id);
                return sessionToken;
            }

            return null;

        }

        public ApiUser SessionCheck(string token)
        {
            _logger.Log($"Session check:{token}");
            if (_sessionTokens.ContainsKey(token))
            {
                _logger.Log($"Session exists");
                return _userService.GetUserManager().FindById(_sessionTokens[token]);
            }
            _logger.Log($"Session check failed, current sessions");
            foreach (var pair in _sessionTokens)
            {
                _logger.Log($"UserId:{pair.Value} Token:{pair.Key}");
            }
            return null;
        }

        public void LogOut(string userId)
        {
            _logger.Log($"Loging out {userId}");
            var key = _sessionTokens.Where(x => x.Value == userId).Select(x => x.Key).FirstOrDefault();
            if (key != null) _sessionTokens.Remove(key);
        }
    }
}
