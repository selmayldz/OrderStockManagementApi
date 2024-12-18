using order_stock_management_api.Models;

namespace order_stock_management_api.DataTransferObjects
{
    public class LogDto
    {
        public int logId { get; set; }
        public DateTime logDate { get; set; }
        public string logType { get; set; }
        public string logDetails { get; set; }
        public Customers Customer { get; set; }
        public Orders Order { get; set; }
    }
}
