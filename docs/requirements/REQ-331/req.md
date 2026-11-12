# User Login with Email and Password

## Purpose
Enable retail traders to access their persistent accounts and trading positions securely across sessions using email/password authentication.

## Behaviour
- User navigates to login form
- User enters email and password
- System validates credentials against stored user account
- System creates secure session token/cookie
- User is redirected to dashboard
- Session persists across page navigations and browser closure
- Invalid credentials show error message; account is not disclosed

## Acceptance Criteria
1. Valid credentials log user in and redirect to stock list/dashboard
2. Invalid email or password shows generic error ("Invalid email or password")
3. Session persists across page refresh and closing/reopening browser
4. User can log out and return to login screen
5. Multiple concurrent sessions from different browsers are supported
6. Session expires after inactivity (timeout period TBD)

## Order: 2 of 9
## Depends on: 1 (User Sign Up)

## Source Documents
- Intent: G4 (Secure, persistent access)
- Functional Requirements §2 (Users & Auth)
- Assumptions: ASM-010, ASM-012

## Open Questions
- Session timeout duration (assume 30 minutes, confirm)
- Multi-device session handling (assume all sessions valid, confirm)
- Force logout on password change (defer to future)
