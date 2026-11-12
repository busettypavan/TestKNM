# Display Daily Price Chart from Yahoo Finance

## Purpose
Enable traders to view historical daily price data and technical analysis on interactive candlestick charts. Charts are foundation for all indicator and signal analysis.

## Behaviour
- User selects stock from list, system fetches daily OHLCV from Yahoo Finance (yfinance library)
- Data is cached; subsequent views use cache if refreshed today
- Cache refreshes at most once per calendar day per stock
- System displays interactive candlestick chart with volume bars
- Loading state shown during fetch; error state shown if data unavailable
- Chart is responsive and zoomable

## Acceptance Criteria
1. First stock view fetches data from Yahoo Finance and displays chart
2. Second view of same stock uses cache (no re-fetch if today)
3. Cache refreshes next calendar day automatically on first view
4. Failed data fetch shows error with retry option
5. Chart shows candlesticks, volume, and date/price axes
6. Chart handles missing data gracefully (e.g., weekends/holidays)

## Order: 4 of 9
## Depends on: 3 (Browse Stock List)

## Source Documents
- Functional Requirements §4.1, §3 (Data Model)
- Assumptions: ASM-014, ASM-017, ASM-021

## Open Questions
- Cache storage (assume database, confirm)
- Failed refresh behavior (assume keep valid cache, confirm)
