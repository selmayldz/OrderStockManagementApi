using System.Security.Claims;

namespace order_stock_management_api.Helpers
{
    public class IsAdminHelper
    {
        private bool IsAdmin(ClaimsPrincipal user)
        {
            var customerType = user.Claims.FirstOrDefault(c => c.Type == "customerType")?.Value;
            return customerType == "admin";
        }
    }
}
