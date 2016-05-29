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
            switch (type)
            {
                case LogType.Error:
                    Console.ForegroundColor = ConsoleColor.Red;
                    break;
                case LogType.Log:
                    Console.ForegroundColor = ConsoleColor.White;
                    break;
                case LogType.Warn:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    break;
                case LogType.Debug:
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    break;
                default:
                    Console.ForegroundColor = ConsoleColor.DarkMagenta;
                    break;
            }
            Console.WriteLine("[" + type + "]:" + msg);
        }
    }
}
