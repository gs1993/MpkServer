using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure.Interception;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;
using Data.Service;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.DataHandler.Encoder;
using WebApiServer.Services;

namespace WebApiServer.Misc
{
    public class SimpleAuthFilter:IAuthenticationFilter
    {
        private const string AuthenticationScheme = "Basic";

        private IUserService _userService;


        public SimpleAuthFilter(IUserService database)
        {
            _userService = database;
        }

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            if (context.ActionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any())
            {
                return;
            }

            if (authorization == null  || authorization.Scheme != AuthenticationScheme || string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing credentials",request);
                return;
            }

            var um = _userService.GetUserManager();

            Tuple<string, string> userNameAndPasword = await ExtractUserNameAndPassword(authorization.Parameter);
            
            var user = await um.FindByNameAsync(userNameAndPasword.Item1);

            var result = um.CheckPassword(user, userNameAndPasword.Item2);

            if (user == null || result == false)
            {
                context.ErrorResult = new AuthenticationFailureResult("Invalid username or password", request);
            }
            else
            {
                context.Principal = _userService.GetPrincipal(user.Id);
            }
        }

        //Chwilowo header autoryzacji base:login;hasło do zmiany w przyszłości
        private Task<Tuple<string, string>> ExtractUserNameAndPassword(string parameter)
        {
            var task = Task.Run(() =>
            {
                var encoder = new Base64TextEncoder();
                var result = Encoding.UTF8.GetString(encoder.Decode(parameter));
                var values = result.Split(';');
                if (values.Count() > 1)return new Tuple<string, string>(values[0], values[1]);
                else return new Tuple<string, string>(values[0],"");
                
            });
            return task;
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue("Basic");

            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);

            return Task.FromResult(0);
        }

        public bool AllowMultiple { get; }
    }

    public class AddChallengeOnUnauthorizedResult : IHttpActionResult
    {
        public AddChallengeOnUnauthorizedResult(AuthenticationHeaderValue challenge, IHttpActionResult innerResult)
        {
            Challenge = challenge;
            InnerResult = innerResult;
        }

        public AuthenticationHeaderValue Challenge { get; private set; }

        public IHttpActionResult InnerResult { get; private set; }

        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await InnerResult.ExecuteAsync(cancellationToken);

            return response;
        }
    }

    public class AuthenticationFailureResult : IHttpActionResult
    {
        public AuthenticationFailureResult(string reasonPhrase, HttpRequestMessage request)
        {
            ReasonPhrase = reasonPhrase;
            Request = request;
        }

        public string ReasonPhrase { get; private set; }

        public HttpRequestMessage Request { get; private set; }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        private HttpResponseMessage Execute()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            response.RequestMessage = Request;
            response.ReasonPhrase = ReasonPhrase;
            return response;
        }
    }
}
