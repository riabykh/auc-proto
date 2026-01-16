# AUCTION PLATFORM — INTERACTIVE PROTOTYPE

## Overview

Build a **fully interactive prototype** with mocked data. No database, no real auth, no real payments — just a beautiful, clickable demo that shows the complete auction flow.

Perfect for:
- Client presentations
- Testing the UI/UX
- Getting feedback before building the real thing

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** React useState/useContext (no backend)
- **Data:** Hardcoded mock data + localStorage for persistence
- **i18n:** next-intl (en, pl, es, uk)
- **QR Codes:** qrcode.react

---

## The Demo Flow

```
Homepage → Item Detail → Place Bid → "You Won!" → Payment Page → Success + QR
    ↓
  [Mock countdown that actually counts down]
  [Mock real-time price updates on button click]
  [Mock payment that just redirects]
  [Real QR code generated from mock data]
```

---

## Mock Data Structure

```typescript
// lib/mock-data.ts

export interface Item {
  id: string
  title: string
  description: string
  condition: 'new' | 'open_box' | 'used'
  category: string
  images: string[]
  startingPrice: number
  currentPrice: number
  endsAt: Date
  status: 'active' | 'ended' | 'sold'
  bids: Bid[]
}

export interface Bid {
  id: string
  userId: string
  userName: string
  amount: number
  createdAt: Date
}

export interface Order {
  id: string
  itemId: string
  status: 'pending' | 'paid'
  winningBid: number
  buyersPremium: number
  itemFee: number
  total: number
  pickupCode: string
  pickupDeadline: Date
}

// Mock current user (always "logged in")
export const MOCK_USER = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@example.com'
}

// Generate end times relative to now
const hoursFromNow = (h: number) => new Date(Date.now() + h * 60 * 60 * 1000)
const minutesFromNow = (m: number) => new Date(Date.now() + m * 60 * 1000)

export const MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    title: 'Samsung 55" QLED Smart TV',
    description: 'Brand new in box. 4K resolution, smart features, voice control. Model QN55Q60B. Full manufacturer warranty included.',
    condition: 'new',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800',
    ],
    startingPrice: 1,
    currentPrice: 127,
    endsAt: minutesFromNow(15), // Ends soon - for demo
    status: 'active',
    bids: [
      { id: 'b1', userId: 'user-2', userName: 'Anna K.', amount: 127, createdAt: new Date(Date.now() - 5 * 60000) },
      { id: 'b2', userId: 'user-3', userName: 'Tomek W.', amount: 115, createdAt: new Date(Date.now() - 15 * 60000) },
      { id: 'b3', userId: 'user-4', userName: 'Maria S.', amount: 98, createdAt: new Date(Date.now() - 45 * 60000) },
    ]
  },
  {
    id: 'item-2',
    title: 'DeLonghi Automatic Espresso Machine',
    description: 'Professional quality espresso at home. Built-in grinder, milk frother, programmable settings. Minor box damage, machine is perfect.',
    condition: 'open_box',
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800',
    ],
    startingPrice: 1,
    currentPrice: 89,
    endsAt: hoursFromNow(2),
    status: 'active',
    bids: [
      { id: 'b4', userId: 'user-5', userName: 'Piotr M.', amount: 89, createdAt: new Date(Date.now() - 30 * 60000) },
      { id: 'b5', userId: 'user-6', userName: 'Ewa B.', amount: 75, createdAt: new Date(Date.now() - 2 * 3600000) },
    ]
  },
  {
    id: 'item-3',
    title: 'Apple AirPods Pro (2nd Gen)',
    description: 'Active noise cancellation, spatial audio, MagSafe charging case. Tested and working perfectly.',
    condition: 'open_box',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800',
    ],
    startingPrice: 1,
    currentPrice: 67,
    endsAt: hoursFromNow(5),
    status: 'active',
    bids: [
      { id: 'b6', userId: 'user-7', userName: 'Kasia L.', amount: 67, createdAt: new Date(Date.now() - 1 * 3600000) },
    ]
  },
  {
    id: 'item-4',
    title: 'Nintendo Switch OLED',
    description: 'White edition with enhanced display. Complete in box with all accessories. Adult owned, excellent condition.',
    condition: 'used',
    category: 'Gaming',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800',
    ],
    startingPrice: 1,
    currentPrice: 156,
    endsAt: hoursFromNow(8),
    status: 'active',
    bids: [
      { id: 'b7', userId: 'user-8', userName: 'Michał R.', amount: 156, createdAt: new Date(Date.now() - 20 * 60000) },
      { id: 'b8', userId: 'user-9', userName: 'Zofia K.', amount: 142, createdAt: new Date(Date.now() - 1 * 3600000) },
      { id: 'b9', userId: 'user-10', userName: 'Adam P.', amount: 128, createdAt: new Date(Date.now() - 3 * 3600000) },
    ]
  },
  {
    id: 'item-5',
    title: 'Dyson V15 Detect Vacuum',
    description: 'Latest model with laser dust detection. Powerful suction, long battery life. Box damaged in shipping, vacuum unused.',
    condition: 'new',
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
    ],
    startingPrice: 1,
    currentPrice: 203,
    endsAt: hoursFromNow(12),
    status: 'active',
    bids: [
      { id: 'b10', userId: 'user-11', userName: 'Agata N.', amount: 203, createdAt: new Date(Date.now() - 45 * 60000) },
    ]
  },
  {
    id: 'item-6',
    title: 'Weber Spirit Gas Grill',
    description: '3-burner propane grill. Perfect for backyard BBQs. Never assembled, still in original packaging.',
    condition: 'new',
    category: 'Garden',
    images: [
      'https://images.unsplash.com/photo-1529699310859-cd6566faf554?w=800',
    ],
    startingPrice: 1,
    currentPrice: 78,
    endsAt: hoursFromNow(24),
    status: 'active',
    bids: [
      { id: 'b11', userId: 'user-12', userName: 'Bartek J.', amount: 78, createdAt: new Date(Date.now() - 2 * 3600000) },
    ]
  },
  {
    id: 'item-7',
    title: 'KitchenAid Stand Mixer - Red',
    description: 'Classic 5-quart tilt-head stand mixer. Customer return, tested working. Includes all attachments.',
    condition: 'open_box',
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=800',
    ],
    startingPrice: 1,
    currentPrice: 112,
    endsAt: hoursFromNow(3),
    status: 'active',
    bids: [
      { id: 'b12', userId: 'user-13', userName: 'Dorota W.', amount: 112, createdAt: new Date(Date.now() - 10 * 60000) },
      { id: 'b13', userId: 'user-14', userName: 'Robert K.', amount: 95, createdAt: new Date(Date.now() - 1 * 3600000) },
    ]
  },
  {
    id: 'item-8',
    title: 'Bose QuietComfort Headphones',
    description: 'Premium noise-cancelling over-ear headphones. Black color. Open box, never used.',
    condition: 'open_box',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    ],
    startingPrice: 1,
    currentPrice: 89,
    endsAt: minutesFromNow(45), // Ending soon
    status: 'active',
    bids: [
      { id: 'b14', userId: 'user-15', userName: 'Kamil T.', amount: 89, createdAt: new Date(Date.now() - 8 * 60000) },
      { id: 'b15', userId: 'user-16', userName: 'Natalia S.', amount: 76, createdAt: new Date(Date.now() - 30 * 60000) },
    ]
  },
]

// Pre-made "won" order for demo
export const MOCK_WON_ORDER: Order = {
  id: 'order-demo',
  itemId: 'item-demo',
  status: 'pending',
  winningBid: 127,
  buyersPremium: 19.05,
  itemFee: 2,
  total: 148.05,
  pickupCode: 'DEMO2024',
  pickupDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
}

export const PICKUP_INFO = {
  location: 'ul. Przykładowa 123, 00-001 Warsaw',
  hours: 'Mon-Fri: 10:00-18:00, Sat: 10:00-14:00',
}
```

