using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiServer.Services
{
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;
    using Microsoft.AspNet.Identity;
    using SendGrid;


    namespace Services
    {
        public class GmailEmailService : IEmailService
        {
            public void Send(string email, string subject, string body)
            {
                var fromAddress = new MailAddress("mpkemailtest123@gmail.com", "mpkemailtest123@gmail.com");
                var toAddress = new MailAddress(email, email);

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, "WmiiUwmRok3") //Hasło poczty
                };
                using (var msg = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(msg);
                }

            }

            public Task SendAsync(string email,string sub, string body)
            {
                return Task.Run(() => Send(email, sub, body));
            }
        }
    }
}
