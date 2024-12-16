﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using order_stock_management_api.Data;

#nullable disable

namespace order_stock_management_api.Migrations
{
    [DbContext(typeof(OrderStockManagementContext))]
    [Migration("20241216203647_changed_orderStatus")]
    partial class changed_orderStatus
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("order_stock_management_api.Models.Customers", b =>
                {
                    b.Property<int>("customerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("customerId"));

                    b.Property<int>("budget")
                        .HasColumnType("int");

                    b.Property<string>("customerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("customerPhoto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("customerType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("totalSpend")
                        .HasColumnType("int");

                    b.HasKey("customerId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Logs", b =>
                {
                    b.Property<int>("logId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("logId"));

                    b.Property<int>("customerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("logDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("logDetails")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("logType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("orderId")
                        .HasColumnType("int");

                    b.HasKey("logId");

                    b.HasIndex("customerId");

                    b.HasIndex("orderId");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Orders", b =>
                {
                    b.Property<int>("orderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("orderId"));

                    b.Property<int>("customerId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("orderDate")
                        .HasColumnType("date");

                    b.Property<bool>("orderStatus")
                        .HasColumnType("bit");

                    b.Property<TimeOnly>("orderTime")
                        .HasColumnType("time");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.Property<double>("totalPrice")
                        .HasColumnType("float");

                    b.HasKey("orderId");

                    b.HasIndex("customerId");

                    b.HasIndex("productId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Products", b =>
                {
                    b.Property<int>("productId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("productId"));

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("price")
                        .HasColumnType("float");

                    b.Property<string>("productName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("productPhoto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("stock")
                        .HasColumnType("int");

                    b.HasKey("productId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Logs", b =>
                {
                    b.HasOne("order_stock_management_api.Models.Customers", "Customer")
                        .WithMany("Logs")
                        .HasForeignKey("customerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("order_stock_management_api.Models.Orders", "Order")
                        .WithMany("Logs")
                        .HasForeignKey("orderId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Orders", b =>
                {
                    b.HasOne("order_stock_management_api.Models.Customers", "Customer")
                        .WithMany("Orders")
                        .HasForeignKey("customerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("order_stock_management_api.Models.Products", "Product")
                        .WithMany("Orders")
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Customers", b =>
                {
                    b.Navigation("Logs");

                    b.Navigation("Orders");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Orders", b =>
                {
                    b.Navigation("Logs");
                });

            modelBuilder.Entity("order_stock_management_api.Models.Products", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
