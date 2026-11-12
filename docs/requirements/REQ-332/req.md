# View and Search NSE Stock List

## Purpose
Provide traders access to curated NSE stocks for discovery and selection before analysis. Stock list is the entry point to the technical analysis workflow.

## Behaviour
- System loads curated list of ~100 NSE (Nifty-100) stocks
- Each stock shows: symbol, name, sector, current price, day change (%), day change (amount)
- User can search by stock symbol (e.g., "RELIANCE") or name
- User can filter by sector (optional MVP feature)
- Clicking a stock opens its analysis page

## Acceptance Criteria
1. Stock list displays all ~100 curated stocks with current prices
2. Search by symbol returns matching stocks (case-insensitive)
3. Search by name returns matching stocks (partial match)
4. Empty search shows all stocks
5. Clicking a stock navigates to chart/analysis view
6. Stock data is not pre-fetched; lazy-load only when user navigates to stock

## Order: 3 of 9
## Depends on: 2 (User Login)

## Source Documents
- Intent: G1, G2 (Signal generation, technical analysis)
- Functional Requirements §4.1 (Browsing)
- Assumptions: ASM-003 (Nifty-100 universe)

## Open Questions
- Exact stock list / approval process (propose standard Nifty-100, confirm)
- Price freshness indicator (assume end-of-day, show last update time)
- Sort options (assume by price, name, sector, confirm)