---

## App Structure

```
/app
  /[locale]
    /layout.tsx              -- Header, providers
    /page.tsx                -- Item grid
    
    /items
      /[id]/page.tsx         -- Item detail + bidding
    
    /won/page.tsx            -- "You won!" demo page
    /payment/page.tsx        -- Mock payment page
    /success/page.tsx        -- QR code page
    
    /dashboard/page.tsx      -- Simple dashboard

/components
  /ui/                       -- shadcn components
  /header.tsx
  /item-card.tsx
  /item-grid.tsx
  /countdown-timer.tsx
  /bid-form.tsx
  /bid-history.tsx
  /image-gallery.tsx
  /qr-display.tsx
  /language-switcher.tsx
  /demo-banner.tsx           -- "This is a demo" notice

/lib
  /mock-data.ts
  /auction-store.ts          -- Simple state management
  /utils.ts

/hooks
  /use-countdown.ts
  /use-auction-state.ts

/messages
  /en.json
  /pl.json  
  /es.json
  /uk.json
```

---

## State Management (No Backend)

```typescript
// lib/auction-store.ts
// Simple React Context for demo state

import { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_ITEMS, MOCK_USER, Item, Bid, Order } from './mock-data'

interface AuctionState {
  items: Item[]
  user: typeof MOCK_USER
  orders: Order[]
  
  // Actions
  placeBid: (itemId: string, amount: number) => void
  simulateWin: (itemId: string) => Order
  markAsPaid: (orderId: string) => void
}

const AuctionContext = createContext<AuctionState | null>(null)

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS)
  const [orders, setOrders] = useState<Order[]>([])
  
  const placeBid = (itemId: string, amount: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        userId: MOCK_USER.id,
        userName: MOCK_USER.name,
        amount,
        createdAt: new Date()
      }
      
      // Anti-sniping: extend if < 2 min left
      let newEndsAt = item.endsAt
      const timeLeft = item.endsAt.getTime() - Date.now()
      if (timeLeft < 2 * 60 * 1000 && timeLeft > 0) {
        newEndsAt = new Date(Date.now() + 2 * 60 * 1000)
      }
      
      return {
        ...item,
        currentPrice: amount,
        endsAt: newEndsAt,
        bids: [newBid, ...item.bids]
      }
    }))
  }
  
  const simulateWin = (itemId: string): Order => {
    const item = items.find(i => i.id === itemId)!
    const winningBid = item.currentPrice
    const buyersPremium = winningBid * 0.15
    const itemFee = 2
    
    const order: Order = {
      id: `order-${Date.now()}`,
      itemId,
      status: 'pending',
      winningBid,
      buyersPremium,
      itemFee,
      total: winningBid + buyersPremium + itemFee,
      pickupCode: generatePickupCode(),
      pickupDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
    
    setOrders(prev => [...prev, order])
    return order
  }
  
  const markAsPaid = (orderId: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'paid' } : o
    ))
  }
  
  return (
    <AuctionContext.Provider value={{
      items,
      user: MOCK_USER,
      orders,
      placeBid,
      simulateWin,
      markAsPaid
    }}>
      {children}
    </AuctionContext.Provider>
  )
}

export const useAuction = () => {
  const ctx = useContext(AuctionContext)
  if (!ctx) throw new Error('useAuction must be used within AuctionProvider')
  return ctx
}

function generatePickupCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}
```

