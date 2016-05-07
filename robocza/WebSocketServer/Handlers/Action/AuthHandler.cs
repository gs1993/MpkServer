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
    public class AuthHandler : IMessageHandler<AuthDto, EmptyDto>
    {
        private readonly IEventEmitter _emitter;
        private readonly IDatabaseService _databaseService;
        private readonly IUserService _userService;

        public AuthHandler(IEventEmitter emitter, IUserService userService, IDatabaseService databaseService)
        {
            _emitter = emitter;
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
                    switch (user.Rank)
                    {
                        case UserRank.User:
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
}
