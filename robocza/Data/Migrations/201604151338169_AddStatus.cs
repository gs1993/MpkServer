namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStatus : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Buses", "BusStatus", c => c.Int(nullable: false));
            AddColumn("dbo.BusStops", "BusStopStatus", c => c.Int(nullable: false));
            DropColumn("dbo.Buses", "IsArchive");
            DropColumn("dbo.BusStops", "IsArchive");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BusStops", "IsArchive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Buses", "IsArchive", c => c.Boolean(nullable: false));
            DropColumn("dbo.BusStops", "BusStopStatus");
            DropColumn("dbo.Buses", "BusStatus");
        }
    }
}
