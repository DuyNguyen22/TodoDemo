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
                columns: new[] { "Id", "BackgroundColor", "Description", "Title" },
                values: new object[,]
                {
                    { 1, "#DDEBF7", "National information", "National" },
                    { 2, "#FEF6F6", "Fashion information", "Fashion" },
                    { 3, "#FAE2E2", "Learning information", "Learning" },
                    { 4, "#FBE6A2", "Hobby information", "Hobby" }
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
                values: new object[] { 1, new DateTime(1980, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", true, false, "System", new byte[] { 83, 97, 44, 201, 241, 5, 130, 46, 188, 209, 253, 16, 53, 237, 15, 51, 127, 96, 165, 56, 164, 58, 126, 240, 172, 130, 8, 165, 231, 158, 69, 18, 18, 232, 166, 235, 246, 144, 26, 147, 12, 151, 168, 34, 69, 117, 205, 63, 113, 90, 39, 227, 191, 121, 193, 249, 220, 146, 52, 37, 31, 85, 150, 98 }, new byte[] { 215, 196, 207, 187, 231, 194, 23, 205, 213, 36, 78, 157, 46, 118, 174, 92, 63, 46, 189, 234, 237, 51, 129, 108, 206, 164, 49, 42, 115, 77, 134, 16, 221, 92, 61, 249, 152, 42, 194, 169, 208, 245, 63, 199, 80, 221, 174, 4, 24, 108, 217, 167, 0, 172, 62, 252, 2, 98, 103, 192, 68, 105, 219, 240, 241, 201, 177, 26, 236, 124, 115, 158, 165, 120, 65, 28, 85, 155, 57, 26, 53, 104, 153, 10, 108, 9, 199, 186, 196, 69, 156, 155, 158, 35, 118, 6, 38, 235, 253, 127, 208, 250, 103, 225, 33, 197, 16, 241, 71, 67, 68, 145, 247, 247, 239, 244, 197, 126, 69, 54, 164, 98, 130, 164, 94, 55, 176, 67 }, "Admin" });

            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "CategoryId", "CreatedBy", "CreatedDate", "Description", "IsCompleted", "Title" },
                values: new object[,]
                {
                    { 1, 2, 1, new DateTime(2019, 10, 26, 5, 19, 50, 482, DateTimeKind.Local).AddTicks(520), "Desciption-1", false, "Title-1" },
                    { 18, 3, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1436), "Desciption-18", false, "Title-18" },
                    { 17, 2, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1433), "Desciption-17", false, "Title-17" },
                    { 16, 1, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1429), "Desciption-16", false, "Title-16" },
                    { 15, 4, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1426), "Desciption-15", false, "Title-15" },
                    { 14, 3, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1422), "Desciption-14", false, "Title-14" },
                    { 13, 2, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1419), "Desciption-13", false, "Title-13" },
                    { 12, 1, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1415), "Desciption-12", false, "Title-12" },
                    { 11, 4, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1412), "Desciption-11", false, "Title-11" },
                    { 10, 3, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1408), "Desciption-10", false, "Title-10" },
                    { 9, 2, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1404), "Desciption-9", false, "Title-9" },
                    { 8, 1, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1401), "Desciption-8", false, "Title-8" },
                    { 7, 4, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1397), "Desciption-7", false, "Title-7" },
                    { 6, 3, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1393), "Desciption-6", false, "Title-6" },
                    { 5, 2, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1390), "Desciption-5", false, "Title-5" },
                    { 4, 1, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1386), "Desciption-4", false, "Title-4" },
                    { 3, 4, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1381), "Desciption-3", false, "Title-3" },
                    { 2, 3, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1316), "Desciption-2", false, "Title-2" },
                    { 19, 4, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1440), "Desciption-19", false, "Title-19" },
                    { 20, 1, 1, new DateTime(2019, 10, 26, 5, 19, 50, 485, DateTimeKind.Local).AddTicks(1443), "Desciption-20", false, "Title-20" }
                });

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
