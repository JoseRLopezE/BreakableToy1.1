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
    if (stock < 5) return 'text-red-600';
    if (stock <= 10) return 'text-orange-600';
    return '';
  }