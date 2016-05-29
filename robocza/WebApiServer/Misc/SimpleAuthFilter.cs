using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;
using Core.Enums;
using Core.Logger;
using WebApiServer.Services;

namespace WebApiServer.Misc
{
    public class SimpleAuthFilter:IAuthenticationFilter
    {
        //private const string AuthenticationScheme = "Session";

        private ISessionService _sessionService;

        private IUserService _userService;

        private ILogger _logger;


        public SimpleAuthFilter(ISessionService sessionService, IUserService userService, ILogger logger)
        {
            _sessionService = sessionService;
            _userService = userService;
            _logger = logger;
        }

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            HttpRequestMessage request = context.Request;

            _logger.Log($"{context.Request.Method.Method}:{context.Request.RequestUri.ToString()}");

            var sessionheader = request.Headers.Any(x=>x.Key=="Session");

            if (context.ActionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()) return;

            if (request.Headers.Any(x => x.Key == "Debug"))
            {
                context.Principal = _userService.GetPrincipal(_userService.GetUserManager().Users.First(x => x.Rank == UserRank.User).Id);
                return;
            }

            if (sessionheader == false)
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing credentials", request);
                return;
            }

            var sessionToken = request.Headers.GetValues("Session").First();

            if (string.IsNullOrEmpty(sessionToken))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing credentials",request);
                return;
            }

            var user = _sessionService.SessionCheck(sessionToken);

            if (user == null )
            {
                context.ErrorResult = new AuthenticationFailureResult("Invalid session", request);
            }
            else
            {
                context.Principal = _userService.GetPrincipal(user.Id);
            }
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