---

## Key Components

### DemoBanner

```tsx
// components/demo-banner.tsx
// Shows at top of page to indicate this is a prototype

export function DemoBanner() {
  return (
    <div className="bg-amber-500 text-amber-950 text-center py-2 text-sm font-medium">
      🎨 Interactive Prototype — All data is simulated
    </div>
  )
}
```

### ItemCard

```tsx
// components/item-card.tsx

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const timeLeft = useCountdown(item.endsAt)
  const isEndingSoon = timeLeft.totalSeconds < 300 // 5 min
  
  return (
    <Link href={`/items/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative">
          <img 
            src={item.images[0]} 
            alt={item.title}
            className="object-cover w-full h-full"
          />
          {isEndingSoon && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Ending soon!
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{item.title}</h3>
          
          <div className="mt-2 flex justify-between items-baseline">
            <div>
              <p className="text-xs text-muted-foreground">Current bid</p>
              <p className="text-xl font-bold">€{item.currentPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Time left</p>
              <p className={cn(
                "font-mono",
                isEndingSoon && "text-red-500 font-bold"
              )}>
                {timeLeft.display}
              </p>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {item.bids.length} bids
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### CountdownTimer Hook

```tsx
// hooks/use-countdown.ts

export function useCountdown(endsAt: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endsAt))
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endsAt))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [endsAt])
  
  return timeLeft
}

function calculateTimeLeft(endsAt: Date) {
  const diff = endsAt.getTime() - Date.now()
  
  if (diff <= 0) {
    return { 
      days: 0, hours: 0, minutes: 0, seconds: 0, 
      totalSeconds: 0,
      display: 'Ended',
      isEnded: true 
    }
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  let display = ''
  if (days > 0) display = `${days}d ${hours}h`
  else if (hours > 0) display = `${hours}h ${minutes}m`
  else display = `${minutes}m ${seconds}s`
  
  return { 
    days, hours, minutes, seconds, 
    totalSeconds: Math.floor(diff / 1000),
    display,
    isEnded: false 
  }
}
```

### BidForm

```tsx
// components/bid-form.tsx

interface BidFormProps {
  item: Item
  onBidPlaced: () => void
}

export function BidForm({ item, onBidPlaced }: BidFormProps) {
  const { placeBid } = useAuction()
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const minBid = item.currentPrice + 1
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const bidAmount = parseFloat(amount)
    if (bidAmount < minBid) {
      toast({ title: 'Bid too low', variant: 'destructive' })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500))
    
    placeBid(item.id, bidAmount)
    toast({ title: '🎉 Bid placed!', description: `You bid €${bidAmount}` })
    setAmount('')
    onBidPlaced()
    
    setIsSubmitting(false)
  }
  
  const quickBid = (increment: number) => {
    setAmount(String(item.currentPrice + increment))
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Your bid</Label>
        <div className="flex gap-2 mt-1">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              €
            </span>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder={String(minBid)}
              className="pl-8"
              min={minBid}
              step="1"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Minimum bid: €{minBid}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => quickBid(1)}
        >
          +€1
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => quickBid(5)}
        >
          +€5
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => quickBid(10)}
        >
          +€10
        </Button>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Placing bid...' : 'Place Bid'}
      </Button>
    </form>
  )
}
```

### QRDisplay

```tsx
// components/qr-display.tsx

import QRCode from 'qrcode.react'

interface QRDisplayProps {
  code: string
  location: string
  hours: string
  deadline: Date
}

export function QRDisplay({ code, location, hours, deadline }: QRDisplayProps) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
        <QRCode 
          value={code} 
          size={200}
          level="H"
        />
      </div>
      
      <p className="text-lg font-medium">
        Show this QR code at pickup
      </p>
      
      <div className="text-left space-y-4 max-w-sm mx-auto">
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium">{location}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Hours</p>
            <p className="font-medium">{hours}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Pickup by</p>
            <p className="font-medium">
              {format(deadline, 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Pages

### Homepage

```tsx
// app/[locale]/page.tsx

export default function HomePage() {
  const { items } = useAuction()
  const t = useTranslations('home')
  
  // Sort: ending soonest first
  const sortedItems = [...items]
    .filter(i => i.status === 'active')
    .sort((a, b) => a.endsAt.getTime() - b.endsAt.getTime())
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {/* Demo helper buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Link href="/won">
          <Button variant="secondary" size="sm">
            Demo: See "You Won" page →
          </Button>
        </Link>
      </div>
    </div>
  )
}
```

### Item Detail

```tsx
// app/[locale]/items/[id]/page.tsx

export default function ItemPage({ params }: { params: { id: string } }) {
  const { items, user } = useAuction()
  const item = items.find(i => i.id === params.id)
  const router = useRouter()
  
  if (!item) return <div>Item not found</div>
  
  const timeLeft = useCountdown(item.endsAt)
  const isUserWinning = item.bids[0]?.userId === user.id
  
  // Demo: button to simulate winning
  const handleSimulateWin = () => {
    router.push(`/won?itemId=${item.id}`)
  }
  
  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          <ImageGallery images={item.images} />
        </div>
        
        {/* Right: Details + Bidding */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary">{item.condition}</Badge>
            <h1 className="text-2xl font-bold mt-2">{item.title}</h1>
          </div>
          
          {/* Price & Timer */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Current bid</p>
                <p className="text-4xl font-bold">€{item.currentPrice}</p>
                <p className="text-sm text-muted-foreground">
                  {item.bids.length} bids
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Time left</p>
                <p className={cn(
                  "text-2xl font-mono font-bold",
                  timeLeft.totalSeconds < 300 && "text-red-500"
                )}>
                  {timeLeft.display}
                </p>
              </div>
            </div>
            
            {isUserWinning && (
              <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-sm font-medium">
                ✓ You're winning!
              </div>
            )}
            
            {!timeLeft.isEnded ? (
              <BidForm item={item} onBidPlaced={() => {}} />
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                This auction has ended
              </div>
            )}
          </Card>
          
          {/* Demo button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleSimulateWin}
          >
            🎬 Demo: Simulate winning this item
          </Button>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
          
          {/* Bid History */}
          <div>
            <h3 className="font-semibold mb-2">Bid History</h3>
            <BidHistory bids={item.bids} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

### "You Won" Page

```tsx
// app/[locale]/won/page.tsx

export default function WonPage({ searchParams }: { searchParams: { itemId?: string } }) {
  const { items, simulateWin } = useAuction()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  
  const item = items.find(i => i.id === searchParams.itemId) || items[0]
  
  useEffect(() => {
    // Create order on mount
    const newOrder = simulateWin(item.id)
    setOrder(newOrder)
  }, [])
  
  if (!order) return <div>Loading...</div>
  
  return (
    <div className="container py-8 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold">Congratulations!</h1>
        <p className="text-muted-foreground mt-2">You won the auction!</p>
      </div>
      
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <img 
            src={item.images[0]} 
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <Badge variant="secondary">{item.condition}</Badge>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Winning bid</span>
            <span>€{order.winningBid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Buyer's premium (15%)</span>
            <span>€{order.buyersPremium.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item fee</span>
            <span>€{order.itemFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>€{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
          ⏰ Pay within 48 hours to secure your item
        </div>
        
        <Button 
          className="w-full mt-6" 
          size="lg"
          onClick={() => router.push(`/payment?orderId=${order.id}`)}
        >
          Pay Now — €{order.total.toFixed(2)}
        </Button>
      </Card>
    </div>
  )
}
```

### Payment Page (Mock)

```tsx
// app/[locale]/payment/page.tsx

export default function PaymentPage() {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  
  const handlePay = async () => {
    setProcessing(true)
    // Fake processing delay
    await new Promise(r => setTimeout(r, 2000))
    router.push('/success')
  }
  
  return (
    <div className="container py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      
      <Card className="p-6">
        <div className="text-center text-muted-foreground mb-6">
          <CreditCard className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>This is a demo — no real payment</p>
        </div>
        
        {/* Fake card form */}
        <div className="space-y-4">
          <div>
            <Label>Card number</Label>
            <Input placeholder="4242 4242 4242 4242" disabled />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expiry</Label>
              <Input placeholder="12/25" disabled />
            </div>
            <div>
              <Label>CVC</Label>
              <Input placeholder="123" disabled />
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full mt-6" 
          size="lg"
          onClick={handlePay}
          disabled={processing}
        >
          {processing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Complete Payment'
          )}
        </Button>
      </Card>
    </div>
  )
}
```

### Success Page (QR Code)

```tsx
// app/[locale]/success/page.tsx

export default function SuccessPage() {
  const pickupCode = 'DEMO2024' // In real app, get from order
  
  return (
    <div className="container py-8 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Payment Confirmed!</h1>
        <p className="text-muted-foreground mt-2">
          Your item is ready for pickup
        </p>
      </div>
      
      <Card className="p-6">
        <QRDisplay
          code={pickupCode}
          location="ul. Przykładowa 123, Warsaw"
          hours="Mon-Fri: 10:00-18:00, Sat: 10:00-14:00"
          deadline={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
        />
      </Card>
      
      <div className="mt-6 flex gap-4">
        <Button variant="outline" className="flex-1">
          Save QR Code
        </Button>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full">
            View Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
```

---

## Translations

```json
// messages/en.json
{
  "common": {
    "back": "Back",
    "loading": "Loading..."
  },
  "demo": {
    "banner": "Interactive Prototype — All data is simulated",
    "simulateWin": "Demo: Simulate winning this item"
  },
  "home": {
    "title": "Current Auctions",
    "endingSoon": "Ending soon!"
  },
  "item": {
    "currentBid": "Current bid",
    "timeLeft": "Time left",
    "bids": "bids",
    "condition": "Condition",
    "description": "Description",
    "bidHistory": "Bid History",
    "yourBid": "Your bid",
    "minimumBid": "Minimum bid: €{amount}",
    "placeBid": "Place Bid",
    "bidPlaced": "Bid placed!",
    "youreWinning": "You're winning!",
    "ended": "This auction has ended"
  },
  "won": {
    "title": "Congratulations!",
    "subtitle": "You won the auction!",
    "winningBid": "Winning bid",
    "buyersPremium": "Buyer's premium (15%)",
    "itemFee": "Item fee",
    "total": "Total",
    "payWithin": "Pay within 48 hours to secure your item",
    "payNow": "Pay Now"
  },
  "payment": {
    "title": "Payment",
    "demoNote": "This is a demo — no real payment",
    "processing": "Processing...",
    "complete": "Complete Payment"
  },
  "success": {
    "title": "Payment Confirmed!",
    "subtitle": "Your item is ready for pickup",
    "showQR": "Show this QR code at pickup",
    "location": "Location",
    "hours": "Hours",
    "pickupBy": "Pickup by",
    "saveQR": "Save QR Code",
    "viewDashboard": "View Dashboard"
  }
}
```

---

## Setup Commands

```bash
# Create project
npx create-next-app@latest auction-prototype --typescript --tailwind --app

cd auction-prototype

# Dependencies
npm install next-intl qrcode.react date-fns lucide-react sonner

# shadcn
npx shadcn@latest init -y
npx shadcn@latest add button input card badge label dialog skeleton toast
```

---

## What This Prototype Includes

| Feature | Status |
|---------|--------|
| Item grid with live countdown | ✅ Real countdowns |
| Item detail page | ✅ Full UI |
| Bidding form | ✅ Updates local state |
| Price updates | ✅ Instant (local) |
| Anti-sniping | ✅ Extends time |
| "You won" page | ✅ Demo flow |
| Payment page | ✅ Mock UI |
| QR code generation | ✅ Real QR codes |
| 4 languages | ✅ Switchable |
| Mobile responsive | ✅ Built-in |

## What's NOT Included (Prototype Only)

| Feature | Status |
|---------|--------|
| Real database | ❌ Uses mock data |
| User authentication | ❌ Always "logged in" |
| Real payments | ❌ Fake checkout |
| Persistent data | ❌ Resets on refresh |
| Real-time across users | ❌ Local only |
| Email notifications | ❌ N/A |
| Admin panel | ❌ Not needed for demo |

---

## Demo Flow for Presentations

1. **Open homepage** — Show item grid with live countdowns
2. **Click an item** — Show detail page with images, bid history
3. **Place a bid** — Watch price update, show toast
4. **Click "Simulate Win"** — Jump to winning flow
5. **Show payment page** — Mock Stripe UI
6. **Complete payment** — See QR code generated
7. **Switch language** — Show i18n working

Total demo time: ~2 minutes

---

This prototype is perfect for showing clients the UX before building the real thing!
