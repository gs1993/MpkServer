namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class someChanges : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ActivityType = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Lat = c.Double(nullable: false),
                        Lng = c.Double(nullable: false),
                        Bus_Id = c.Int(),
                        BusStop_Id = c.Int(),
                        Course_Id = c.Int(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Buses", t => t.Bus_Id)
                .ForeignKey("dbo.BusStops", t => t.BusStop_Id)
                .ForeignKey("dbo.Courses", t => t.Course_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.Bus_Id)
                .Index(t => t.BusStop_Id)
                .Index(t => t.Course_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Ended = c.Boolean(nullable: false),
                        Bus_Id = c.Int(),
                        Track_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Buses", t => t.Bus_Id)
                .ForeignKey("dbo.Tracks", t => t.Track_Id)
                .Index(t => t.Bus_Id)
                .Index(t => t.Track_Id);
            
            AddColumn("dbo.Tracks", "BusStops", c => c.String());
            DropColumn("dbo.Tracks", "Tracks");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tracks", "Tracks", c => c.String());
            DropForeignKey("dbo.Activities", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Courses", "Track_Id", "dbo.Tracks");
            DropForeignKey("dbo.Courses", "Bus_Id", "dbo.Buses");
            DropForeignKey("dbo.Activities", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.Activities", "BusStop_Id", "dbo.BusStops");
            DropForeignKey("dbo.Activities", "Bus_Id", "dbo.Buses");
            DropIndex("dbo.Courses", new[] { "Track_Id" });
            DropIndex("dbo.Courses", new[] { "Bus_Id" });
            DropIndex("dbo.Activities", new[] { "User_Id" });
            DropIndex("dbo.Activities", new[] { "Course_Id" });
            DropIndex("dbo.Activities", new[] { "BusStop_Id" });
            DropIndex("dbo.Activities", new[] { "Bus_Id" });
            DropColumn("dbo.Tracks", "BusStops");
            DropTable("dbo.Courses");
            DropTable("dbo.Activities");
        }
    }
}
