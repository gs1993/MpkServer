using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiServer.Services;

namespace WebApiServer.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class BusStopController : ApiController
    {
        private IUserService _userService;

        public BusStopController(IUserService userService)
        {
            _userService = userService;
        }
    }
}
