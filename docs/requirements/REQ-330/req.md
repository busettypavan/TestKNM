# User Sign Up with Email and Password

## Purpose
Enable retail traders to create persistent accounts with email/password authentication, establishing identity for storing and managing trading positions across sessions.

## Behaviour
- User accesses the sign-up form
- User enters email and password
- System validates email format (unique, valid email pattern)
- System validates password (minimum 8 characters, contains uppercase, lowercase, number)
- System hashes password securely before storage
- System creates user account in database
- User receives confirmation and is redirected to login
- Duplicate email is rejected with clear error message

## Acceptance Criteria
1. Valid email/password creates an account and user can subsequently log in with same credentials
2. Invalid email format (e.g., no @ symbol) is rejected with error message
3. Short password (< 8 chars) or missing complexity is rejected with specific requirement feedback
4. Duplicate email is rejected as "Email already in use"
5. Password is hashed using industry-standard algorithm (bcrypt/argon2) before database storage
6. User account persists and can be retrieved on login

## Order: 1 of 9
## Depends on: none

## Source Documents
- Intent: G4 (Ensure secure, persistent access to positions and analysis with user authentication)
- Functional Requirements §2 (Users & Auth)
- Assumptions: ASM-009 (Authentication mandatory), ASM-010 (Persistent account), ASM-012 (Secure handling)

## Open Questions
- Password reset/recovery flow (outside MVP scope per assumptions, but may be needed for usability)
- Email verification requirement (assume required for security, confirm)
- Account lockout after failed login attempts (assume not MVP, defer)
