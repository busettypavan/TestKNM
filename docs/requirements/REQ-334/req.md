# Toggle 10+ Technical Indicators on Charts

## Purpose
Enable traders to perform detailed technical analysis using multiple indicators simultaneously. Indicators are visual overlays computed server-side from price history.

## Behaviour
- Chart displays control panel with toggles for each indicator: SMA, EMA, RSI, Bollinger Bands, MACD, Stochastic, ATR, VWAP, OBV, Parabolic SAR
- User toggles indicator on/off; chart updates immediately
- Each indicator shows configurable period (e.g., SMA with 20/50/200 period options)
- Indicators are computed server-side, not client-side
- Insufficient history (e.g., RSI needs 14+ bars) shows indicator as unavailable

## Acceptance Criteria
1. Each indicator can be independently toggled on/off
2. Toggling updates chart within 1 second (responsive)
3. Each indicator displays with distinct color/line style
4. Period/parameter options are available (e.g., SMA: 20, 50, 200)
5. Indicators overlay correctly on candlestick chart
6. Insufficient history shows "Not enough data" instead of fabricated values

## Order: 5 of 9
## Depends on: 4 (View Stock Chart)

## Source Documents
- Intent: G2 (10+ indicators)
- Functional Requirements §4.2, §3 (IndicatorRequest)
- Assumptions: §5 (Indicator Assumptions)

## Open Questions
- VWAP calculation for daily data (formula in assumptions §5.2, confirm)
- Default visible indicators on chart load (assume SMA only, confirm)
