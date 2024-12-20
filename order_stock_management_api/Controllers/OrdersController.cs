using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Repositories;
using order_stock_management_api.Services;
using System.Security.Claims;

namespace order_stock_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService _service;
        private readonly ICustomerService _customerService;
        private readonly IOrdersRepository _repository;
        private readonly IHubContext<AdminHub> _hubContext;

        public OrdersController(IOrdersService service, ICustomerService customerService, IOrdersRepository repository, IHubContext<AdminHub> hubContext)
        {
            _service = service;
            _customerService = customerService;
            _repository = repository;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            try
            {
                var customerName = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(customerName))
                {
                    return Unauthorized("Customer name not found in token.");
                }

                var customer = await _customerService.GetProfileAsync(customerName);
                if (customer == null)
                {
                    return NotFound("Customer not found.");
                }

                var totalPrice = await _service.CalculateTotalPrice(orderDto.productId, orderDto.quantity);

                if (customer.budget < totalPrice)
                {
                    var insufficientBudgetLog = new Logs
                    {
                        logDate = DateTime.Now,
                        logType = "Uyarı",
                        logDetails = "Kullanıcının bütçesi yetersiz",
                        customerId = customer.customerId,
                        orderId = null
                    };

                    await _repository.AddLog(insufficientBudgetLog);
                    await _hubContext.Clients.All.SendAsync("ReceiveLog", insufficientBudgetLog);

                    throw new InvalidOperationException("Not enough budget for this order.");
                }

                var order = new Orders
                {
                    quantity = orderDto.quantity,
                    productId = orderDto.productId,
                    customerId = customer.customerId,
                    orderDate = DateOnly.FromDateTime(DateTime.Now),
                    orderTime = TimeOnly.FromDateTime(DateTime.Now),
                    orderStatus = 0, 
                    totalPrice = totalPrice
                };

                var createdOrder = await _service.CreateOrderAsync(order);

                var createdOrderDto = new CreatedOrderDto
                {
                    orderId = createdOrder.orderId,
                    productName = createdOrder.Product.productName,
                    quantity = createdOrder.quantity,
                    totalPrice = createdOrder.totalPrice,
                    orderDate = createdOrder.orderDate,
                    orderTime = createdOrder.orderTime,
                    orderStatus = createdOrder.orderStatus,
                    customerName = createdOrder.Customer.customerName
                };
                return Ok(createdOrderDto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating order: {ex.Message}");
            }
        }
        [HttpGet("customers-order")]
        public async Task<ActionResult<IEnumerable<CreatedOrderDto>>> GetOrdersByCustomer()
        {
            try
            {
                var customerNameFromToken = HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(customerNameFromToken))
                {
                    return Unauthorized("Invalid token.");
                }

                var result = await _service.GetOrdersByCustomerAsync(customerNameFromToken);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, ex.Message);
            }

        }

    }
}
