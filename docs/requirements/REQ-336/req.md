# Manually Enter Trading Positions

## Purpose
Enable traders to record their trading positions for P&L tracking. Each position entry represents a separate lot and persists across sessions.

## Behaviour
- User navigates to positions/portfolio view
- User clicks "Add Position" and fills form: stock symbol, quantity, buy price, buy date
- System validates inputs (positive quantity/price, date ≤ today, stock exists)
- System stores position linked to authenticated user
- Confirmation message displayed; position added to list
- Multiple lots of same stock are stored separately

## Acceptance Criteria
1. Valid position input creates record and displays in position list
2. Invalid stock symbol rejected with error
3. Negative/zero quantity rejected
4. Negative/zero buy price rejected
5. Future buy date rejected
6. Multiple lots of same stock stored separately
7. Position persists after logout/login

## Order: 7 of 9
## Depends on: 2 (User Login)

## Source Documents
- Intent: G3 (Track manual positions)
- Functional Requirements §4.3, §3 (Position)
- Assumptions: ASM-006, ASM-022, ASM-023, ASM-028

## Open Questions
- Position list view pagination (assume initial 10 per page, confirm)
