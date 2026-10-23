import { FEES } from '../data/services.js';

/**
 * Standardized price formatter for Egyptian market
 * @param {number} amount
 * @param {string} currency
 * @returns {string} e.g. "120 جنيه مصري"
 */
export function formatPrice(amount, currency = FEES.currency) {
  if (typeof amount !== 'number' || isNaN(amount)) return `0 ${currency}`;
  return `${amount} ${currency}`;
}

/**
 * Localized Arabic date formatter to prevent raw ISO leaks in UI
 * @param {string} isoDateStr - e.g. "2026-10-23"
 * @returns {string} e.g. "الجمعة، 23 أكتوبر 2026"
 */
export function formatArabicDate(isoDateStr) {
  if (!isoDateStr) return '';
  try {
    const parts = isoDateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    const d = new Date(isoDateStr);
    return isNaN(d.getTime())
      ? isoDateStr
      : d.toLocaleDateString('ar-EG', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  } catch {
    return isoDateStr;
  }
}
