using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Helpers;
using order_stock_management_api.Models;
using order_stock_management_api.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace order_stock_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;
        private readonly IConfiguration _configuration;

        public CustomersController(ICustomerService service, IConfiguration configuration)
        {
            _service = service;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var customer = new Customers
            {
                customerName = registerDto.customerName,
                password = registerDto.password,
                budget = 0,
                customerType = "Standart",
                customerPhoto = registerDto.customerPhoto,
                totalSpend = 0,
                Logs = null,
                Orders = null
            };

            var registeredCustomer = await _service.RegisterAsync(customer);

            var profileDto = new ProfileDto
            {
                customerName = registeredCustomer.customerName,
                budget = registeredCustomer.budget,
                customerType = registeredCustomer.customerType,
                totalSpend = registeredCustomer.totalSpend,
                customerPhoto = registeredCustomer.customerPhoto
            };

            return Ok(profileDto);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var customer = await _service.LoginAsync(loginDto.customerName, loginDto.password);
            if (customer == null) return Unauthorized("Invalid credentials.");

            Random random = new Random();
            customer.budget = random.Next(500, 3001);
            await _service.UpdateProfileAsync(customer);

            var token = JwtHelper.GenerateJwtToken(customer.customerName, customer.customerType, _configuration);

            return Ok(new { Token = token });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var customerNameFromToken = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(customerNameFromToken))
            {
                return Unauthorized("Invalid token.");
            }

            var customer = await _service.GetProfileAsync(customerNameFromToken);
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

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateDto)
        {
            var customerNameFromToken = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(customerNameFromToken))
            {
                return Unauthorized("Invalid token.");
            }

            var existingCustomer = await _service.GetProfileAsync(customerNameFromToken);

            if (existingCustomer == null)
            {
                return NotFound("Customer not found.");
            }

            existingCustomer.password = updateDto.password ?? existingCustomer.password;
            existingCustomer.customerPhoto = updateDto.customerPhoto ?? existingCustomer.customerPhoto;

            var updatedCustomer = await _service.UpdateProfileAsync(existingCustomer);

            var profileDto = new ProfileDto
            {
                customerName = updatedCustomer.customerName,
                budget = updatedCustomer.budget,
                customerType = updatedCustomer.customerType,
                totalSpend = updatedCustomer.totalSpend,
                customerPhoto = updatedCustomer.customerPhoto
            };

            return Ok(profileDto);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _service.LogoutAsync();
            return Ok("Logged out successfully.");
        }
    }
}
