# Assumptions for Stock Analyzer

## 1. Project Scope Assumptions

| ID      | Assumption                                                       | Rationale                                                       | Validation Required                                                                                                                |
| ------- | ---------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ASM-001 | The MVP is a web-based stock analysis dashboard.                 | Supports centralized access and a single user interface.        | Confirm deployment and access expectations. <br />ANS: It will be locally hosted accessed by providing user email id and passwor) |
| ASM-002 | Only NSE-listed stocks are supported.                            | Keeps the initial market scope focused.                         |                                                                                                                                    |
| ASM-003 | The initial stock universe is a curated Nifty-100-style list.    | Limits external data requests and simplifies navigation.        |                                                                                                                                    |
| ASM-004 | Historical daily OHLCV data is sufficient for the MVP.           | Supports daily charts, indicators, and crossover signals.       | Confirm that intraday analysis is not required.<br />ANS:  Intraday analysis will only be implemented in the next version)       |
| ASM-005 | The MVP supports one trading strategy: Moving Average Crossover. | Keeps the strategy engine small enough for the delivery window. | Confirm the strategy rules and parameter controls.<br />ANS: Moving Average Crossover is only required for MVP                     |
| ASM-006 | Positions are entered manually by users.                         | Avoids broker integrations and statement parsing.               | Confirm no CSV or broker import is needed.<br />ANS: No CSV or broker import in current version                                    |
| ASM-007 | AI-assisted features are deferred.                               | Prioritizes core analytical functionality.                      | Confirm AI is not a mandatory launch requirement.<br />ANS:  AI-assisted features will be part of next release))                  |
| ASM-008 | The MVP is for analysis and learning, not automated trading.     | Avoids broker execution and order-management complexity.        |                                                                                                                                    |

## 2. Authentication, Users and Authorization

| ID      | Assumption                                                              | Rationale                                                                    |  |
| ------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- | - |
| ASM-009 | Authentication is mandatory.                                            | User positions must persist across sessions and visits.                      |  |
| ASM-010 | Each user has a persistent account.                                     | Positions must be associated with a stable user identity.                    |  |
| ASM-011 | Users can access only their own positions.                              | Prevents unauthorized disclosure or modification of personal portfolio data. |  |
| ASM-012 | Authentication credentials and sessions will be handled securely.       | Protects user accounts and stored portfolio information.                     |  |
| ASM-013 | Administrative user management is not included unless explicitly added. | The requirements do not define an administrator console.                     |  |

**Security baseline:** Every position read, create, update, and delete operation must be authorized against the authenticated user. Hiding another user's records in the UI is insufficient; enforcement must occur on the server.

## 3. Market Data Assumptions

| ID      | Assumption                                                                                              | Rationale                                                                            | Validation Required                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| ASM-014 | Yahoo Finance accessed through `yfinance` is the MVP market-data source.                              | Provides a practical, low-cost data source for historical NSE prices.                |                                                                                                  |
| ASM-017 | Price history is fetched lazily when a stock is first viewed.                                           | Avoids fetching data for stocks that nobody opens.                                   |                                                                                                  |
|         |                                                                                                         |                                                                                      |                                                                                                  |
| ASM-018 | Cached price history is refreshed at most once per stock per calendar day.                              | Reduces repeated external requests.                                                  | Define the relevant market timezone and refresh boundary.<br />ANS: IST                          |
| ASM-016 | Data is daily historical data, not a guaranteed live streaming feed.                                    | Matches the specified chart and indicator requirements.                              |                                                                                                  |
| ASM-019 | External data may be delayed, missing, revised, or temporarily unavailable.                             | The provider does not guarantee an uninterrupted service level for this application. | Approve fallback and error-message behavior.<br />ANS: A proper error message will be displayed. |
| ASM-020 | A failed refresh must not silently replace valid cached data with invalid or empty data.                | Preserves the last known usable history.                                             |                                                                                                  |
| ASM-021 | Market-data timestamps and trading dates will be interpreted consistently in the Asia/Kolkata timezone. | Prevents date-boundary and refresh inconsistencies.                                  |                                                                                                  |

