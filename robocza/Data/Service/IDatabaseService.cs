using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Service
{
    public interface IDatabaseService
    {
        MainDbContex CreateContext();
    }
}
