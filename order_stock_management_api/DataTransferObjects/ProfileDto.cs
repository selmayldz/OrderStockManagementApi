﻿namespace order_stock_management_api.DataTransferObjects
{
    public class ProfileDto
    {
        public string customerName { get; set; }
        public int budget { get; set; }
        public string customerType { get; set; }
        public int totalSpend { get; set; }
        public string customerPhoto { get; set; }
    }
}
