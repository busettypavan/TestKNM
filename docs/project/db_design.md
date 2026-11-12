# DB design

**Target DB:** Turso (SQLite-based, edge-distributed)

**Constraints:**
- UUID primary keys for all tables (globally unique, distributed-safe)
- snake_case naming convention
- Timestamps (created_at, updated_at) on all tables to track modification history
- 3NF normalization applied: no redundant data, all non-key attributes depend on primary key
- SQLite data types (BLOB for UUID, TEXT, INTEGER, REAL)

**Sources:** 
- docs/project/intent.md (project purpose and goals)
- docs/requirements/REQ-330 to REQ-338 (9 feature requirements)
- docs/mock/ (trading dashboard app mock)

**Tables:** db_design_tables.csv (Status: New = proposed by Claude · Feedback = open feedback to apply or answer · Final = accepted)

## Columns

### users

| Column | Type | Null | Default | Key / FK | Index | Constraints | Description |
|---|---|---|---|---|---|---|---|
| id | BLOB | No | | PK | Yes | PRIMARY KEY | UUID generated on signup |
| email | TEXT | No | | UQ | Yes | UNIQUE, NOT NULL | User email for login. Case-insensitive semantically. |
| password_hash | TEXT | No | | | No | NOT NULL | Bcrypt/Argon2 hashed password. Never stored plaintext. |
| created_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | Account creation time |
| updated_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | Last account modification time |

### stocks

| Column | Type | Null | Default | Key / FK | Index | Constraints | Description |
|---|---|---|---|---|---|---|---|
| id | BLOB | No | | PK | Yes | PRIMARY KEY | UUID for stock record |
| symbol | TEXT | No | | UQ | Yes | UNIQUE, NOT NULL | NSE stock symbol (e.g., RELIANCE, TCS). Used for Yahoo Finance lookup. |
| name | TEXT | No | | | No | NOT NULL | Stock company name (e.g., Reliance Industries Limited) |
| sector | TEXT | Yes | | | No | | GICS sector classification (e.g., Energy, IT, Finance) |
| created_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | Stock record creation time |
| updated_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | Last update time |

### price_history

| Column | Type | Null | Default | Key / FK | Index | Constraints | Description |
|---|---|---|---|---|---|---|---|
| id | BLOB | No | | PK | Yes | PRIMARY KEY | UUID for price record |
| stock_id | BLOB | No | | FK -> stocks.id | Yes | Foreign key constraint on delete cascade | Reference to stock |
| date | TEXT | No | | | Yes | NOT NULL, ISO 8601 date | Trading date (YYYY-MM-DD). Unique per stock. |
| open | REAL | Yes | | | No | Price in rupees (nullable if data unavailable) | Opening price for the day |
| high | REAL | Yes | | | No | Price in rupees | Daily high price |
| low | REAL | Yes | | | No | Price in rupees | Daily low price |
| close | REAL | No | | | No | NOT NULL | Closing price (required for indicators and P&L) |
| volume | INTEGER | Yes | | | No | Volume in shares | Trading volume for the day |
| created_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | When price data was cached |
| updated_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | Last refresh time (tracks cache staleness) |

**Unique constraint:** (stock_id, date) to prevent duplicate daily data per stock. Index on (stock_id, date DESC) for efficient lookups of recent data.

### positions

| Column | Type | Null | Default | Key / FK | Index | Constraints | Description |
|---|---|---|---|---|---|---|---|
| id | BLOB | No | | PK | Yes | PRIMARY KEY | UUID for position record |
| user_id | BLOB | No | | FK -> users.id | Yes | Foreign key constraint on delete cascade | Reference to user who owns this position |
| stock_id | BLOB | No | | FK -> stocks.id | Yes | Foreign key constraint on delete cascade | Reference to stock held |
| quantity | INTEGER | No | | | No | NOT NULL, > 0 | Number of shares. Positive integer only. |
| buy_price | REAL | No | | | No | NOT NULL, > 0 | Purchase price per share in rupees. Positive only. |
| buy_date | TEXT | No | | | No | NOT NULL, ISO 8601 date, <= TODAY | Date of purchase (YYYY-MM-DD). No future dates. |
| created_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | When position was recorded |
| updated_at | TEXT | No | CURRENT_TIMESTAMP | | No | Timestamp ISO 8601 | Last modification time |

**No unique constraint on (user_id, stock_id):** Multiple lots of the same stock per user are allowed separately.
**Cascading deletes:** If user or stock deleted, associated positions deleted.
