using System.ComponentModel.DataAnnotations;

namespace order_stock_management_api.Models
{
    public class Products
    {
        [Key]
        public int productId { get; set; }
        public string productName { get; set; }
        public int stock { get; set; }
        public double price { get; set; }
        public string description { get; set; }
        public string productPhoto { get; set; }
        public ICollection<Orders> Orders { get; set; }
    }
}
