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
                    PhoneNumber = "08869879",
                    Activated = true

                });
            context.Users.AddOrUpdate(u => u.UserName,
                new ApiUser()
                {
                    UserName = "test",
                    Email = "test",
                    PasswordHash = password,
                    PhoneNumber = "08869879"
                    Rank = UserRank.Device,
                    Activated = true
                });
            context.Users.AddOrUpdate(u => u.UserName, new ApiUser()
                {
                    UserName = "driver1",
                    Email = "driver1",
                    PasswordHash = password,
                    PhoneNumber = "082329183",
                    Rank=UserRank.Device,
                    Activated = true
                });


            context.Buss.AddOrUpdate(new Bus ()
           {
               BusType = BusType.Articulated,
               GotMachine = false,
               Id = 1,
               LastControl = DateTime.Now,
               RegistrationNumber = "12211NLI",
               IsArchive = false,
               BusNumber = "0892",
                Driver = context.Users.First(x => x.UserName == "driver1")
            });
            context.Buss.AddOrUpdate(new Bus()
            {
                BusType = BusType.Normal,
                GotMachine = false,
                Id = 2,
                LastControl = new DateTime(2015, 01, 02),
                RegistrationNumber = "1DDNLD",
                IsArchive = true,
                BusNumber = "0784",
                Driver = context.Users.First(x => x.UserName == "driver1")
            });
            context.Buss.AddOrUpdate(new Bus()
            {
                BusType = BusType.Normal,
                GotMachine = false,
                Id = 3,
                LastControl = new DateTime(2015, 01, 02),
                RegistrationNumber = "TREWQ3",
                IsArchive = false,
                BusNumber = "0584",
                Driver = context.Users.First(x => x.UserName == "driver1")
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
                Name = "Przystanek kołobrzeska",
                IsArchive = false
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
                Name = "Przystanek dwa",
                IsArchive = true
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
                Name = "Przystanek trzy",
                IsArchive = false
            });
            context.BusStops.AddOrUpdate(new BusStop()
            {
                GotMachine = false,
                LastControl = DateTime.Now,
                Id = 4,
                BusStopType = BusStopType.Normal,
                GotKiosk = false,
                Lat = 42.3,
                Lng = 45.3,
                LocalizationString = "Ulica Pacyfistyczna",
                Name = "Przystanek cztery",
                IsArchive = false
            });
            context.Tracks.AddOrUpdate(new Track()
            {
                Id = 1,
                Tracks = "1;2;3",
                IsArchive = false
            });
            context.Tracks.AddOrUpdate(new Track()
            {
                Id = 1,
                Tracks = "3;2;1",
                IsArchive = true
            });
        }
    }
}
