namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class secondInit : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Buses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RegistrationNumber = c.String(),
                        GotMachine = c.Boolean(nullable: false),
                        BusType = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        LastControl = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BusStops",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Lat = c.Double(nullable: false),
                        Lng = c.Double(nullable: false),
                        LocalizationString = c.String(),
                        GotMachine = c.Boolean(nullable: false),
                        GotKiosk = c.Boolean(nullable: false),
                        BusStopType = c.Int(nullable: false),
                        LastControl = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tracks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Tracks = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Tracks");
            DropTable("dbo.BusStops");
            DropTable("dbo.Buses");
        }
    }
}
