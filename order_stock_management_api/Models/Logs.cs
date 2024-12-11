using System.ComponentModel.DataAnnotations;

namespace order_stock_management_api.Models
{
    public class Logs
    {
        [Key]
        public int logId { get; set; }
        public DateTime logDate { get; set; }
        public string logType { get; set; }
        public string logDetails { get; set; }
        public int customerId { get; set; }
        public Customers Customer { get; set; }
        public int orderId { get; set; }
        public Orders Order { get; set; }
    }
}
