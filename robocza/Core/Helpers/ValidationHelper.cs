using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public static class ValidationHelper
    {
        public static void Validate(object obj)
        {
            ValidationContext context = new ValidationContext(obj);

            Validator.ValidateObject(obj, context);
        }
    }
}
