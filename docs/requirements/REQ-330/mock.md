# Sign Up Flow

```
┌─────────────────────────────────────┐
│     Stock Analyzer Dashboard        │
│                                     │
│  Already have an account? Log in    │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  SIGN UP                         ││
│  ├─────────────────────────────────┤│
│  │                                  ││
│  │  Email Address                   ││
│  │  [___________________________]    ││
│  │                                  ││
│  │  Password                        ││
│  │  [___________________________]    ││
│  │  (min 8 chars, 1 uppercase,     ││
│  │   1 lowercase, 1 number)         ││
│  │                                  ││
│  │  Confirm Password                ││
│  │  [___________________________]    ││
│  │                                  ││
│  │         [  SIGN UP  ]            ││
│  │                                  ││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘


Error State (Duplicate Email):
┌─────────────────────────────────────┐
│  ⚠ Email already in use             │
│  Please log in or use another email │
└─────────────────────────────────────┘

Error State (Weak Password):
┌─────────────────────────────────────┐
│  ⚠ Password must contain:           │
│    • At least 8 characters          │
│    • 1 uppercase letter (A-Z)       │
│    • 1 lowercase letter (a-z)       │
│    • 1 number (0-9)                 │
└─────────────────────────────────────┘

Success State:
┌─────────────────────────────────────┐
│  ✓ Account created successfully!    │
│  Redirecting to login...            │
└─────────────────────────────────────┘
```
