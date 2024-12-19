using Microsoft.EntityFrameworkCore;
using order_stock_management_api.Models;

namespace order_stock_management_api.Data
{
    public class OrderStockManagementContext : DbContext
    {
        public OrderStockManagementContext(DbContextOptions<OrderStockManagementContext> options)
            : base(options)
        {
        }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Logs> Logs { get; set; }
        public DbSet<Products> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Logs>()
                .HasOne(l => l.Customer)
                .WithMany(c => c.Logs)
                .HasForeignKey(l => l.customerId)
                .OnDelete(DeleteBehavior.NoAction);  

            modelBuilder.Entity<Logs>()
                .HasOne(l => l.Order)
                .WithMany(o => o.Logs)
                .HasForeignKey(l => l.orderId)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<Orders>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.customerId)
                .OnDelete(DeleteBehavior.NoAction);  

            modelBuilder.Entity<Orders>()
                .HasOne(o => o.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(o => o.productId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Orders>()
                .Property(p => p.isSuccess)
                .HasDefaultValue(-1);

            modelBuilder.Entity<Products>()
                .Property(p => p.isDeleted)
                .HasDefaultValue(false);
        }
    }
}
