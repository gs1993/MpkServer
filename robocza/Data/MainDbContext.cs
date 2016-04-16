using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Data
{
    public class MainDbContex:IdentityDbContext<ApiUser>
    {
        public MainDbContex():base()
        {
                
        }

        public DbSet<Bus> Buss { get; set; }

        public DbSet<BusStop> BusStops { get; set; }

        public DbSet<Track> Tracks { get; set; }
        
        public DbSet<RegisterToken> Tokens { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Activity> Activities { get; set; }
    }
}
