export function getExpirationColor(expirationDate: string | undefined): string {
    if (!expirationDate) return '';
    
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return 'bg-red-100';
    if (diffDays <= 14) return 'bg-yellow-100';
    return 'bg-green-100';
  }
  
  export function getStockColor(stock: number): string {
    if (stock < 5) return 'bg-red-200';
    if (stock <= 10) return 'bg-orange-200';
    return '';
  }

  export const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };