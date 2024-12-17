using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Repositories;
using System.Security.Claims;
using static order_stock_management_api.Repositories.AdminRepository;

namespace order_stock_management_api.Services
{
    public interface IAdminService
    {
        Task<List<ProfileDto>> GetAllUsers(ClaimsPrincipal user);
        Task<Customers> GetCustomerDetailsAsync(string customerName);
        Task<IEnumerable<CreatedOrderDto>> GetAllOrdersAsync(ClaimsPrincipal user);
    }

    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<List<ProfileDto>> GetAllUsers(ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can see users.");
            return await _adminRepository.GetAllUsers();
        }

        public async Task<Customers> GetCustomerDetailsAsync(string customerName)
        {
            return await _adminRepository.GetCustomerDetailsAsync(customerName);
        }
        private bool IsAdmin(ClaimsPrincipal user)
        {
            var customerType = user.Claims.FirstOrDefault(c => c.Type == "customerType")?.Value;
            return customerType == "admin";
        }
        public async Task<IEnumerable<CreatedOrderDto>> GetAllOrdersAsync(ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can see all orders.");

            var orders = await _adminRepository.GetAllOrdersAsync();

            return orders.Select(o => new CreatedOrderDto
            {
                orderId = o.orderId,
                quantity = o.quantity,
                totalPrice = o.totalPrice,
                orderDate = o.orderDate,
                orderTime = o.orderTime,
                orderStatus = o.orderStatus,
                customerId = o.customerId,
                productId = o.productId
            });
        }
    }
}
