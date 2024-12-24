using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Services;
using System.Security.Claims;
using order_stock_management_api.Helpers;

namespace order_stock_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IOrdersService _orderService;
        private readonly IsAdminHelper _isAdminHelper;

        public AdminController(IAdminService adminService, IOrdersService orderService, IsAdminHelper isAdminHelper)
        {
            _adminService = adminService;
            _orderService = orderService;
            _isAdminHelper = isAdminHelper;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see users.");
            }

            try
            {
                var users = await _adminService.GetAllUsers(User);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }


        }
        
        [HttpGet("user/{customerName}")]
        public async Task<IActionResult> GetCustomerDetails(string customerName)
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see other customers' detail.");
            }

            try
            {
                var customer = await _adminService.GetCustomerDetailsAsync(customerName);
                if (customer == null) return NotFound("Customer not found.");

                var profileDto = new ProfileDto
                {
                    customerName = customer.customerName,
                    budget = customer.budget,
                    customerType = customer.customerType,
                    totalSpend = customer.totalSpend,
                    customerPhoto = customer.customerPhoto
                };

                return Ok(profileDto);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            

        }
        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetAllOrders()
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see all orders.");
            }

            try
            {
                var result = await _adminService.GetAllOrdersAsync(User);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            
        }

        [HttpPost("process-orders")]
        public async Task<IActionResult> ProcessOrders()
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can process orders.");
            }

            try
            {
                await _orderService.ProcessOrders();
                return Ok("Orders processed.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("false-status-orders")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetOrdersByFalseStatus()
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see false status orders.");
            }

            try
            {
                var result = await _adminService.GetOrdersByFalseStatus(User);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("true-status-orders")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetOrdersByTrueStatus()
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see true status orders.");
            }

            try
            {
                var result = await _adminService.GetOrdersByTrueStatus(User);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("logs")]
        public async Task<ActionResult<IEnumerable<Logs>>> GetLogs()
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see logs.");
            }

            try
            {
                var logs = await _adminService.GetLogsAsync(User);
                return Ok(logs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("customers-order/{customerName}")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetOrdersByCustomer(string customerName)
        {
            var isAdmin = _isAdminHelper.IsAdmin(User);

            if (!isAdmin)
            {
                return Unauthorized("Only admin can see other customers' orders.");
            }

            try
            {
                var result = await _orderService.GetOrdersByCustomerAsync(customerName);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, ex.Message);
            }

        }

    }
}
