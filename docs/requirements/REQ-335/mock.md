# Moving Average Crossover Signals

```
Strategy Control:
┌──────────────────────────────────────┐
│ ☑ MA Crossover Strategy              │
│ MA Period: [50-day SMA]              │
│          ↓                           │
│ [Apply]                              │
└──────────────────────────────────────┘

Chart with Signals:
    3000  │
          │    ╭╮ ⬇️ SELL
   2750   │   ╭╯╰╮    (Price crosses below MA)
          │  ╭╯  ╰╮  ╭╮ ⬆️ BUY
   2500   │ ╭╯    ╰╮╭╯╰╮ (Price crosses above MA)
          │
   2250   │
          │ [50-day SMA shown as blue line]
   2000   │
    ─────────────────────────────────
       Nov   Dec   Jan   Feb   Mar

Legend:
⬆️ Buy Signal (price > MA)
⬇️ Sell Signal (price < MA)
```
