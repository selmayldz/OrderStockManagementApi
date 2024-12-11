namespace order_stock_management_api.DataTransferObjects
{
    public class ProductDto
    {
        public string productName { get; set; }
        public int stock { get; set; }
        public double price { get; set; }
        public string description { get; set; }
        public string productPhoto { get; set; }
    }
}
