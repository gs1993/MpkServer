using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Transfer.TrackController
{
    public class EditableTrackDto:IValidatableObject
    {
        [Required]
        public int? Id { get; set; }

        [Required]
        public int? LineNumber { get; set; }

        [Required]
        public ICollection<int> BusStops { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (BusStops == null || BusStops.Count <= 0)
                yield return new ValidationResult("Należy podać przynajmniej jeden przystanek.", new string[] { "BusStops" });
        }
    }
}
