﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.User
{
    public class UserActivateDto
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
