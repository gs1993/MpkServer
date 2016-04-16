using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Core.Logger;
using Core.Transfer.User;
using Core.Transfer.User.Login;
using Data.Enums;
using Data.Models;
using Microsoft.AspNet.Identity;
using WebApiServer.Services;
using WebApiServer.Session;
using UserLoginDto = Core.Transfer.User.UserLoginDto;

namespace WebApiServer.Controllers
{

    public class UserController : ApiController
    {
        private IUserService _userService;
        private ILogger _logger;
        private ISessionService _sessionService;


        public UserController(IUserService userService, ILogger logger, ISessionService sessionService)
        {
            _userService = userService;
            _logger = logger;
            _sessionService = sessionService;
        }

        [Authorize]
        public List<UserDto> GetUserList()
        {
            if (((Identity) this.User.Identity).User.Rank == UserRank.Admin)
            {
                return _userService.GetUserManager().Users.ToList().Select(x => new UserDto()
                {
                    Email = x.Email,
                    Details = x.Firstname + " " + x.Lastname,
                    Rank = x.Rank,
                    Activated = x.Activated
                }).ToList();
            }
            return null;
        }

        [AllowAnonymous]
        public UserDto SelfRegister(UserSelfCreateDto dto)
        {
            var um = _userService.GetUserManager();
            var result = um.Create(new ApiUser()
            {
                UserName = dto.Email.Split('@')[0],
                Email = dto.Email,
                Rank = 0,
                Activated = false
            }, dto.Password);

            _userService.SaveChanges();

            var user = um.FindByEmail(dto.Email);

            var token = _userService.GenerateToken(user);

            um.SendEmail(user.Id, "Rejestracja do systemu mpk", token.Token);


            return new UserDto()
            {
                Email = user.Email,
                Rank = user.Rank,
                Activated = false
            };
        }

        [AllowAnonymous]
        public UserActivateResultDto ActivateUser(UserActivateDto dto)
        {

            var um = _userService.GetUserManager();

            var user = um.FindByEmail(dto.Email);
            var result = _userService.ActivateUser(user, dto.Token);

            return new UserActivateResultDto()
            {
                Activated = result
            };

        }

        [AllowAnonymous]
        public UserLoginResultDto Login(UserLoginDto dto)
        {
            var result = _sessionService.Login(dto.Email, dto.Password);
            if (string.IsNullOrEmpty(result))return new UserLoginResultDto() {Result = false};
            return new UserLoginResultDto() {Result = true,Token = result};
        }

        [Authorize]
        public void Logout()
        {
            _sessionService.LogOut(((Identity) this.User.Identity).User.Id);
        }
        

    }
}
