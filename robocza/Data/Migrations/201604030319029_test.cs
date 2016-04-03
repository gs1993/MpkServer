namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {

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
            DropForeignKey("dbo.Buses", "Driver_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Courses", new[] { "Track_Id" });
            DropIndex("dbo.Courses", new[] { "Bus_Id" });
            DropIndex("dbo.Buses", new[] { "Driver_Id" });
            DropIndex("dbo.Activities", new[] { "User_Id" });
            DropIndex("dbo.Activities", new[] { "Course_Id" });
            DropIndex("dbo.Activities", new[] { "BusStop_Id" });
            DropIndex("dbo.Activities", new[] { "Bus_Id" });
            DropColumn("dbo.Tracks", "BusStops");
            DropColumn("dbo.Buses", "Driver_Id");
            DropTable("dbo.Courses");
            DropTable("dbo.Activities");
        }
    }
}
