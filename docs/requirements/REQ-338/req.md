# Edit and Delete Position Lots

## Purpose
Enable traders to maintain accurate position records by editing position details or removing lots no longer relevant to their portfolio.

## Behaviour
- User views positions list
- User can click "Edit" on a lot: modify quantity, buy price, or buy date
- User can click "Delete" on a lot: permanent removal with confirmation
- Changes validated server-side (same rules as entry: positive qty/price, date ≤ today)
- Deletion confirmation prevents accidental loss
- P&L recalculated immediately after edit
- Deleted lot removed from all P&L calculations

## Acceptance Criteria
1. Edit form pre-populates current values
2. Valid edits update lot and recalculate P&L
3. Invalid edits (negative qty, future date) rejected with error
4. Delete shows confirmation ("Really delete this lot?")
5. Confirmed deletion removes lot permanently
6. Deleted lot no longer appears in position list or aggregate calculations

## Order: 9 of 9
## Depends on: 7 (Enter Trading Position), 8 (View Position P&L)

## Source Documents
- Functional Requirements §6.2 (Management)
- Assumptions: ASM-028, Assumptions.md §6.2 (edit/delete support)

## Open Questions
- Undo/recovery for deleted positions (assume not MVP, defer)
- Audit log for position changes (assume not MVP, defer)