### 3.1 Data availability and accuracy

The application will distinguish between:

- The latest available price in the cached historical dataset.
- The most recent trading date represented by that dataset.
- The time the application last successfully refreshed its data.

The application must not imply that a cached closing price is a live quote.

If data is unavailable, the dashboard should display a useful error or stale-data warning instead of fabricating a price.

Historical values and signals are analytical outputs and are not guaranteed to represent executable market prices.

## 4. Stock Universe Assumptions

1. The MVP will use an approved, curated list of approximately 100 NSE stocks.
2. The list will be maintained as application reference data.
3. Each stock will have a unique canonical symbol, display name, and sector where available.
4. A stock's inclusion in the list does not imply a recommendation to buy or sell it.
5. The MVP will not automatically synchronize index constituents or manage corporate-action-driven universe changes unless explicitly added.
6. Invalid or unsupported tickers will be identified during data retrieval and surfaced appropriately.
7. Expanding the universe to the entire NSE listing will require a separate performance and data-provider review.

**Decision required:** Approve the exact stock universe and the process for updating it.

## 5. Technical Indicator Assumptions

The MVP is assumed to include the following ten indicators.

| No. | Indicator                                    | Assumption                                                                                |
| --: | -------------------------------------------- | ----------------------------------------------------------------------------------------- |
|   1 | Simple Moving Average (SMA)                  | User can select or configure the supported period.                                        |
|   2 | Exponential Moving Average (EMA)             | User can select or configure the supported period.                                        |
|   3 | Relative Strength Index (RSI)                | A standard RSI implementation is used with a configurable period where supported.         |
|   4 | Bollinger Bands (BB)                         | Standard moving-average and standard-deviation calculations are used.                     |
|   5 | Moving Average Convergence Divergence (MACD) | Standard fast, slow, and signal periods are supported.                                    |
|   6 | Stochastic Oscillator                        | Standard %K and %D calculations are used.                                                 |
|   7 | Average True Range (ATR)                     | Standard true-range calculation is used with a configurable period where supported.       |
|   8 | Volume Weighted Average Price (VWAP)         | The calculation convention and reset period will be documented for daily historical data. |
|   9 | On-Balance Volume (OBV)                      | Calculated from closing-price direction and volume.                                       |
|  10 | Parabolic SAR                                | Standard acceleration-factor and maximum-factor parameters are used.                      |

### 5.1 Calculation and display assumptions

- Indicators are computed on the server from cached price history.
- Indicator values are calculated on demand and are not stored as permanent records in the MVP database. for full version  Indicators will be stored in database and displayed directly from database.
- Users can enable or disable supported indicators on the chart.
- Indicator calculations must use a documented implementation and consistent parameter defaults.
- Insufficient historical data will result in unavailable indicator values rather than fabricated values.
- Indicator overlays and panels are visual-analysis features; they do not independently generate buy or sell signals.
- The initial implementation will prioritize calculation correctness, chart readability, and responsive interactions over highly customized indicator styling.

### 5.2 VWAP limitation

This indicator is for feature releases place holder for now it uses the below formula

DailyVWAP = (High + Low + Close) / 3

## 6. Position Management and Profit/Loss Assumptions

| ID      | Assumption                                                                            | Rationale                                                             |
| ------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ASM-022 | Each position entry represents a separate purchase lot.                               | Preserves individual purchase prices and dates.                       |
| ASM-023 | A position contains a stock, quantity, buy price, and buy date.                       | Matches the specified data model.                                     |
| ASM-024 | Position records are stored persistently and linked to the owning user.               | Enables access across sessions.                                       |
| ASM-025 | Each lot displays its own unrealized profit/loss.                                     | Matches the required per-lot reporting.                               |
| ASM-026 | Aggregate multi-lot P&L is excluded from the MVP.                                     | Prevents expansion into portfolio aggregation.                        |
| ASM-027 | Broker imports, automated position synchronization, and trade execution are excluded. | Keeps data entry and ownership rules simple.                          |
| ASM-028 | Position entry validation is enforced by the server.                                  | Prevents invalid quantities, prices, dates, and ownership references. |

