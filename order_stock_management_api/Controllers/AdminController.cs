using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Services;
using System.Security.Claims;

namespace order_stock_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IOrdersService _orderService;

        public AdminController(IAdminService adminService, IOrdersService orderService)
        {
            _adminService = adminService;
            _orderService = orderService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _adminService.GetAllUsers(User);
            return Ok(users);
        }
        
        [HttpGet("user/{customerName}")]
        public async Task<IActionResult> GetCustomerDetails(string customerName)
        {
            var customerNameFromToken = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(customerNameFromToken))
            {
                return Unauthorized("Invalid token.");
            }
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
        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetAllOrders()
        {
            var result = await _adminService.GetAllOrdersAsync(User);
            return Ok(result);
        }

        [HttpPost("process-orders")]
        public async Task<IActionResult> ProcessOrders()
        {
            try
            {
                await _orderService.ProcessOrders();
                return Ok("Siparişler işlendi.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
            }
        }

        [HttpGet("false-status-orders")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetOrdersByFalseStatus()
        {
            try
            {
                var result = await _adminService.GetOrdersByFalseStatus(User);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
            }
        }
        [HttpGet("true-status-orders")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetOrdersByTrueStatus()
        {
            try
            {
                var result = await _adminService.GetOrdersByTrueStatus(User);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
            }
        }

        [HttpGet("logs")]
        public async Task<ActionResult<IEnumerable<Logs>>> GetLogs()
        {
            try
            {
                var logs = await _adminService.GetLogsAsync(User);
                return Ok(logs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bir hata oluştu: {ex.Message}");
            }
        }

    }
}
