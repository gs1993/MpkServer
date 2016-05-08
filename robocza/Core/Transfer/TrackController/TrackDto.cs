using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Attributes;

namespace Core.Transfer.TrackController
{
    public class TrackDto:IValidatableObject
    {
        public int Id { get; set; }

        [Required]
        public int LineNumber { get; set; }

        [Required]
        public ICollection<int> BusStops { get; set; }

        public bool IsArchive { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (BusStops == null || BusStops.Count<= 0)
                yield return new ValidationResult("Należy podać przynajmniej jeden przystanek.", new string[] { "BusStops"});
        }
    }
}
