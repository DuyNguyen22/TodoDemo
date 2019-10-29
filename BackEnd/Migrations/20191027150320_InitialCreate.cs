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
                    Description = table.Column<string>(maxLength: 255, nullable: true),
                    BackgroundColor = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
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
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Todos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Todos_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    Tag = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoTags", x => new { x.TodoId, x.Tag });
                    table.ForeignKey(
                        name: "FK_TodoTags_Todos_TodoId",
                        column: x => x.TodoId,
                        principalTable: "Todos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "BackgroundColor", "Description", "Title" },
                values: new object[,]
                {
                    { 1, "#DDEBF7", "National information", "National" },
                    { 2, "#FEF6F6", "Fashion information", "Fashion" },
                    { 3, "#FAE2E2", "Learning information", "Learning" },
                    { 4, "#FBE6A2", "Hobby information", "Hobby" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthdate", "FirstName", "IsAdmin", "IsBlocked", "LastName", "PasswordHash", "PasswordSalt", "Username" },
                values: new object[] { 1, new DateTime(1980, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", true, false, "System", new byte[] { 12, 152, 240, 131, 105, 153, 36, 175, 11, 40, 88, 101, 27, 54, 114, 89, 211, 53, 161, 151, 121, 29, 170, 163, 84, 146, 225, 62, 100, 86, 35, 29, 106, 72, 136, 243, 144, 206, 230, 86, 125, 190, 3, 82, 200, 4, 150, 18, 170, 8, 97, 72, 193, 42, 86, 211, 45, 101, 140, 255, 94, 86, 145, 99 }, new byte[] { 99, 91, 125, 171, 254, 247, 145, 24, 44, 51, 57, 119, 227, 91, 42, 0, 113, 127, 64, 54, 90, 172, 172, 230, 74, 9, 240, 77, 89, 52, 89, 194, 149, 80, 212, 74, 86, 64, 34, 94, 186, 64, 195, 135, 35, 75, 62, 104, 245, 88, 41, 98, 41, 223, 104, 6, 234, 103, 206, 162, 255, 34, 49, 71, 145, 89, 1, 243, 67, 207, 49, 116, 71, 33, 204, 192, 192, 48, 98, 217, 16, 206, 231, 92, 57, 107, 246, 152, 204, 72, 178, 34, 197, 118, 51, 254, 149, 20, 48, 109, 222, 209, 218, 116, 237, 181, 203, 35, 120, 222, 206, 151, 119, 132, 233, 35, 116, 20, 218, 131, 59, 94, 4, 79, 62, 158, 68, 131 }, "Admin" });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "CategoryId", "CreatedBy", "CreatedDate", "Description", "IsCompleted", "Title" },
                values: new object[,]
                {
                    { 1, 2, 1, new DateTime(2019, 10, 27, 22, 3, 20, 65, DateTimeKind.Local).AddTicks(8779), "Desciption-1", false, "Title-1" },
                    { 18, 3, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4622), "Desciption-18", false, "Title-18" },
                    { 17, 2, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4615), "Desciption-17", false, "Title-17" },
                    { 16, 1, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4608), "Desciption-16", false, "Title-16" },
                    { 15, 4, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4600), "Desciption-15", false, "Title-15" },
                    { 14, 3, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4589), "Desciption-14", false, "Title-14" },
                    { 13, 2, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4560), "Desciption-13", false, "Title-13" },
                    { 12, 1, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4545), "Desciption-12", false, "Title-12" },
                    { 11, 4, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4533), "Desciption-11", false, "Title-11" },
                    { 10, 3, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4527), "Desciption-10", false, "Title-10" },
                    { 9, 2, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4520), "Desciption-9", false, "Title-9" },
                    { 8, 1, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4514), "Desciption-8", false, "Title-8" },
                    { 7, 4, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4505), "Desciption-7", false, "Title-7" },
                    { 6, 3, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4390), "Desciption-6", false, "Title-6" },
                    { 5, 2, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4365), "Desciption-5", false, "Title-5" },
                    { 4, 1, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4358), "Desciption-4", false, "Title-4" },
                    { 3, 4, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4348), "Desciption-3", false, "Title-3" },
                    { 2, 3, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4241), "Desciption-2", false, "Title-2" },
                    { 19, 4, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4630), "Desciption-19", false, "Title-19" },
                    { 20, 1, 1, new DateTime(2019, 10, 27, 22, 3, 20, 70, DateTimeKind.Local).AddTicks(4638), "Desciption-20", false, "Title-20" }
                });

            migrationBuilder.InsertData(
                table: "TodoTags",
                columns: new[] { "TodoId", "Tag" },
                values: new object[,]
                {
                    { 1, "Learning" },
                    { 1, "Shopping" },
                    { 2, "Learning" },
                    { 2, "Shopping" },
                    { 3, "Shopping" },
                    { 4, "Shopping" },
                    { 5, "Shopping" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_CategoryId",
                table: "Todos",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Todos_CreatedBy",
                table: "Todos",
                column: "CreatedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoTags");

            migrationBuilder.DropTable(
                name: "Todos");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
