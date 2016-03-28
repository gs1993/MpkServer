using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.Attributes
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class MessageAttribute:Attribute
    {
        public MessageAttribute(string actionName,Type resultType)
        {
            this.ActionName = actionName;
            this.ResultType = resultType;
        }


        public readonly string ActionName;
        public readonly Type ResultType;
    }
}
