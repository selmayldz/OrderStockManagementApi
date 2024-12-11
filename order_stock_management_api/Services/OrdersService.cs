using order_stock_management_api.Models;
using order_stock_management_api.Repositories;

namespace order_stock_management_api.Services
{
    public interface IOrdersService
    {
        Task<Orders> CreateOrderAsync(Orders order);
        Task<double> CalculateTotalPrice(int productId, int quantity);
    }
    public class OrdersService : IOrdersService
    {
        private readonly IOrdersRepository _repository;
        private readonly IProductsRepository _productRepository;

        public OrdersService(IOrdersRepository repository, IProductsRepository productRepository)
        {
            _repository = repository;
            _productRepository = productRepository;
        }
        public async Task<Orders> CreateOrderAsync(Orders order)
        {
            await _repository.CreateOrderAsync(order);
            return order;
        }

        public async Task<double> CalculateTotalPrice(int productId, int quantity)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);
            if (product == null)
            {
                Console.WriteLine("Product with the given ID does not exist.");
            }
            else
            {
                Console.WriteLine($"Product found: {product.productName}");
            }
            if (product == null) throw new ArgumentException("Product not found.");
            return product.price * quantity;
        }
    }
}
