using Microsoft.EntityFrameworkCore;
using order_stock_management_api.Data;
using order_stock_management_api.Models;

namespace order_stock_management_api.Repositories
{
    public interface IOrdersRepository
    {
        Task<Orders> CreateOrderAsync(Orders order);
        Task<List<Orders>> GetOrdersByCustomerIdAsync(string customerName);
        Task<List<Orders>> GetAllPendingOrders();
        Task UpdateOrderStatus(int orderId, bool status);
        Task<Customers> GetCustomerById(int customerId);
        Task AddLog(Logs log);
        Task<bool> CheckStockAvailability(int productId, int quantity);
        Task<bool> DeductStock(int productId, int quantity);
    }
    public class OrdersRepository : IOrdersRepository
    {
        private readonly OrderStockManagementContext _context;

        public OrdersRepository(OrderStockManagementContext context)
        {
            _context = context;
        }
        public async Task<Orders> CreateOrderAsync(Orders order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return order;
        }
        public async Task<List<Orders>> GetOrdersByCustomerIdAsync(string customerName)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Product)
                .Where(o => o.Customer.customerName == customerName)
                .ToListAsync();
        }
        public async Task<List<Orders>> GetAllPendingOrders()
        {
            return await _context.Orders
                .Where(o => !o.orderStatus)
                .Include(o => o.Customer)
                .ToListAsync();
        }

        public async Task UpdateOrderStatus(int orderId, bool status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.orderStatus = status;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Customers> GetCustomerById(int customerId)
        {
            return await _context.Customers.FindAsync(customerId);
        }

        public async Task AddLog(Logs log)
        {
            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CheckStockAvailability(int productId, int quantity)
        {
            var product = await _context.Products.FindAsync(productId);
            return product != null && product.stock >= quantity;
        }

        public async Task<bool> DeductStock(int productId, int quantity)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product != null && product.stock >= quantity)
            {
                product.stock -= quantity;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
