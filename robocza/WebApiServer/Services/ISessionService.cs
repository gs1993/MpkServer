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
