namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class trackChange : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tracks", "LineNumber", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tracks", "LineNumber");
        }
    }
}
