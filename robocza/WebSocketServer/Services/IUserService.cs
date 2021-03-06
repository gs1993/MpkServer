﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Models;
using Data.Service;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WebSocketServer.Services
{
    public interface IUserService
    {
        UserManager<ApiUser> GetUserManager(MainDbContex db);
    }
}
