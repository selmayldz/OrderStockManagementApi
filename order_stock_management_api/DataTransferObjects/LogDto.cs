namespace order_stock_management_api.DataTransferObjects
{
    public class LogDto
    {
        public int logId { get; set; }
        public DateTime logDate { get; set; }
        public string logType { get; set; }
        public string logDetails { get; set; }
        public int customerId { get; set; }
        public int orderId { get; set; }
    }
}
