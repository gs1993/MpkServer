using System.Collections.Generic;
using Core.Transfer.ActivityController;
using Core.Transfer.Bus;
using Core.Transfer.TrackController;

namespace Core.Transfer.CourseController
{
    public class CourseDto
    {
        public int Id { get; set; }

        public bool Ended { get; set; }

        public ICollection<ActivityDto> Activities { get; set; }

        public TrackDto Track { get; set; }

        public BusDto Bus { get; set; }
    }
}
