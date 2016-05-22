using System.Threading.Tasks;
using Core.Transfer.Authhandler;
using Core.Transfer.Base;
using Data.Service;
using Microsoft.AspNet.Identity;
using WebSocketServer.Connection;
using WebSocketServer.MessageResolver;
using WebSocketServer.MessageResolver.Dto;
using WebSocketServer.Services;

namespace WebSocketServer.Handlers.Action
{
    public class AuthHandler : IMessageHandler<AuthDto, EmptyDto>
    {
        private readonly IDatabaseService _databaseService;
        private readonly IUserService _userService;

        public AuthHandler(IUserService userService, IDatabaseService databaseService)
        {
            _userService = userService;
            _databaseService = databaseService;
        }

        public Task<EmptyDto> Handle(AuthDto dto, IConnection connection)
        {
            using (var db = _databaseService.CreateContext())
            {
                var um = _userService.GetUserManager(db);
                var user = um.FindByEmail(dto.Email);
                if (um.CheckPassword(user, dto.Password))
                {
                    connection.Auth(user);
                }
                else
                {
                    throw new HandlingException(ResultState.Error, "User not found");
                }
                return TaskHelper.EmptyResult();
            }
        }
    }
}