### 6.1 P&L calculation

For a long position:

**Unrealized P&L amount**

`(Current Price - Buy Price) × Quantity`

**Unrealized P&L percentage**

`((Current Price - Buy Price) / Buy Price) × 100`

The percentage calculation assumes a positive buy price.

### 6.2 Additional financial assumptions

- P&L is unrealized and excludes brokerage, taxes, exchange charges, dividends, and other transaction costs.
- The displayed current price is the latest usable price in the available historical dataset, which may be a previous trading day's close.
- The interface will display the price date or an equivalent freshness indicator.
- A position with missing market data must show P&L as unavailable or stale, rather than presenting a misleading zero.
- Multiple lots of the same stock remain separate records and show separate P&L values.
- The MVP will not model partial exits, short positions, leverage, corporate-action adjustments, or realized P&L unless separately approved.
- Buy dates must not be later than the permitted current date under the application's chosen market-time convention.
- Quantity and buy price must be positive values.
- Users can delete position lots after creation

## 7. Moving Average Crossover Strategy Assumptions

The MVP will contain exactly one strategy: **Moving Average Crossover**.

### 7.1 Signal rules

- **Buy:** The closing price crosses from below to above the selected moving average.
- **Sell:** The closing price crosses from above to below the selected moving average.
- Signals are computed using historical daily price data.
- Signals are computed when the user views the stock with the strategy enabled.
- Signals are not persisted as separate database records.
- Signal caching and historical signal persistence are deferred.
- Signals are analytical markers and do not trigger broker orders.

### 8.2 Parameter assumptions

The requirements mention an MA period, such as 50 days, but do not completely specify the moving-average calculation.

For the initial implementation, the proposed default is a configurable **50-day Simple Moving Average (SMA)**,

The following details must be confirmed:

1. Moving average will be SMA.
2. Closing price is compared directly against the moving average.
3. Signal requires a confirmed daily close.
4. Duplicate signals should be suppressed when the price remains on one side of the moving average.
5. How the application handles insufficient history and the first valid signal date.

### 7.3 Signal presentation

The current assumption is that buy and sell signals will be displayed as markers on the price chart at the corresponding historical dates.

A separate signal-history table is not  mandatory.

Signals will not account for transaction costs, slippage, liquidity, or actual trade execution. Their presence does not establish that a trade would have been profitable.

## 8. User Interface Assumptions

1. The application will provide a stock-list view and an individual stock-analysis view.
2. Users can search or filter the curated stock universe using agreed fields.
3. A stock-analysis view will contain a daily price chart, indicator controls, and strategy controls.
4. The position view will show each user's lots and per-lot P&L.
5. Loading, empty, invalid-input, and data-provider error states will be implemented.
6. The interface will identify delayed, historical, or stale data clearly.
7. Charting will use a suitable charting library that supports candlesticks, volume, overlays, and historical markers.
8. A third-party charting library may be used subject to its licensing, availability, and integration constraints.
9. Responsive behavior will be supported for commonly used desktop and mobile browser sizes, subject to an agreed acceptance standard.
10. The MVP will not require extensive user-configurable dashboards, drag-and-drop chart layouts, or custom chart scripting.

**Decision required:** Approve the charting library, final screen layout, and whether the signal-history table is part of the MVP.

## 9. Architecture and Persistence Assumptions

The detailed functional requirements define the core data entities but do not prescribe a complete technology architecture. The following are proposed implementation assumptions, subject to approval.

