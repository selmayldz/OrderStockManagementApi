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

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
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

    }
}
