﻿using Microsoft.AspNetCore.Authorization;
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
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService _service;
        private readonly ICustomerService _customerService;

        public OrdersController(IOrdersService service, ICustomerService customerService)
        {
            _service = service;
            _customerService = customerService;
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

                var order = new Orders
                {
                    quantity = orderDto.quantity,
                    productId = orderDto.productId,
                    customerId = customer.customerId,
                    orderDate = DateOnly.FromDateTime(DateTime.Now),
                    orderTime = TimeOnly.FromDateTime(DateTime.Now),
                    orderStatus = "Pending", 
                    totalPrice = await _service.CalculateTotalPrice(orderDto.productId, orderDto.quantity)
                };

                var createdOrder = await _service.CreateOrderAsync(order);
                return Ok(createdOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating order: {ex.Message}");
            }
        }

    }
}
