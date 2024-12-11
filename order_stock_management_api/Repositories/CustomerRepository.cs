using Microsoft.EntityFrameworkCore;
using order_stock_management_api.Data;
using order_stock_management_api.Models;

namespace order_stock_management_api.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customers> RegisterAsync(Customers customer);
        Task<Customers> LoginAsync(string customerName, string password);
        Task<Customers> GetProfileAsync(string customerName);
        Task<Customers> UpdateProfileAsync(Customers updatedCustomer);
        Task LogoutAsync();
    }
    public class CustomerRepository : ICustomerRepository
    {
        private readonly OrderStockManagementContext _context;

        public CustomerRepository(OrderStockManagementContext context)
        {
            _context = context;
        }

        public async Task<Customers> RegisterAsync(Customers customer)
        {
            _context.Set<Customers>().Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customers> LoginAsync(string customerName, string password)
        {
            return await _context.Set<Customers>().FirstOrDefaultAsync(c => c.customerName == customerName && c.password == password);
        }

        public async Task<Customers> GetProfileAsync(string customerName)
        {
            return await _context.Set<Customers>().FirstOrDefaultAsync(c => c.customerName == customerName);
        }

        public async Task<Customers> UpdateProfileAsync(Customers updatedCustomer)
        {
            _context.Set<Customers>().Update(updatedCustomer);
            await _context.SaveChangesAsync();
            return updatedCustomer;
        }

        public Task LogoutAsync()
        {
            // No specific action required for logout in this implementation.
            return Task.CompletedTask;
        }
    }
}
