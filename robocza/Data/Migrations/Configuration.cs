using Data.Enums;
using Data.Models;
using Microsoft.AspNet.Identity;

namespace Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Data.MainDbContex>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Data.MainDbContex context)
        {
            var passwordHash = new PasswordHasher();
            string password = passwordHash.HashPassword("Password@123");
            context.Users.AddOrUpdate(u=>u.UserName,
                new ApiUser()
                {
                    UserName = "lukraik",
                    Email = "lukraik@gmail.com",
                    PasswordHash = password,
                    PhoneNumber = "08869879"

                });

            context.Buss.AddOrUpdate(new Bus ()
           {
               BusType = BusType.Articulated,
               GotMachine = false,
               Id = 1,
               LastControl = DateTime.Now,
               RegistrationNumber = "12211NLI"
           });

            context.BusStops.AddOrUpdate(new BusStop()
            {
                GotMachine = false,
                LastControl = DateTime.Now,
                Id = 1,
                BusStopType = BusStopType.Normal,
                GotKiosk = false,
                Lat = 42.3,
                Lng = 45.3,
                LocalizationString = "Ulica Wojska Polskiego",
                Name = "Przystanek kołobrzeska"
            });
            context.BusStops.AddOrUpdate(new BusStop()
            {
                GotMachine = false,
                LastControl = DateTime.Now,
                Id = 2,
                BusStopType = BusStopType.Normal,
                GotKiosk = false,
                Lat = 42.3,
                Lng = 45.3,
                LocalizationString = "Ulica Wojska niepolskiego",
                Name = "Przystanek dwa"
            });
            context.BusStops.AddOrUpdate(new BusStop()
            {
                GotMachine = false,
                LastControl = DateTime.Now,
                Id = 3,
                BusStopType = BusStopType.Normal,
                GotKiosk = false,
                Lat = 42.3,
                Lng = 45.3,
                LocalizationString = "Ulica Wojska tymczasowego",
                Name = "Przystanek trzy"
            });
            context.Tracks.AddOrUpdate(new Track()
            {
                Id = 1,
                Tracks = "1;2;3"
            });
        }
    }
}
