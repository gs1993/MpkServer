using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.Attributes;
using Newtonsoft.Json;
using SimpleInjector;
using WebSocketServer.Connection;
using WebSocketServer.Handlers;
using WebSocketServer.MessageResolver.Dto;

namespace WebSocketServer.MessageResolver
{
    public class MessageResolver : IMessageResolver
    {
        private Container _container;


        public MessageResolver(Container container)
        {
            _container = container;
        }

        private Type[] getGenericTypes(string name)
        {
            var typeT1 = AppDomain.CurrentDomain
                .GetAssemblies()
                .AsParallel()
                .SelectMany(x => x
                    .GetTypes())
                .FirstOrDefault(x => x.GetCustomAttributes(typeof(MessageAttribute), true)
                    .Any(y => ((MessageAttribute)y).ActionName == name));

            var typeT2 =
                typeT1.GetCustomAttributes(typeof(MessageAttribute), true)
                    .Select(x => (MessageAttribute)x)
                    .First()
                    .ResultType;
            return new Type[] {typeT1,typeT2};
        }

        private Type getHandlerType(string name)
        {
            Type type = typeof(IMessageHandler<,>);
            type = type.MakeGenericType(getGenericTypes(name));
            return type;
        }

        public Task<string> ResolveRequest(string msg,IConnection connection)
        {
            var result = new MessageResultDto();
            try
            {
                var messageDto = JsonConvert.DeserializeObject<MessageDto>(msg);
                var genericTypes = getGenericTypes("busStop.Activity");
                var handlerType = getHandlerType("busStop.Activity");
                var handler = _container.GetInstance(getHandlerType("busStop.Activity"));
                var methodInfo = handlerType.GetMethod("Handle", new Type[] {getGenericTypes("busStop.Activity").First()});
                var dto = JsonConvert.DeserializeObject(messageDto.Data, genericTypes[0]);
                var handlerResult = methodInfo.Invoke(handler, new object[] {dto, connection });

                result.State=ResultState.Ok;
                result.Data = JsonConvert.SerializeObject(handlerResult);

            }
            catch (HandlingException exception)
            {
                result.State = exception.State;
            }
            
            return Task.FromResult(JsonConvert.SerializeObject(result));
        }
    }
}
