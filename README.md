# Auction Platform Prototype

An interactive auction platform prototype built with Next.js 14, featuring mocked data and a complete auction flow.

## Features

✅ **Item Grid** - Browse active auctions with live countdown timers  
✅ **Item Details** - View detailed item information with image gallery  
✅ **Bidding System** - Place bids with anti-sniping protection  
✅ **Real-time Updates** - Live countdown timers and price updates  
✅ **Multi-language** - Support for English, Polish, Spanish, and Ukrainian  
✅ **Complete Flow** - From browsing to payment to QR code pickup  
✅ **Mock Payment** - Simulated payment process  
✅ **QR Code Generation** - Real QR codes for pickup  

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** React Context (no backend)
- **Data:** Hardcoded mock data
- **i18n:** next-intl (en, pl, es, uk)
- **QR Codes:** qrcode.react

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Demo Flow

1. **Homepage** - Browse auction items with live countdowns
2. **Item Detail** - Click any item to see details
3. **Place Bid** - Use quick bid buttons or enter custom amount
4. **Simulate Win** - Click demo button to jump to winning flow
5. **Payment** - Mock payment page
6. **Success** - View QR code for pickup

## Project Structure

```
/app/[locale]
  /page.tsx              # Homepage with item grid
  /items/[id]/page.tsx   # Item detail page
  /won/page.tsx          # Congratulations page
  /payment/page.tsx      # Mock payment
  /success/page.tsx      # QR code display

/components
  /ui/                   # shadcn/ui components
  /item-card.tsx         # Item card component
  /bid-form.tsx          # Bidding form
  /bid-history.tsx       # Bid history list
  /image-gallery.tsx     # Image carousel
  /qr-display.tsx        # QR code display
  /demo-banner.tsx       # Demo indicator

/lib
  /mock-data.ts          # Mock auction data
  /auction-store.tsx     # React Context state
  /utils.ts              # Utility functions

/messages
  /en.json               # English translations
  /pl.json               # Polish translations
  /es.json               # Spanish translations
  /uk.json               # Ukrainian translations
```

## Language Switching

Access different languages via URL:
- English: http://localhost:3001/en
- Polish: http://localhost:3001/pl
- Spanish: http://localhost:3001/es
- Ukrainian: http://localhost:3001/uk

## Mock Data

All data is simulated and resets on page refresh. The prototype includes:
- 8 auction items with various end times
- Mock bids from different users
- Simulated anti-sniping (extends auction by 2 minutes if bid placed in last 2 minutes)
- Mock payment flow
- Real QR code generation

## What's NOT Included (Prototype Only)

❌ Real database  
❌ User authentication  
❌ Real payments  
❌ Persistent data  
❌ Real-time across users  
❌ Email notifications  
❌ Admin panel  

## Perfect For

- Client presentations
- Testing UI/UX
- Getting feedback before building the real thing
- Demonstrating the complete auction flow

---

**Note:** This is a prototype with mocked data. No real transactions occur.
