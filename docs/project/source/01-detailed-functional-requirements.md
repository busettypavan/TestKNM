# Real-Time Stock Market Analyzer — Detailed Functional Requirements

Lead: Pavan
Supersedes: `00-functional-requirements.md` (kept as the original draft/history)

## 1. Overview

A dashboard for NSE-listed stocks only. A user browses stocks, views a daily price chart with
a real technical-indicator toolkit (10+ indicators, not just one or two — see §4.2), enters
their own positions manually, sees real profit/loss against those positions, and applies one
trading strategy (Moving Average Crossover) to see a real entry/exit signal on the chart. Goal
planning, a full multi-strategy library, broker import, and the AI features are all confirmed
extension-scope, not MVP.

## 2. Users & Auth

- A user enters and keeps their own positions across visits — this only makes sense with a
  persistent identity.
- *Open item (not yet asked/confirmed): this doc assumes **basic auth is required for MVP**,
  the same way it was required for the other two capstones with persistent user data. Flag if
  Pavan intends positions to be session-only / unauthenticated for MVP instead.*

## 3. Data Model

| Entity | Key fields | Notes |
|---|---|---|
| `Stock` | symbol (NSE ticker, e.g. `RELIANCE.NS`), name, sector | Reference list. **Scoped to a curated subset for MVP — proposed Nifty 100 — not the full ~2,000-stock NSE universe** (see §6 for why). |
| `PriceHistory` | symbol, date, open, high, low, close, volume, last_refreshed_at | Daily OHLCV from Yahoo Finance (`yfinance`). **Fetched lazily**: populated the first time a stock is actually viewed, then refreshed at most once a day on later views — not pre-populated for the whole universe up front (see §6). |
| `Position` | id, user_id, symbol, quantity, buy_price, buy_date | Manually entered for MVP — confirmed. **Each entry is its own lot** — buying the same stock twice at different prices/dates creates two separate `Position` rows, not one averaged row (see §4.3). CSV/broker import is extension-scope. |
| `IndicatorRequest` | symbol, indicator_name, parameters | Computed on demand from `PriceHistory` — not persisted; a user just toggles which indicators overlay the chart (see §4.2 for the list). |
| `Strategy` | id, name, parameters | MVP ships exactly one: **Moving Average Crossover** (parameter: MA period, e.g. 50-day). |
| `Signal` | symbol, strategy_id, date, type (buy/sell), price_at_signal | **Computed on demand from `PriceHistory`, like indicators — not persisted as its own table for MVP.** Recomputed each time a user views that stock with that strategy active; caching/persistence for performance is extension-scope, not a day-one requirement. |

## 4. Core Flow (MVP)

### 4.1 Browsing
1. User sees a list of NSE stocks (the curated Nifty-100-style subset — see §3) with basic
   info (price, day change).
2. User opens one stock. If its `PriceHistory` hasn't been fetched yet, or wasn't refreshed
   today, the system fetches/refreshes it from `yfinance` now, then shows the daily price
   chart built from it.

### 4.2 Applying indicators
3. User can toggle on any of the following for that chart — **confirmed as 10, not the
   original draft's "one or two,"** a real scope increase worth flagging explicitly:
   1. Simple Moving Average (SMA)
   2. Exponential Moving Average (EMA)
   3. Relative Strength Index (RSI)
   4. Bollinger Bands (BB)
   5. MACD (Moving Average Convergence Divergence)
   6. Stochastic Oscillator
   7. Average True Range (ATR)
   8. Volume Weighted Average Price (VWAP)
   9. On-Balance Volume (OBV)
   10. Parabolic SAR
   - *This exact list is proposed, not yet confirmed by Pavan — it covers trend (SMA/EMA/MACD/
     SAR), momentum (RSI/Stochastic), volatility (BB/ATR), and volume (VWAP/OBV) in a balanced
     spread. Swap any entry out if Pavan has specific ones in mind instead.*
   - These are chart overlays for visual analysis — they do **not** by themselves generate a
     buy/sell signal. Only §4.4's strategy does that for MVP.

