using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Logger
{
    public class ConsoleLogger:ILogger
    {
        public void Log(string msg, LogType type = LogType.Log)
        {
            Console.WriteLine("[" + type + "]:" + msg);
        }
    }
}
