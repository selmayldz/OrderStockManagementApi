using order_stock_management_api.Models;
using Microsoft.EntityFrameworkCore;
using order_stock_management_api.Data;

namespace order_stock_management_api.Repositories
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly OrderStockManagementContext _context;

        public ProductsRepository(OrderStockManagementContext context)
        {
            _context = context;
        }

        public async Task<Products> AddProductAsync(Products product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Products> UpdateProductAsync(Products product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return false;

            product.isDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Products> GetProductByIdAsync(int productId)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.productId == productId);
        }

        public async Task<List<Products>> GetAllProductsAsync()
        {
            return await _context.Products
                .Where(p => p.isDeleted == false)
                .ToListAsync();
        }

        public async Task UpdateProductStockAsync(int productId, int newStock)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product != null)
            {
                product.stock = newStock;
                _context.Products.Update(product);
                await _context.SaveChangesAsync();
            }
        }
    }

    public interface IProductsRepository
    {
        Task<Products> AddProductAsync(Products product);
        Task<Products> UpdateProductAsync(Products product);
        Task<bool> DeleteProductAsync(int productId);
        Task<Products> GetProductByIdAsync(int productId);
        Task<List<Products>> GetAllProductsAsync();
        Task UpdateProductStockAsync(int productId, int newStock);
    }
}
