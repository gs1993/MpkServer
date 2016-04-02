using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Authhandler;
using Core.Transfer.Base;
using Data.Enums;
using Data.Models;
using Data.Service;
using Microsoft.AspNet.Identity;
using WebSocketServer.Connection;
using WebSocketServer.Events;
using WebSocketServer.MessageResolver;
using WebSocketServer.MessageResolver.Dto;
using WebSocketServer.Services;

namespace WebSocketServer.Handlers.Action
{
    public class AuthHandler:IMessageHandler<AuthDto,EmptyDto>
    {
        private readonly IEventEmitter _emitter;
        private readonly IUserService _userService;
        private readonly UserManager<ApiUser> _um; 

        public AuthHandler(IEventEmitter emitter, IUserService userService)
        {
            _emitter = emitter;
            _userService = userService;
            _um = _userService.GetUserManager();
        }

        public Task<EmptyDto> Handle(AuthDto dto, IConnection connection)
        {
            var user = _um.FindByEmail(dto.Email);
            if (_um.CheckPassword(user, dto.Password))
            {
                switch (user.Rank)
                {
                    case UserRank.User:
                        _emitter.Subscribe(connection);
                        break;
                    case UserRank.Device:

                        break;
                }
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
