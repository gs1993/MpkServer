namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Buses", "BusNumber", c => c.String());
            AddColumn("dbo.AspNetUsers", "Activated", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "Rank", c => c.Int(nullable: false));
            DropColumn("dbo.Buses", "IsActive");
            DropColumn("dbo.AspNetRoles", "Discriminator");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetRoles", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.Buses", "IsActive", c => c.Boolean(nullable: false));
            DropColumn("dbo.AspNetUsers", "Rank");
            DropColumn("dbo.AspNetUsers", "Activated");
            DropColumn("dbo.Buses", "BusNumber");
        }
    }
}
