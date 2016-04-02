namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addToken : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RegisterTokens",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ExpireDate = c.DateTime(nullable: false),
                        Token = c.String(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RegisterTokens", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.RegisterTokens", new[] { "User_Id" });
            DropTable("dbo.RegisterTokens");
        }
    }
}
