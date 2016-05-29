using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using Core.Logger;

namespace WebApiServer.Misc
{
    public class ExceptionFilter: ExceptionFilterAttribute
    {
        private ILogger _logger;

        public ExceptionFilter(ILogger logger)
        {
            _logger = logger;
        }

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            _logger.Log($"ActionName{actionExecutedContext.ActionContext.ActionDescriptor.ActionName}",LogType.Error);
            _logger.Log($"{actionExecutedContext.Exception}",LogType.Error);

            actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.Conflict)
            {
                Content = new StringContent($"{{\"Error\":\"Unexpected error\"}}")
            };

            actionExecutedContext.Response.Content.Headers.Remove("Content-type");
            actionExecutedContext.Response.Content.Headers.Add("Content-type", "application/json; charset=utf-8");
            //actionExecutedContext.Response.RequestMessage.
        }
    }
}
