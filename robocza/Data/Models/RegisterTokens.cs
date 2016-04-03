using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class RegisterTokens
    {
        public int Id { get; set; }
        public ApiUser User { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Token { get; set; }
    }
}
