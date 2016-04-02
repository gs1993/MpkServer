namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addIsArchive : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Buses", "IsArchive", c => c.Boolean(nullable: false));
            AddColumn("dbo.BusStops", "IsArchive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Tracks", "IsArchive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tracks", "IsArchive");
            DropColumn("dbo.BusStops", "IsArchive");
            DropColumn("dbo.Buses", "IsArchive");
        }
    }
}
