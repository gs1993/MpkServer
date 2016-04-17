using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Core.Logger;
using Core.Transfer.CourseController;
using Data.Service;
using WebApiServer.Converters;

namespace WebApiServer.Controllers
{
    [Authorize]
    public class CourseController:ApiController
    {
        private readonly IDatabaseService _databaseService;
        private ILogger _logger;

        public CourseController(IDatabaseService databaseService, ILogger logger)
        {
            _databaseService = databaseService;
            _logger = logger;
        }


        public CourseDto Get(int id)
        {
            using (var db = _databaseService.CreateContext())
            {
                var course = db.Courses.Include(x=>x.Activities)
                    .Include(x=>x.Bus)
                    .Include(x=>x.Track)
                    .Include(x=>x.Activities.Select(y=>y.BusStop))
                    .Include(x=>x.Activities.Select(y=>y.Bus))
                    .Include(x => x.Activities.Select(y => y.Bus))
                    .Include(x=>x.Bus.Driver)
                    .FirstOrDefault(x => x.Id == id);

                return course?.MapToDto();
            }
        }

    }
}
