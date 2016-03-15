using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.SelfHost;

namespace WebApiServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var config = new HttpSelfHostConfiguration("http://localhost:5000");
            config.Routes.MapHttpRoute(
                "API Default", "{controller}/{id}",
                new {id = RouteParameter.Optional});
            using (HttpSelfHostServer server = new HttpSelfHostServer(config))
            {
                server.OpenAsync().Wait();
                Console.WriteLine("WebApi Host on");
                Console.ReadLine();
            }
        }
    }
}
