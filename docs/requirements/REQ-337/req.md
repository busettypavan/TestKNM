# View Per-Lot Profit/Loss with Amount and Percentage

## Purpose
Enable traders to understand their portfolio performance by viewing real-time unrealized profit/loss for each position lot.

## Behaviour
- User navigates to positions view
- System displays all user's lots with current market price
- For each lot: stock, quantity, buy price, buy date, current price, P&L amount, P&L %
- P&L Amount = (Current Price - Buy Price) × Quantity
- P&L % = ((Current Price - Buy Price) / Buy Price) × 100
- Current price from latest cached price history
- Price freshness indicator (e.g., "As of: 2026-11-12 IST")
- Missing data shows "Data unavailable" rather than misleading zero

## Acceptance Criteria
1. Each lot displays correct P&L amount (currency)
2. Each lot displays correct P&L percentage
3. Green color for positive P&L, red for negative
4. Stale price shows warning or timestamp
5. Missing price data shows unavailable state
6. Aggregate multi-lot P&L NOT shown (deferred per MVP)

## Order: 8 of 9
## Depends on: 7 (Enter Trading Position), 4 (View Stock Chart)

## Source Documents
- Intent: G3 (Track positions and P&L)
- Functional Requirements §4.3, §6.1 (P&L calculation)
- Assumptions: ASM-023, ASM-025, ASM-131

## Open Questions
- Portfolio total P&L (assume NOT MVP, confirm per assumptions)
