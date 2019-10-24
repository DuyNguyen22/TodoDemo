using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 100, nullable: false),
                    Description = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(maxLength: 100, nullable: false),
                    LastName = table.Column<string>(maxLength: 100, nullable: false),
                    Username = table.Column<string>(maxLength: 50, nullable: false),
                    Birthdate = table.Column<DateTime>(nullable: false),
                    IsBlocked = table.Column<bool>(nullable: false),
                    IsAdmin = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Todos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    CategoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Todos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Todos_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Todos_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TodoTags",
                columns: table => new
                {
                    TodoId = table.Column<int>(nullable: false),
                    TagId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoTags", x => new { x.TodoId, x.TagId });
                    table.ForeignKey(
                        name: "FK_TodoTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TodoTags_Todos_TodoId",
                        column: x => x.TodoId,
                        principalTable: "Todos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[,]
                {
                    { 1, "National information", "National" },
                    { 2, "Fashion information", "Fashion" },
                    { 3, "Learning information", "Learning" },
                    { 4, "Hobby information", "Hobby" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "National" },
                    { 2, "Fashion" },
                    { 3, "Learning" },
                    { 4, "Hobby" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthdate", "FirstName", "IsAdmin", "IsBlocked", "LastName", "PasswordHash", "PasswordSalt", "Username" },
                values: new object[] { 1, new DateTime(1980, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", true, false, "System", new byte[] { 199, 137, 184, 239, 124, 152, 39, 129, 84, 76, 159, 165, 11, 11, 108, 201, 203, 107, 0, 177, 64, 42, 163, 46, 177, 147, 96, 139, 15, 99, 118, 212, 241, 164, 152, 68, 207, 186, 181, 104, 120, 141, 157, 110, 226, 195, 216, 86, 163, 50, 114, 138, 42, 16, 213, 192, 171, 234, 216, 7, 175, 19, 191, 221 }, new byte[] { 223, 64, 31, 164, 207, 79, 51, 49, 18, 66, 117, 138, 17, 166, 4, 183, 36, 213, 161, 198, 107, 224, 0, 178, 53, 45, 56, 195, 38, 160, 162, 160, 49, 62, 247, 226, 98, 83, 213, 173, 148, 116, 48, 118, 27, 114, 229, 101, 0, 146, 106, 137, 144, 124, 165, 52, 234, 23, 159, 17, 186, 8, 8, 166, 178, 106, 51, 44, 246, 20, 155, 145, 223, 134, 134, 79, 138, 186, 199, 176, 180, 164, 69, 12, 65, 85, 67, 249, 167, 101, 161, 153, 20, 42, 34, 246, 173, 187, 114, 173, 9, 129, 254, 221, 191, 2, 143, 117, 219, 156, 119, 1, 161, 96, 44, 239, 6, 115, 10, 216, 108, 49, 111, 206, 135, 181, 103, 156 }, "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_CategoryId",
                table: "Todos",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_CreatedBy",
                table: "Todos",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TodoTags_TagId",
                table: "TodoTags",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoTags");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Todos");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
