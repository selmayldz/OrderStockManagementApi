using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace order_stock_management_api.Migrations
{
    /// <inheritdoc />
    public partial class newPage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    customerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    budget = table.Column<int>(type: "int", nullable: false),
                    customerType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    totalSpend = table.Column<int>(type: "int", nullable: false),
                    customerPhoto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    waitingTime = table.Column<double>(type: "float", nullable: true),
                    priorityScore = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.customerId);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    productId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    stock = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<double>(type: "float", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    productPhoto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.productId);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    orderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    totalPrice = table.Column<double>(type: "float", nullable: false),
                    orderDate = table.Column<DateOnly>(type: "date", nullable: false),
                    orderTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    orderStatus = table.Column<bool>(type: "bit", nullable: false),
                    isSuccess = table.Column<int>(type: "int", nullable: false, defaultValue: -1),
                    customerId = table.Column<int>(type: "int", nullable: false),
                    productId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.orderId);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_customerId",
                        column: x => x.customerId,
                        principalTable: "Customers",
                        principalColumn: "customerId");
                    table.ForeignKey(
                        name: "FK_Orders_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "productId");
                });

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    logId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    logDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    logType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    logDetails = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    customerId = table.Column<int>(type: "int", nullable: false),
                    orderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.logId);
                    table.ForeignKey(
                        name: "FK_Logs_Customers_customerId",
                        column: x => x.customerId,
                        principalTable: "Customers",
                        principalColumn: "customerId");
                    table.ForeignKey(
                        name: "FK_Logs_Orders_orderId",
                        column: x => x.orderId,
                        principalTable: "Orders",
                        principalColumn: "orderId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Logs_customerId",
                table: "Logs",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_Logs_orderId",
                table: "Logs",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_customerId",
                table: "Orders",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_productId",
                table: "Orders",
                column: "productId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
