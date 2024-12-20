using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace order_stock_management_api.Models
{
    public class Orders
    {
        [Key]
        public int orderId { get; set; }
        public int quantity { get; set; }
        public double totalPrice { get; set; }
        public DateOnly orderDate { get; set; }
        public TimeOnly orderTime { get; set; }
        public int orderStatus { get; set; }
        public int customerId { get; set; }
        public Customers Customer { get; set; }
        public int productId { get; set; }
        public Products Product { get; set; }

        [JsonIgnore]
        public ICollection<Logs> Logs { get; set; }
    }
}
