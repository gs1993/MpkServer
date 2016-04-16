using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models;

namespace WebApiServer.Services
{
    public interface ISessionService
    {
        string Login(string email, string password);
        ApiUser SessionCheck(string token);
        void LogOut(string userId);
    }
}
