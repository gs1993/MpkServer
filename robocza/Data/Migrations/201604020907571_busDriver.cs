namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class busDriver : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Buses", "Driver_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Buses", "Driver_Id");
            AddForeignKey("dbo.Buses", "Driver_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Buses", "Driver_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Buses", new[] { "Driver_Id" });
            DropColumn("dbo.Buses", "Driver_Id");
        }
    }
}
