using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace order_stock_management_api.Migrations
{
    /// <inheritdoc />
    public partial class order_isSucces_fixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "isSuccess",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: -1,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "isSuccess",
                table: "Orders",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: -1);
        }
    }
}
