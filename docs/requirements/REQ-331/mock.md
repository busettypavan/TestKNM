# Login Flow

```
┌─────────────────────────────────────┐
│     Stock Analyzer Dashboard        │
│                                     │
│  Don't have an account? Sign up     │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  LOGIN                           ││
│  ├─────────────────────────────────┤│
│  │                                  ││
│  │  Email Address                   ││
│  │  [___________________________]    ││
│  │                                  ││
│  │  Password                        ││
│  │  [___________________________]    ││
│  │                                  ││
│  │  ☐ Remember Me                   ││
│  │                                  ││
│  │       [   LOGIN   ]              ││
│  │                                  ││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘

Error State (Invalid Credentials):
┌─────────────────────────────────────┐
│  ⚠ Invalid email or password        │
│  Please try again                   │
└─────────────────────────────────────┘

After Login → Redirects to:
Dashboard with Stock List
```
