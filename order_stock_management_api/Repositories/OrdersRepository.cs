using Microsoft.EntityFrameworkCore;
using order_stock_management_api.Data;
using order_stock_management_api.Models;

namespace order_stock_management_api.Repositories
{
    public interface IOrdersRepository
    {
        Task<Orders> CreateOrderAsync(Orders order);
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
    }
}
