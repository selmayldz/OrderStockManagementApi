using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace order_stock_management_api.Models
{
    public class Customers
    {
        [Key]
        public int customerId { get; set; }
        public string customerName { get; set; }
        public string password { get; set; }
        public int budget { get; set; }
        public string customerType { get; set; }
        public int totalSpend { get; set; }
        public string customerPhoto { get; set; }

        [JsonIgnore]
        public ICollection<Logs> Logs { get; set; }
        [JsonIgnore]
        public ICollection<Orders> Orders { get; set; }

    }
}
