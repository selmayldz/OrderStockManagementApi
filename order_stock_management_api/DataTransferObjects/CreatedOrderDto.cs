﻿namespace order_stock_management_api.DataTransferObjects
{
    public class CreatedOrderDto
    {
        public int orderId { get; set; }
        public int quantity { get; set; }
        public double totalPrice { get; set; }
        public DateOnly orderDate { get; set; }
        public TimeOnly orderTime { get; set; }
        public bool orderStatus { get; set; }
        public int customerId { get; set; }
        public int productId { get; set; }
    }
}
