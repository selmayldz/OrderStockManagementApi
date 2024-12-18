using Microsoft.AspNetCore.SignalR;

namespace order_stock_management_api
{
    public class AdminHub : Hub
    {
        public async Task SendLog(string message)
        {
            await Clients.All.SendAsync("ReceiveLog", message);
        }
    }
}
