import { getExpirationColor, getStockColor, formatDate } from './dateUtils';

describe('dateUtils', () => {
  describe('getExpirationColor', () => {
    it('returns red for expiration within 7 days', () => {
      const today = new Date();
      const expDate = new Date(today);
      expDate.setDate(today.getDate() + 5);
      expect(getExpirationColor(expDate.toISOString())).toBe('bg-red-100');
    });

    it('returns yellow for expiration within 14 days', () => {
      const today = new Date();
      const expDate = new Date(today);
      expDate.setDate(today.getDate() + 10);
      expect(getExpirationColor(expDate.toISOString())).toBe('bg-yellow-100');
    });

    it('returns green for expiration beyond 14 days', () => {
      const today = new Date();
      const expDate = new Date(today);
      expDate.setDate(today.getDate() + 20);
      expect(getExpirationColor(expDate.toISOString())).toBe('bg-green-100');
    });

    it('returns empty string for undefined expiration date', () => {
      expect(getExpirationColor(undefined)).toBe('');
    });
  });

  describe('getStockColor', () => {
    it('returns red for stock less than 5', () => {
      expect(getStockColor(3)).toBe('bg-red-200');
    });

    it('returns orange for stock between 5 and 10', () => {
      expect(getStockColor(7)).toBe('bg-orange-200');
    });

    it('returns empty string for stock greater than 10', () => {
      expect(getStockColor(15)).toBe('');
    });
  });

  describe('formatDate', () => {
    it('formats a valid date string correctly', () => {
      expect(formatDate('2025-12-31')).toBe('12/31/2025');
    });

    it('returns "N/A" for an invalid or empty date string', () => {
      expect(formatDate('')).toBe('N/A');
    });
  });
});
