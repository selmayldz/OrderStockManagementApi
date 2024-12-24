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

        public async Task<List<ProfileDto>> GetAllUsers(ClaimsPrincipal user)
        {
            return await _adminRepository.GetAllUsers();
        }

        public async Task<Customers> GetCustomerDetailsAsync(string customerName)
        {
            return await _adminRepository.GetCustomerDetailsAsync(customerName);
        }
        public async Task<IEnumerable<CreatedOrderDto>> GetAllOrdersAsync(ClaimsPrincipal user)
        {
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
                customerName = o.Customer.customerName,
                waitingTime = o.waitingTime,
                priorityScore = o.priorityScore
            });
        }
        public async Task<IEnumerable<CreatedOrderDto>> GetOrdersByFalseStatus(ClaimsPrincipal user)
        {
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
                productName = o.Product.productName,
                waitingTime = o.waitingTime,
                priorityScore = o.priorityScore
            });
        }

        public async Task<IEnumerable<CreatedOrderDto>> GetOrdersByTrueStatus(ClaimsPrincipal user)
        {
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
                productName = o.Product.productName,
                waitingTime = o.waitingTime,
                priorityScore = o.priorityScore
            });
        }

        public async Task<IEnumerable<LogDto>> GetLogsAsync(ClaimsPrincipal user)
        {
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
