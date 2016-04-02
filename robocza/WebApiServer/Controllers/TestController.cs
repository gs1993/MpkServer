using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using Core.Logger;
using Core.Transfer.TestTransfer;
using Data.Models;
using Data.Service;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApiServer.Misc;
using WebApiServer.Services;

namespace WebApiServer.Controllers
{

    public class TestController : ApiController
    {
        private IDatabaseService _db;
        private IUserService _userService;
        public TestController(ILogger logger, IDatabaseService db, IUserService userService)
        {
            _db = db;
            logger.Log("TestController");
            _userService = userService;
        }
        [Authorize]
        public Bus GetJson()
        {
            using (var db = _db.CreateContext())
            {
                var user = new ApiUser() { UserName = "lukraik" };
                _userService.GetUserManager().Create(user, "33qwe");


                if (User != null)
                {
                    var identity = _userService.GetUserManager().CreateIdentity(user,DefaultAuthenticationTypes.ApplicationCookie);
                }


                return db.Buss.First();
            }   

        }
        [EnableCors("*", "*", "*")]
        public TestObj TestPost(TestObj posObj)
        {
                return posObj;
        }
    }
}
