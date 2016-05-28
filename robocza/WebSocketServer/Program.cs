using System;
using System.Linq;
using Core.Logger;
using Data.Service;
using Newtonsoft.Json;
using SimpleInjector;
using WebSocketServer.Activity;
using WebSocketServer.Activity.Resolvers;
using WebSocketServer.Connection;
using WebSocketServer.Events;
using WebSocketServer.Handlers;
using WebSocketServer.MessageResolver;
using WebSocketServer.Services;

namespace WebSocketServer
{
    class Program
    {
        /*
        var ws = new WebSocket("ws://localhost:7878");
        ws.onmessage = function(data){console.log(data);}
        var data = {BusId:'1',BusStopId:'2'};
        var obj = {
          Action: "busStop.Activity",
          Data: JSON.stringify(data)
        };

        ws.send(JSON.stringify(obj));
        */
        static void Main(string[] args)
        {
            // var ws = new WebSocket(ip);
            var server = new Fleck.WebSocketServer("ws://0.0.0.0:7878");
            server.SupportedSubProtocols = new[] { "superchat", "chat" };
            using (var container = GetContainer())
            {
                server.Start(socket =>
                {
                    container.GetInstance<IConnectionHolder>().AddConnection(new Connection.Connection(socket, container));
                });

                Console.ReadLine();
            }
        }

        public static void SetJsonConfig()
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings()
            {
                NullValueHandling = NullValueHandling.Ignore
            };
        }

        public static Container GetContainer()
        {
            var container = new Container();

            var assemblies = AppDomain.CurrentDomain.GetAssemblies()
                .AsParallel()
                .Where(x => x.FullName.StartsWith("WebSocketServer"))
                .ToList();
            var asdsd = AppDomain.CurrentDomain.GetAssemblies();


            //Rejestracja serwisów
            container.Register<ILogger, ConsoleLogger>(Lifestyle.Singleton);
            container.Register<IDatabaseService, DatabaseService>(Lifestyle.Singleton);
            container.Register<IUserService, UserService>(Lifestyle.Singleton);
            container.Register<IConnectionHolder, ConnectionHolder>(Lifestyle.Singleton);
            container.Register<IMessageResolver, MessageResolver.MessageResolver>(Lifestyle.Singleton);
            container.Register(typeof(IMessageHandler<,>), assemblies);
            container.Register<IEventEmitter, EventEmitter>(Lifestyle.Singleton);

            container.RegisterCollection(typeof(IActivityResolver),
                new[]
                {
                  typeof(ActivityResolveBusEndCourse),
                    typeof(ActivityResolveBusMove),
                    typeof(ActivityResolveBurStartCourse),
                    typeof(ActivityResolveBusTicketCount),
                    typeof(ActivityResolverBusControl)
                }
            );


            container.Register<IActivityResolverProvider, ActivityResolverProvider>(Lifestyle.Transient);
            container.Verify();

            return container;
        }
    }

}
