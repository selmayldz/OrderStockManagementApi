using order_stock_management_api.Models;
using order_stock_management_api.Repositories;

namespace order_stock_management_api.Services
{
    public interface ICustomerService
    {
        Task<Customers> RegisterAsync(Customers customer);
        Task<Customers> LoginAsync(string customerName, string password);
        Task<Customers> GetProfileAsync(string customerName);
        Task<Customers> UpdateProfileAsync(Customers updatedCustomer);
        Task LogoutAsync();
    }
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;

        public CustomerService(ICustomerRepository repository)
        {
            _repository = repository;
        }

        public async Task<Customers> RegisterAsync(Customers customer)
        {
            return await _repository.RegisterAsync(customer);
        }

        public async Task<Customers> LoginAsync(string customerName, string password)
        {
            return await _repository.LoginAsync(customerName, password);
        }

        public async Task<Customers> GetProfileAsync(string customerName)
        {
            return await _repository.GetProfileAsync(customerName);
        }

        public async Task<Customers> UpdateProfileAsync(Customers updatedCustomer)
        {
            return await _repository.UpdateProfileAsync(updatedCustomer);
        }

        public async Task LogoutAsync()
        {
            await _repository.LogoutAsync();
        }
    }
}
