import { pageHead, field, esc, badge } from '../../shared/components.js?v=1';
import { button, input } from '../../shared/form.js?v=1';
import { table } from '../../shared/components.js?v=1';

export const meta = { code: 'S02', name: 'Stock List', side: 'main', icon: 'list', nav: 'Stocks', roles: ['trader'] };

export function render({ user, data, params }) {
  const stocks = data.stocks || [];
  const headers = ['Symbol', 'Name', 'Sector', 'Price', 'Change'];
  const rows = stocks.map(stock => [
    `<strong>${stock.symbol}</strong>`,
    stock.name,
    stock.sector,
    `₹${stock.currentPrice.toFixed(2)}`,
    `<span style="color: ${stock.dayChange >= 0 ? '#16a34a' : '#dc2626'}">${stock.dayChange >= 0 ? '+' : ''}${stock.dayChange.toFixed(2)} (${stock.dayChangePercent}%)</span>`,
    stock.symbol === 'RELIANCE' ? `<button data-action="select-stock">View</button>` : `<button style="opacity: 0.5;">View</button>`
  ]);

  return `
    <div class="card">
      ${pageHead('NSE Stock List', 'Select a stock to analyze')}
      <div class="row">
        ${input({ name: 'search', placeholder: 'Search by symbol or name...', 'data-action': 'search' })}
      </div>
      ${table(['Symbol', 'Name', 'Sector', 'Price', 'Change', ''], rows)}
    </div>
  `;
}