- The application will use a client-server architecture.
- Business logic, authentication enforcement, market-data access, indicator calculations, and signal calculations will be performed server-side.
- A persistent relational database will store user accounts or identity references, positions, and required reference data.
- Price history may be persisted in the database or an approved cache-backed storage layer to support lazy fetching and daily refresh.
- Stock metadata will be maintained independently from user positions.
- External market-data calls will be isolated behind a service or adapter to simplify future provider replacement.
- Indicator and strategy calculations will be implemented as reusable modules with automated tests.
- Secrets and environment-specific configuration will not be hard-coded into source code.
- Database migrations and basic application logging will be included.
- The design will allow future additions such as more strategies, alternate market-data providers, and AI services without requiring a complete rewrite.

The final programming language, web framework, database engine, charting library, hosting model, and deployment environment must be confirmed in the technical design.

## 10. Non-Functional Assumptions

### 10.1 Performance

- A curated universe of approximately 100 stocks is sufficient for the initial release.
- The application will avoid fetching historical data for every stock at startup.
- Indicators will be calculated server-side from cached data.
- The first view of a stock may take longer than subsequent views because it may require an external data fetch.
- Signal calculations will operate on the available cached history rather than requiring a separate batch-processing service.

Specific performance targets are not yet defined. The team should establish measurable acceptance targets for initial chart load, cached chart load, indicator toggling, and concurrent users before performance testing.

### 10.2 Availability and resilience

- Yahoo Finance availability is an external dependency.
- The application will handle timeouts, empty responses, invalid symbols, and rate limiting gracefully.
- Valid cached data should remain available during temporary provider outages when possible.
- The MVP does not assume a contractual uptime guarantee or a high-availability multi-region deployment.
- Failed requests must not produce false prices or false trading signals.

### 10.3 Security and privacy

- Authenticated endpoints must enforce user-level authorization.
- Passwords, where locally managed, must be stored using an appropriate password-hashing mechanism rather than reversible encryption or plaintext.
- Transport encryption will be used in production deployment.
- Sensitive configuration values must be stored outside source control.
- User data must not be exposed through predictable record IDs, unrestricted API responses, or client-side-only authorization.
- Basic validation, error handling, and audit-friendly application logging will be included.
- Detailed regulatory compliance, penetration testing, and enterprise identity integration are not assumed unless separately agreed.

### 10.4 Maintainability and testing

- Unit tests will cover P&L calculations, indicator calculations, crossover rules, and data validation.
- Integration tests will cover persistence, authentication, authorization, and market-data adapter behavior.
- The team will validate representative tickers and known historical datasets.
- The MVP will document setup instructions, environment configuration, and core application behavior.
- Production-scale load testing and formal certification are outside the default scope.

## 11. External Dependencies and Constraints

| Dependency                   | Assumption                                                                 | Risk if Assumption Fails                    | Mitigation                                                              |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Yahoo Finance / `yfinance` | Historical NSE data is accessible for supported tickers.                   | Missing data or request failures.           | Validate the approved universe and handle provider errors.              |
| Network connectivity         | The server can reach the data provider.                                    | Stock charts may not refresh.               | Retain valid cached data and report freshness.                          |
| Authentication provider      | An appropriate authentication implementation can be configured.            | Delayed account and authorization features. | Finalize the authentication choice early.                               |
| Database                     | Persistent storage is available.                                           | User positions cannot be retained reliably. | Confirm the database and migration approach before feature development. |
| Charting library             | The selected library supports candlesticks, volume, overlays, and markers. | UI rework or missing chart capabilities.    | Prototype the chart early.                                              |
| Five-week delivery window    | Core requirements remain stable after approval.                            | Schedule overrun.                           | Use change control and defer extension features.                        |

## 12. Explicitly Excluded from the MVP

Unless formally approved through change control, the following are excluded:

