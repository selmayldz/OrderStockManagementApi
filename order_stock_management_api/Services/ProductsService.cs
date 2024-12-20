using order_stock_management_api.Models;
using order_stock_management_api.Repositories;
using System.Security.Claims;

namespace order_stock_management_api.Services
{
    public interface IProductsService
    {
        Task<Products> AddProductAsync(Products product, ClaimsPrincipal user);
        Task<Products> UpdateProductAsync(Products product, ClaimsPrincipal user);
        Task<bool> DeleteProductAsync(int productId, ClaimsPrincipal user);
        Task<Products> GetProductByIdAsync(int productId);
        Task<List<Products>> GetAllProductsAsync();
    }

    public class ProductsService : IProductsService
    {
        private readonly IProductsRepository _repository;

        public ProductsService(IProductsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Products> AddProductAsync(Products product, ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can add products.");
            return await _repository.AddProductAsync(product);
        }

        public async Task<Products> UpdateProductAsync(Products product, ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can update products.");
            return await _repository.UpdateProductAsync(product);
        }

        public async Task<bool> DeleteProductAsync(int productId, ClaimsPrincipal user)
        {
            if (!IsAdmin(user)) throw new UnauthorizedAccessException("Only admins can delete products.");
            return await _repository.DeleteProductAsync(productId);
        }

        private bool IsAdmin(ClaimsPrincipal user)
        {
            var customerType = user.Claims.FirstOrDefault(c => c.Type == "customerType")?.Value;
            return customerType == "admin";
        }
        public async Task<Products> GetProductByIdAsync(int productId)
        {
            return await _repository.GetProductByIdAsync(productId); 
        }
        public async Task<List<Products>> GetAllProductsAsync()
        {
            return await _repository.GetAllProductsAsync();
        }
    }
}
