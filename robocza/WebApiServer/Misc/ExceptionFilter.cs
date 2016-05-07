using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace WebApiServer.Misc
{
    public class ExceptionFilter: ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.Conflict)
            {
                Content = new StringContent($"{{\"Error\":\"{actionExecutedContext.Exception.Message}\"}}")
            };

            actionExecutedContext.Response.Content.Headers.Remove("Content-type");
            actionExecutedContext.Response.Content.Headers.Add("Content-type", "application/json; charset=utf-8");
            //actionExecutedContext.Response.RequestMessage.
        }
    }
}
