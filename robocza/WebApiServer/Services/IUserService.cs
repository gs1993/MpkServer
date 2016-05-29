using Data.Models;
using Microsoft.AspNet.Identity;
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
