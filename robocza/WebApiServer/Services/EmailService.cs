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
        public class SendGridEmailService : IIdentityMessageService
        {
            public Task SendAsync(IdentityMessage message)
            {
                var fromAddress = new MailAddress("mpkemailtest123@gmail.com", "mpkemailtest123@gmail.com");
                var toAddress = new MailAddress(message.Destination,message.Destination);
                string fromPassword = "WmiiUwmRok3";
                string subject = message.Subject;
                string body = message.Body;

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };
                using (var msg = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(msg);
                }

                return null;
            }
        }
    }
}
