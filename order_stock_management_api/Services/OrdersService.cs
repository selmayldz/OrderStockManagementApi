using order_stock_management_api.DataTransferObjects;
using order_stock_management_api.Models;
using order_stock_management_api.Repositories;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace order_stock_management_api.Services
{
    public interface IOrdersService
    {
        Task<Orders> CreateOrderAsync(Orders order);
        Task<double> CalculateTotalPrice(int productId, int quantity);
        Task<IEnumerable<CreatedOrderDto>> GetOrdersByCustomerAsync(string customerName);
        Task ProcessOrders();
    }
    public class OrdersService : IOrdersService
    {
        private readonly IOrdersRepository _repository;
        private readonly IProductsRepository _productRepository;
        private readonly IHubContext<AdminHub> _hubContext;
        private readonly SemaphoreSlim _semaphore = new(1, 1);
        private readonly ICustomerRepository _customerRepository;

        public OrdersService(IOrdersRepository repository, IProductsRepository productRepository, IHubContext<AdminHub> hubContext, ICustomerRepository customerRepository)
        {
            _repository = repository;
            _productRepository = productRepository;
            _hubContext = hubContext;
            _customerRepository = customerRepository;
        }
        public async Task<Orders> CreateOrderAsync(Orders order)
        {
            var product = await _productRepository.GetProductByIdAsync(order.productId);

            if (product == null)
            {
                throw new ArgumentException("Product not found.");
            }
            Console.WriteLine("customerid:" + order.customerId);

            if (product.stock < order.quantity)
            {
                var insufficientStockLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Uyarı",
                    logDetails = "Ürün stoğu yetersiz",
                    customerId = order.customerId,
                    orderId = null
                };

                await _repository.AddLog(insufficientStockLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", insufficientStockLog);

                throw new InvalidOperationException("Not enough stock for the requested quantity.");
            }

            var newStock = product.stock - order.quantity;

            await _repository.CreateOrderAsync(order);
            return order;
        }

        public async Task<double> CalculateTotalPrice(int productId, int quantity)
        {
            var product = await _productRepository.GetProductByIdAsync(productId);
            if (product == null)
            {
                throw new ArgumentException("Product not found.");
            }
            else
            {
                Console.WriteLine($"Product found: {product.productName}");
            }
            if (product == null) throw new ArgumentException("Product not found.");
            return product.price * quantity;
        }

        public async Task<IEnumerable<CreatedOrderDto>> GetOrdersByCustomerAsync(string customerName)
        {
            var orders = await _repository.GetOrdersByCustomerAsync(customerName);

            return orders.Select(o => new CreatedOrderDto
            {
                orderId = o.orderId,
                quantity = o.quantity,
                totalPrice = o.totalPrice,
                orderDate = o.orderDate,
                orderTime = o.orderTime,
                orderStatus = o.orderStatus,
                customerName = o.Customer.customerName,
                productName = o.Product.productName
            });
        }
        public async Task ProcessOrders()
        {
            var orders = await _repository.GetAllPendingOrders();
            var priorityQueue = new ConcurrentQueue<Orders>(orders.OrderByDescending(o => CalculatePriorityScore(o, o.Customer)));

            var processedOrders = new HashSet<int>(); 

            while (!priorityQueue.IsEmpty)
            {
                if (priorityQueue.TryDequeue(out var order))
                {
                    if (processedOrders.Contains(order.orderId))
                        continue;

                    processedOrders.Add(order.orderId);

                    await _semaphore.WaitAsync();
                    try
                    {
                        await ProcessOrder(order, priorityQueue);
                    }
                    finally
                    {
                        _semaphore.Release();
                    }
                }
            }
        }

        private async Task ProcessOrder(Orders order, ConcurrentQueue<Orders> priorityQueue)
        {
            var orderDateTime = order.orderDate.ToDateTime(order.orderTime);
            var waitingTime = (DateTime.Now - orderDateTime).TotalSeconds;

            if (waitingTime > 120)
            {
                var timeoutLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Hata",
                    logDetails = "Zaman aşımı",
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(timeoutLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", timeoutLog);

                await _repository.UpdateOrderStatus(order.orderId, 0); 
                return;
            }

            if (order.Product.isDeleted)
            {
                var deletedProductLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Hata",
                    logDetails = "Ürün silinmiş",
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(deletedProductLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", deletedProductLog);

                await _repository.UpdateOrderStatus(order.orderId, 0); 
                return;
            }

            bool isStockAvailable = await _repository.CheckStockAvailability(order.productId, order.quantity);
            if (!isStockAvailable)
            {
                var insufficientStockLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Hata",
                    logDetails = "Ürün stoğu yetersiz",
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(insufficientStockLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", insufficientStockLog);

                await _repository.UpdateOrderStatus(order.orderId, 0); 
                return;
            }

            if (order.Customer.budget < order.totalPrice)
            {
                var insufficientBudgetLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Hata",
                    logDetails = "Kullanıcının bütçesi yetersiz",
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(insufficientBudgetLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", insufficientBudgetLog);

                await _repository.UpdateOrderStatus(order.orderId, 0); 
                return;
            }

            bool isStockDeducted = await _repository.DeductStock(order.productId, order.quantity);
            if (!isStockDeducted)
            {
                var stockDeductionErrorLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Hata",
                    logDetails = "Stok düşme işlemi başarısız",
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(stockDeductionErrorLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", stockDeductionErrorLog);

                await _repository.UpdateOrderStatus(order.orderId, 0); 
                return;
            }

            try
            {
                order.Customer.budget -= (int)order.totalPrice;
                order.Customer.totalSpend += (int)order.totalPrice;

                if (order.Customer.customerType == "Standart" && order.Customer.totalSpend > 2000)
                {
                    order.Customer.customerType = "Premium";
                }

                await _customerRepository.UpdateProfileAsync(order.Customer);

                var successLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Bilgilendirme",
                    logDetails = "Satın alma başarılı",
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(successLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", successLog);

                await _repository.UpdateOrderStatus(order.orderId, 1); 
            }
            catch (Exception ex)
            {
                var databaseErrorLog = new Logs
                {
                    logDate = DateTime.Now,
                    logType = "Hata",
                    logDetails = "Veritabanı Hatası: " + ex.Message,
                    customerId = order.customerId,
                    orderId = order.orderId
                };

                await _repository.AddLog(databaseErrorLog);
                await _hubContext.Clients.All.SendAsync("ReceiveLog", databaseErrorLog);

                await _repository.UpdateOrderStatus(order.orderId, 0); 
            }
        }


        private double CalculatePriorityScore(Orders order, Customers customer)
        {
            var customerTypeScore = order.Customer.customerType == "Premium" ? 15 : 10;

            var createdAt = order.orderDate.ToDateTime(order.orderTime);

            var waitingTime = (DateTime.Now - createdAt).TotalSeconds;

            var priorityScore = customerTypeScore + (waitingTime * 0.5);

            customer.priorityScore = priorityScore;

            customer.waitingTime = waitingTime;

            return priorityScore;
        }
    }
}
