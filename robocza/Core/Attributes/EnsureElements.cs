using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes
{
    public class EnsureElementsAttribute : ValidationAttribute
    {
        public EnsureElementsAttribute()
        {
            ErrorMessage = "Collection should have at least one element";
        }

        public override bool IsValid(object value)
        {
            var list = value as ICollection;

            return value != null && list.Count >= 1;
        }
    }
}
