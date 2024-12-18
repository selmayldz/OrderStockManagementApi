using order_stock_management_api.Models;

namespace order_stock_management_api.DataTransferObjects
{
    public class LogDto
    {
        public int logId { get; set; }
        public DateTime logDate { get; set; }
        public string logType { get; set; }
        public string logDetails { get; set; }
        public string customerName { get; set; }
        public string customerType { get; set; }
        public int quantity { get; set; }
        public string productName { get; set; }
    }
}
