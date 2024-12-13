export const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Payload kısmını al
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 formatına çevir
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload); // JSON formatına çevir
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null; // Token hatalıysa null dön
    }
  };

  