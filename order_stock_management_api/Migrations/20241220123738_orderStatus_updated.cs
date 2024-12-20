using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace order_stock_management_api.Migrations
{
    /// <inheritdoc />
    public partial class orderStatus_updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isSuccess",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "orderStatus",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: -1,
                oldClrType: typeof(bool),
                oldType: "bit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "orderStatus",
                table: "Orders",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: -1);

            migrationBuilder.AddColumn<int>(
                name: "isSuccess",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: -1);
        }
    }
}