- Intraday live streaming quotes and guaranteed real-time data.
- Automated order placement and broker connectivity.
- Broker statement or CSV position import.
- Full NSE stock-universe coverage.
- Goal planning and investment-goal tracking.
- A multi-strategy library and strategy comparison.
- AI news summaries, sentiment analysis, and AI-generated recommendations.
- Persisted signal history or dedicated signal-caching infrastructure.
- Combined multi-lot P&L and advanced portfolio analytics.
- Realized P&L, tax reporting, and transaction-cost accounting.
- Advanced alerting, notifications, and automated trade execution.
- Enterprise administration and complex role-based access control, unless separately specified.

These items may be considered for future releases after the MVP has been accepted.

## 13. Assumption Change-Control Process

1. The project lead reviews and approves the assumptions before implementation.
2. A change to an approved assumption is documented with its business rationale.
3. The team assesses the effect on scope, architecture, security, testing, cost, and schedule.
4. Changes affecting the five-week delivery plan are approved before implementation.
5. Requirements and acceptance criteria are updated to reflect the approved change.
6. Features not approved for the MVP remain in the extension backlog.

An assumption should not be silently converted into a permanent requirement without review.

### 14 General Asumptions:

- The web application is used by retail and instutional traders.
- User access this application to find the buy and sell opportunity.
- User enters and keeps their own positions across visits.
- User enters their own positions manually, sees real profit/loss against those positions.
- User views a daily price chart with a real technical-indicator toolkit. The following indicators will be implemented : Simple Moving Average (SMA), Exponential Moving Average (EMA), Relative Strength Index (RSI), Bollinger Bands (BB), MACD (Moving Average Convergence Divergence), Stochastic Oscillator, Average True Range (ATR), Volume Weighted Average Price (VWAP), On-Balance Volume (OBV), Parabolic SAR and framework to expand the list.
- The date is fetched from  Daily OHLCV from Yahoo Finance.
- Price data is end-of-day, not intraday real-time, per the chosen data source.
- Stock universe is a curated Nifty 100 stocks only.
- `PriceHistory` and `Signal` are both fetched/computed on demand, not pre-populated.
- This application uses three tire architecture ReactJS as frontend, python as backend and firebase as database.

### 16. Future Enhancements

* AI features (light touch, all deferred): news/sentiment summary, strategy-signal explanation, goal-gap check, strategy recommender.
* Comparing two or more strategies side by side.
* Position entry via broker statement/CSV import.
* An aggregate (multi-lot) P&L view per stock, beyond per-lot P&L.
* Expanding beyond the curated stock subset to the full NSE universe.
* Persisting/caching Signal results instead of recomputing on demand.
* Full goal planning: investment plan (monthly/yearly), multiple goals (target corpus by a date, planned withdrawal by a date), and progress tracking.

| Decision ID | Question                                                                   | Proposed Default                         | Priority |
| ----------- | -------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| DEC-001     | Is authentication mandatory for MVP?                                       | Yes, with persistent accounts.           | Critical |
| DEC-002     | Which moving average drives crossover signals?                             | 50-day SMA, configurable period.         | Critical |
| DEC-003     | Are chart markers sufficient for signal presentation?                      | Markers on the price chart.              | High     |
| DEC-004     | Which exact stocks are included?                                           | Approved Nifty-100-style universe.       | High     |
| DEC-005     | Should users be able to edit and delete positions?                         | Support controlled editing and deletion. | High     |
| DEC-006     | Is combined portfolio valuation required?                                  | Defer aggregate views unless approved.   | Medium   |
| DEC-007     | Which database, backend, frontend, and charting technologies will be used? | Select during technical design.          | High     |
| DEC-008     | What are the performance and concurrent-user targets?                      | Define before acceptance testing.        | High     |
| DEC-009     | What is the required authentication and account-management model?          | Finalize before implementation.          | High     |
| DEC-010     | How should daily-data VWAP be calculated and labeled?                      | Document the convention and limitations. | High     |
