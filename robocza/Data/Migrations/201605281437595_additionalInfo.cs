namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class additionalInfo : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Activities", "AdditionalInfo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Activities", "AdditionalInfo");
        }
    }
}
