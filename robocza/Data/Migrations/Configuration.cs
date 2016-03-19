﻿using Data.Enums;
using Data.Models;

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
           context.Buss.AddOrUpdate(new Bus ()
           {
               BusType = BusType.Articulated,
               GotMachine = false,
               Id = 1,
               IsActive = true,
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