### 4.3 Entering a position & seeing P&L
4. User manually enters a position: stock, quantity, buy price, buy date. Saved against their
   account as its own lot (see §3 — no automatic averaging with any other lot in the same
   stock for MVP).
5. **The position view shows real profit/loss**: current price (from `PriceHistory`) vs.
   `buy_price`, as both an absolute amount and a percentage — this was missing from the
   original flow and is now explicit MVP scope, not an afterthought. If a user holds multiple
   lots of the same stock, each lot shows its own P&L; a combined/aggregate view across lots of
   the same stock is extension-scope.

### 4.4 Applying the MVP strategy
6. User applies **Moving Average Crossover** to a stock, choosing the MA period:
   - **Buy signal**: price crosses from below to above the chosen moving average.
   - **Sell signal**: price crosses from above to below it.
7. Signals are shown as markers on the chart at the dates they occurred.
   - *Open item: marker-on-chart is this doc's assumed display format — confirm, vs. e.g. a
     separate signal-list table alongside the chart.*

## 5. Business Rules Summary

- Indicators are visual overlays only; they never generate a signal on their own for MVP.
- Exactly one strategy ships in MVP (Moving Average Crossover) — the "pick from a short list"
  wording in the original draft is, for MVP, a list of one.
- Positions are manual-entry only for MVP, one lot per entry, never auto-averaged; import is
  extension-scope.
- Every position shows real, current P&L — not just a static record of what was entered.
- Price data is end-of-day, not intraday real-time, per the chosen data source (see §6).
- Stock universe is a curated subset (proposed Nifty 100), not the full NSE listing, for MVP.
- `PriceHistory` and `Signal` are both fetched/computed on demand, not pre-populated — the
  first viewer of a stock each day pays the (small) fetch cost, not a batch job run for stocks
  nobody looks at.

## 6. Non-Functional Notes

- **Data source**: Yahoo Finance via the `yfinance` library — free, no API key, NSE coverage
  via the `.NS` ticker suffix, data delayed roughly 15 minutes and end-of-day for historical
  candles. Explicitly **not** suitable for real production trading — fine for this capstone.
- **"Real-Time" in the project name**: worth flagging that the actual MVP data is delayed/
  end-of-day, not streaming live. If a genuinely real-time feel matters, that needs a
  different (likely paid/broker-account-gated) data source — treated as extension-scope here.
- **Indicator computation**: compute server-side from cached `PriceHistory`, not client-side
  from scratch each time, so toggling 10 indicators stays responsive.
- **Why a curated subset, not all ~2,000 NSE stocks**: `yfinance` has no official SLA/rate
  guarantee, and pre-fetching or even lazily fetching the full universe across many concurrent
  users risks real throttling. A Nifty-100-sized list keeps both the fetch load and the
  browsing UI's data volume manageable for a 5-week build — expand later if it holds up well.

## 7. Out of Scope for MVP (Extension Ideas)

- Full goal planning: investment plan (monthly/yearly), multiple goals (target corpus by a
  date, planned withdrawal by a date), and progress tracking.
- A full strategy library beyond MA Crossover — entry, exit, averaging, and partial-sell
  signals, each with its own parameters, selectable by holding period/time cycle/chart style.
- Comparing two or more strategies side by side.
- Position entry via broker statement/CSV import.
- An aggregate (multi-lot) P&L view per stock, beyond per-lot P&L.
- Expanding beyond the curated stock subset to the full NSE universe.
- Persisting/caching `Signal` results instead of recomputing on demand.
- AI features (light touch, all deferred): news/sentiment summary, strategy-signal
  explanation, goal-gap check, strategy recommender.

## 8. Remaining Open Items

1. **Auth requirement** — assumed required for MVP (see §2) since positions persist across
   visits; not yet explicitly confirmed.
2. **Final 10-indicator list** — proposed in §4.2; confirm or swap entries with Pavan.
3. **Signal display format** — assumed chart markers; confirm vs. a separate signal table.
4. **"Real-time" framing** — confirm whether the project name should be adjusted, or whether
   true real-time data is actually wanted as a later extension, not just end-of-day.
5. **Curated stock list** — proposed Nifty 100 as the MVP universe; confirm the exact list or
   a different cutoff with Pavan.
