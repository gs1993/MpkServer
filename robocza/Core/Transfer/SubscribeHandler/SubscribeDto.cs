using Core.Enums;
using Core.Transfer.Attributes;
using Core.Transfer.Base;

namespace Core.Transfer.SubscribeHandler
{
    [Message("subscribe",typeof(EmptyDto))]
    public class SubscribeDto
    {
        public EventType EventType { get; set; }

        public int IdOfObject { get; set; }
    }
}
