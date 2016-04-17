using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Transfer.CourseController;
using Data.Models;

namespace WebApiServer.Converters
{
    public static class CourseExpressions
    {
        public static CourseDto MapToDto(this Course course)
        {
            return new CourseDto()
            {
                Id = course.Id,
                Track = course.Track?.MapToDto(),
                Bus = course.Bus?.MapToDto(),
                Activities = course.Activities?.Select(x=>x.MapToDto()).ToList(),
                Ended = course.Ended
            };
        }
    }
}
