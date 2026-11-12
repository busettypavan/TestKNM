# Spec Gaps: Stock Analysis Walkthrough

## Spec Gaps

1. **Chart Rendering Engine:** The spec (REQ-333) describes chart display but does not specify the interactive charting library or exact visual appearance. Walkthrough shows a placeholder candlestick chart representation.

2. **Indicator Computation Details:** REQ-334 specifies 10+ indicators (SMA, EMA, RSI, Bollinger Bands, MACD, Stochastic, ATR, VWAP, OBV, Parabolic SAR) but does not define visual styling, colors, or line styles for each indicator overlay.

3. **MA Crossover Signal Display:** REQ-335 specifies buy/sell signal markers but does not define exact marker appearance (shape, size, or positioning on chart). Walkthrough shows marker indicators as emoji symbols (⬆️ for buy, ⬇️ for sell).

4. **Indicator Toggle Responsiveness:** REQ-334 specifies "update chart within 1 second" but does not define transition animation or loading state during recomputation.

5. **Insufficient Data Handling:** REQ-334 mentions "Not enough data" for indicators needing more bars, but exact UI placement and styling is not specified.

## Walkthrough Notes (Not Spec Gaps)

- **Login Flow:** Walkthrough pre-fills credentials for demo purposes; actual form validation is left to implementation.
- **Stock Selection:** RELIANCE selected as example; any stock from Nifty-100 list would follow the same flow.
- **Indicator Toggles:** Walkthrough demonstrates toggling SMA, RSI, and Bollinger Bands as representative indicators; all 10+ indicators are shown in the UI but only these three are toggled in the tour steps.
- **Chart Data:** Sample OHLCV data provided for demonstration; actual data would come from Yahoo Finance as per REQ-333.
- **MA Crossover Signals:** Sample signals shown for 2026-11-07 (buy) and 2026-11-08 (sell); actual computation follows REQ-335 specification.
- **Price Freshness:** Walkthrough shows last update timestamp (2026-11-12 16:00 IST); refresh behavior per REQ-333 not demonstrated in this tour.
