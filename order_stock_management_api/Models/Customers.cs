using System.ComponentModel.DataAnnotations;

namespace order_stock_management_api.Models
{
    public class Customers
    {
        [Key]
        public int customerId { get; set; }
        public string customerName { get; set; }
        public int budget { get; set; }
        public string customerType { get; set; }
        public int totalSpend { get; set; }
        public string customerPhoto { get; set; }
        public ICollection<Logs> Logs { get; set; }
        public ICollection<Orders> Orders { get; set; }

    }
}
