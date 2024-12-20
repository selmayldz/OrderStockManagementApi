using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Repositories;
using System.Security.Claims;
using static order_stock_management_api.Repositories.AdminRepository;

namespace order_stock_management_api.Services
{
    public interface IAdminService
    {
        Task<List<ProfileForAdminDto>> GetAllUsers(ClaimsPrincipal user);
        Task<Customers> GetCustomerDetailsAsync(string customerName);
        Task<IEnumerable<CreatedOrderDto>> GetAllOrdersAsync(ClaimsPrincipal user);
        Task<IEnumerable<CreatedOrderDto>> GetOrdersByFalseStatus(ClaimsPrincipal user);
        Task<IEnumerable<CreatedOrderDto>> GetOrdersByTrueStatus(ClaimsPrincipal user);
        Task<IEnumerable<LogDto>> GetLogsAsync(ClaimsPrincipal user);
    }

    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<List<ProfileForAdminDto>> GetAllUsers(ClaimsPrincipal user)
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
                productName = o.Product.productName,
                customerName = o.Customer.customerName
            });
        }
        public async Task<IEnumerable<CreatedOrderDto>> GetOrdersByFalseStatus(ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can see orders with false status.");

            var orders = await _adminRepository.GetOrdersByFalseStatus();

            return orders.Select(o => new CreatedOrderDto
            {
                orderId = o.orderId,
                quantity = o.quantity,
                totalPrice = o.totalPrice,
                orderDate = o.orderDate,
                orderTime = o.orderTime,
                orderStatus = o.orderStatus,
                customerName = o.Customer.customerName,
                productName = o.Product.productName
            });
        }

        public async Task<IEnumerable<CreatedOrderDto>> GetOrdersByTrueStatus(ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can see orders with false status.");

            var orders = await _adminRepository.GetOrdersByTrueStatus();

            return orders.Select(o => new CreatedOrderDto
            {
                orderId = o.orderId,
                quantity = o.quantity,
                totalPrice = o.totalPrice,
                orderDate = o.orderDate,
                orderTime = o.orderTime,
                orderStatus = o.orderStatus,
                customerName = o.Customer.customerName,
                productName = o.Product.productName
            });
        }

        public async Task<IEnumerable<LogDto>> GetLogsAsync(ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can see logs.");

            var logs = await _adminRepository.GetLogsAsync();

            return logs.Select(l => new LogDto
            {
                logId = l.logId,
                logDate = l.logDate,
                logType = l.logType,
                logDetails = l.logDetails,
                customerName = l.Customer?.customerName,
                customerType = l.Customer?.customerType,
                quantity = l.Order?.quantity ?? 0, 
                productName = l.Order?.Product?.productName
            });
        }
    }
}
