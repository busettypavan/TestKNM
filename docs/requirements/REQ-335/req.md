# Apply Moving Average Crossover with Buy/Sell Signals

## Purpose
Enable traders to apply the Moving Average Crossover trading strategy and see entry/exit signal markers on the price chart to identify historical trading opportunities.

## Behaviour
- User enables MA Crossover strategy control
- User selects or configures MA period (default 50-day SMA)
- System computes signals: buy when price crosses above MA, sell when price crosses below
- Signals display as markers on chart at corresponding historical dates
- User can toggle strategy on/off
- Signals are recomputed on demand when chart is viewed

## Acceptance Criteria
1. Strategy enabled shows buy/sell markers on chart
2. Buy signal marker (e.g., green ⬆️) appears when price crosses above MA
3. Sell signal marker (e.g., red ⬇️) appears when price crosses below MA
4. Configurable MA period (propose 50-day SMA, confirm method)
5. Insufficient history shows "Strategy requires more data"
6. Signals are accurate against historical price data

## Order: 6 of 9
## Depends on: 4 (View Stock Chart)

## Source Documents
- Intent: G1 (Buy/sell signals)
- Functional Requirements §4.4, §3 (Strategy, Signal)
- Assumptions: ASM-005, §7 (MA Crossover)

## Open Questions
- SMA vs EMA (propose SMA per assumptions, confirm)
- Signal list table separate from chart (assume markers only, confirm)
