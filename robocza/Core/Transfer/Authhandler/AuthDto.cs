using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Attributes;
using Core.Transfer.Base;
using Core.Transfer.BusStopHandler;

namespace Core.Transfer.Authhandler
{
    [Message("user.login", typeof(EmptyDto))]
    public class AuthDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
