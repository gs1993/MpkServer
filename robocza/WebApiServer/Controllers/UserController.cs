using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Core.Transfer.User;
using Data.Models;
using Microsoft.AspNet.Identity;
using WebApiServer.Services;

namespace WebApiServer.Controllers
{
        
    public class UserController:ApiController
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        public List<UserDto> GetUserList()
        {
            return _userService.GetUserManager().Users.ToList().Select(x=>new UserDto()
            {
                Email = x.Email,
                Details = x.Firstname+" "+x.Lastname,
                Rank = (int)x.Rank,
                Status = "Aktywny"
            }).ToList();
        }

        [Authorize]
        public UserResultDto Login(UserLoginDto dto)
        {
            var um = _userService.GetUserManager();

            var user = um.FindByEmail(dto.Email);

            var result = um.CheckPassword(user, dto.Password);

            return new UserResultDto() {AuthResult = result};
        }

        [AllowAnonymous]
        public UserDto SelfRegister(UserSelfCreateDto dto)
        {
            var um = _userService.GetUserManager();
            var user = new ApiUser()
            {
                Email = dto.Email,
                Rank = 0,  
                Activated = false
            };

            um.Create(user, dto.Password);
            var token =  Guid.NewGuid().ToString();
            _userService.Tokens.Add(new RegisterTokens()
            {
                ExpireDate = DateTime.Now.AddMinutes(10),
                Token = token,
                User = user
            });
 
           // um.SendEmail(user.Id,"Rejestracja do systemu mpk",token);


            return new UserDto()
            {
               Email = user.Email,
               Rank = (int)user.Rank,
               Status = "Aktywny",
               Details = "asd"
            };
        }


    }
}
