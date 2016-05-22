using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace WebSocketServer.Activity
{
    public class ActivityResolverProvider:IActivityResolverProvider
    {
        private readonly IActivityResolver[] _resolvers;

        public ActivityResolverProvider(IActivityResolver[] resolvers)
        {
            _resolvers = resolvers;
        }

        public IActivityResolver GetResolver(ActivityType type)
        {
            var resolver = _resolvers.FirstOrDefault(x => x.ActivityType == type);

            if (resolver == null) throw new NotImplementedException("This activity type has no resolver");

            return resolver;
        }
    }
}
