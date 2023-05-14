using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DestionationBucketListBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddedIsPublicFieldInDestinationModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Destination",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex("IX_Destination_IsPublic", "Destination", "IsPublic");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Destination");

            migrationBuilder.DropIndex("IX_Destination_IsPublic");
        }
    }
}
