using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace order_stock_management_api.Migrations
{
    /// <inheritdoc />
    public partial class order_updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "priorityScore",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "waitingTime",
                table: "Customers");

            migrationBuilder.AddColumn<double>(
                name: "priorityScore",
                table: "Orders",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "waitingTime",
                table: "Orders",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "priorityScore",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "waitingTime",
                table: "Orders");

            migrationBuilder.AddColumn<double>(
                name: "priorityScore",
                table: "Customers",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "waitingTime",
                table: "Customers",
                type: "float",
                nullable: true);
        }
    }
}
