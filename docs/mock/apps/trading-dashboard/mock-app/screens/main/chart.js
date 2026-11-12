import { pageHead, field } from '../../shared/components.js?v=1';
import { button } from '../../shared/form.js?v=1';

export const meta = { code: 'S03', name: 'Stock Chart with Indicators', side: 'main', icon: 'chart', nav: 'Analysis', roles: ['trader'] };

export function render({ user, data, params }) {
  const stock = data.chartData.RELIANCE || {};
  const indicators = data.indicators || {};
  const maStrategy = data.maStrategy || {};

  return `
    <div class="card">
      ${pageHead(stock.symbol, `${stock.name} - ${stock.lastUpdate}`)}

      <div style="border: 1px solid #ccc; padding: 16px; margin-bottom: 16px; border-radius: 8px; background: #f9fafb; min-height: 300px;">
        <div style="text-align: center; color: #666; font-size: 14px;">
          📊 Interactive Candlestick Chart with Volume
        </div>
        <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 4px; font-size: 12px; color: #666;">
          Chart displays OHLCV data with multiple indicator overlays
        </div>
      </div>

      <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
        <div style="font-weight: 600; margin-bottom: 8px;">Technical Indicators</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
          <label><input type="checkbox" ${indicators.sma?.enabled ? 'checked' : ''} data-action="toggle-sma"> SMA (${indicators.sma?.period})</label>
          <label><input type="checkbox" ${indicators.ema?.enabled ? 'checked' : ''} data-action="toggle-ema"> EMA (${indicators.ema?.period})</label>
          <label><input type="checkbox" ${indicators.rsi?.enabled ? 'checked' : ''} data-action="toggle-rsi"> RSI (${indicators.rsi?.period})</label>
          <label><input type="checkbox" ${indicators.bollinger?.enabled ? 'checked' : ''} data-action="toggle-bollinger"> Bollinger Bands</label>
          <label><input type="checkbox" ${indicators.macd?.enabled ? 'checked' : ''} data-action="toggle-macd"> MACD</label>
          <label><input type="checkbox" ${indicators.stochastic?.enabled ? 'checked' : ''} data-action="toggle-stochastic"> Stochastic</label>
          <label><input type="checkbox" ${indicators.atr?.enabled ? 'checked' : ''} data-action="toggle-atr"> ATR</label>
          <label><input type="checkbox" ${indicators.vwap?.enabled ? 'checked' : ''} data-action="toggle-vwap"> VWAP</label>
          <label><input type="checkbox" ${indicators.obv?.enabled ? 'checked' : ''} data-action="toggle-obv"> OBV</label>
          <label><input type="checkbox" ${indicators.sar?.enabled ? 'checked' : ''} data-action="toggle-sar"> SAR</label>
        </div>
      </div>

      <div style="background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
        <div style="font-weight: 600; margin-bottom: 8px;">MA Crossover Strategy</div>
        <label style="font-size: 13px;">
          <input type="checkbox" ${maStrategy.enabled ? 'checked' : ''} data-action="toggle-strategy"> Enable Buy/Sell Signals (SMA ${maStrategy.maPeriod})
        </label>
        ${maStrategy.enabled ? `
          <div style="margin-top: 8px; padding: 8px; background: white; border-radius: 4px; font-size: 12px;">
            📍 <strong>Signal:</strong> Buy signal on 2026-11-07 (green ⬆️), Sell signal on 2026-11-08 (red ⬇️)
          </div>
        ` : ''}
      </div>

      <div class="row">
        ${button({ label: 'Back to Stock List', 'data-goto': 'S02' })}
      </div>
    </div>
  `;
}
