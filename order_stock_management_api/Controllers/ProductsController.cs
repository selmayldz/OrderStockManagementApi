using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Services;

namespace order_stock_management_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _service;

        public ProductsController(IProductsService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] ProductDto productDto)
        {
            var product = new Products
            {
                productName = productDto.productName,
                stock = productDto.stock,
                price = productDto.price,
                description = productDto.description,
                productPhoto = productDto.productPhoto
            };

            try
            {
                var addedProduct = await _service.AddProductAsync(product, User);
                return Ok(addedProduct);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await _service.GetAllProductsAsync();

                var productDtos = products.Select(product => new ProductDto
                {
                    productName = product.productName,
                    stock = product.stock,
                    price = product.price,
                    description = product.description,
                    productPhoto = product.productPhoto
                }).ToList();

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving data: {ex.Message}");
            }
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProduct(int productId, [FromBody] ProductDto productUpdateDto)
        {
            try
            {
                var existingProduct = await _service.GetProductByIdAsync(productId);
                if (existingProduct == null)
                {
                    return NotFound("Product not found.");
                }

                existingProduct.productName = productUpdateDto.productName;
                existingProduct.stock = productUpdateDto.stock;
                existingProduct.price = productUpdateDto.price;
                existingProduct.description = productUpdateDto.description;
                existingProduct.productPhoto = productUpdateDto.productPhoto;

                var updatedProduct = await _service.UpdateProductAsync(existingProduct, User);

                var productDto = new ProductDto
                {
                    productName = updatedProduct.productName,
                    stock = updatedProduct.stock,
                    price = updatedProduct.price,
                    description = updatedProduct.description,
                    productPhoto = updatedProduct.productPhoto
                };

                return Ok(productDto);
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, ex.Message);
            }
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            try
            {
                var isDeleted = await _service.DeleteProductAsync(productId, User);
                if (!isDeleted) return NotFound("Product not found.");
                return NoContent();
            }
            catch (UnauthorizedAccessException ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden, ex.Message);
            }
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProductById(int productId)
        {
            var product = await _service.GetProductByIdAsync(productId);
            if (product == null) return NotFound("Product not found.");

            var productDto = new ProductDto
            {
                productName = product.productName,
                stock = product.stock,
                price = product.price,
                description = product.description,
                productPhoto = product.productPhoto
            };

            return Ok(productDto);
        }
    }
}
