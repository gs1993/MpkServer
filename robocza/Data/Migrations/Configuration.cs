using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Text;
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
            context.Users.AddOrUpdate(u => u.UserName,
                new ApiUser()
                {
                    UserName = "lukraiktest2",
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
                    PhoneNumber = "08869879",
                    Rank = UserRank.Device,
                    Activated = true
                });
            context.Users.AddOrUpdate(u => u.UserName, new ApiUser()
            {
                UserName = "driver1",
                Email = "driver1",
                PasswordHash = password,
                PhoneNumber = "082329183",
                Rank = UserRank.Device,
                Activated = true
            });


            context.Buss.AddOrUpdate(new Bus()
            {
                BusType = BusType.Articulated,
                GotMachine = false,
                Id = 1,
                LastControl = DateTime.Now,
                RegistrationNumber = "12211NLI",
                BusStatus = Status.Active,
                BusNumber = "0892"
            });
            context.Buss.AddOrUpdate(new Bus()
            {
                BusType = BusType.Normal,
                GotMachine = false,
                Id = 2,
                LastControl = new DateTime(2015, 01, 02),
                RegistrationNumber = "1DDNLD",
                BusStatus = Status.Active,
                BusNumber = "0784"
            });
            context.Buss.AddOrUpdate(new Bus()
            {
                BusType = BusType.Normal,
                GotMachine = false,
                Id = 3,
                LastControl = new DateTime(2015, 01, 02),
                RegistrationNumber = "TREWQ3",
                BusStatus = Status.InActive,
                BusNumber = "0584"
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
                BusStopStatus = Status.Active
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
                BusStopStatus = Status.Active
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
                BusStopStatus = Status.Active
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
                BusStopStatus = Status.Active
            });
            context.Tracks.AddOrUpdate(new Track()
            {
                Id = 1,
                BusStops = "1;2;3",
                IsArchive = false
            });
            context.Tracks.AddOrUpdate(new Track()
            {
                Id = 1,
                BusStops = "3;2;1",
                IsArchive = true
            });

            var user = new ApiUser()
            {
                UserName = "Testowy uzytkownik kursu",
                PasswordHash = "test",
                Rank = UserRank.Device
            };
            context.Users.AddOrUpdate(x => x.UserName, user);


            var bus = new Bus()
            {
                BusType = BusType.Normal,
                GotMachine = false,
                Id = 100,
                LastControl = new DateTime(2015, 01, 02),
                RegistrationNumber = "POJAZD TESTOWY",
                BusStatus = Status.InActive,
                BusNumber = "222"
            };

            var busStop1 = new BusStop()
            {
                Id = 801,
                GotMachine = false,
                LastControl = DateTime.Now,
                BusStopType = BusStopType.Normal,
                GotKiosk = false,
                Lat = 42.3,
                Lng = 45.3,
                LocalizationString = "Ulica Pacyfistyczna",
                Name = "Przystanek test kursu 1",
                BusStopStatus = Status.Active
            };

            var busStop2 = new BusStop()
            {
                Id = 802,
                GotMachine = false,
                LastControl = DateTime.Now,
                BusStopType = BusStopType.Normal,
                GotKiosk = false,
                Lat = 42.3,
                Lng = 45.3,
                LocalizationString = "Ulica Pacyfistyczna",
                Name = "Przystanek test kursu 2",
                BusStopStatus = Status.Active
            };

            context.Buss.AddOrUpdate(bus);
            context.BusStops.AddOrUpdate(busStop1);
            context.BusStops.AddOrUpdate(busStop2);

            var track = new Track()
            {
                Id = 900,
                IsArchive = false,
                BusStops = "1;2;3"
            };

            context.Tracks.AddOrUpdate(track);


            var course = new Course()
            {
                Id = 1,
                Track = track,
                Bus = bus,
            };
            context.Courses.AddOrUpdate(x=>x.Id,course);


            var activities = new List<Activity>()
                {
                    new Activity()
                    {
                        Id=901,
                        Bus = bus,
                        ActivityType = ActivityType.BusStopCheck,
                        BusStop = busStop1,
                        Date = DateTime.Now,
                        User = null,
                        Course = course,
                    },
                    new Activity()
                    {
                        Id=902,
                        Bus = bus,
                        ActivityType = ActivityType.BusStopCheck,
                        BusStop = busStop2,
                        Date = DateTime.Now,
                        User = null,
                        Course = course

                    }
                };

            activities.ForEach(x => context.Activities.AddOrUpdate(x));

            
            //context.SaveChanges();


            //try
            //{
            //    context.SaveChanges();
            //}
            //catch (DbEntityValidationException ex)
            //{
            //    StringBuilder sb = new StringBuilder();

            //    foreach (var failure in ex.EntityValidationErrors)
            //    {
            //        sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
            //        foreach (var error in failure.ValidationErrors)
            //        {
            //            sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
            //            sb.AppendLine();
            //        }
            //    }

            //    throw new DbEntityValidationException(
            //        "Entity Validation Failed - errors follow:\n" +
            //        sb.ToString(), ex
            //    ); // Add the original exception as the innerException
            //}
        }
    }
}
