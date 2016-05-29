using System.Threading.Tasks;

namespace WebApiServer.Services
{
    public interface IEmailService
    {
        void Send(string email, string subject, string body);
        Task SendAsync(string email, string subject, string body);
    }
}
