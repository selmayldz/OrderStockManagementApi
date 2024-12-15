using Microsoft.EntityFrameworkCore;
using order_stock_management_api.Data;
using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;

namespace order_stock_management_api.Repositories
{
    public interface IAdminRepository
    {
        Task<List<ProfileDto>> GetAllUsers();
        Task<Customers> GetCustomerDetailsAsync(string customerName);
    }

    public class AdminRepository : IAdminRepository
    {
        private readonly OrderStockManagementContext _context;

        public AdminRepository(OrderStockManagementContext context)
        {
            _context = context;
        }

        public async Task<List<ProfileDto>> GetAllUsers()
        {
            return await _context.Set<Customers>().Select(customer => new ProfileDto
            {
                customerName = customer.customerName,
                budget = customer.budget,
                customerType = customer.customerType,
                totalSpend = customer.totalSpend,
                customerPhoto = customer.customerPhoto
            }).ToListAsync();
        }

        public async Task<Customers> GetCustomerDetailsAsync(string customerName)
        {
            return await _context.Set<Customers>().FirstOrDefaultAsync(c => c.customerName == customerName);
        }
    }
}
