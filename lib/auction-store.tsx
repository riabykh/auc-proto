'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_ITEMS, MOCK_USER, MOCK_ADMIN, Item, Bid, Order, User, UserRole } from './mock-data'

interface AuctionState {
    items: Item[]
    user: User
    orders: Order[]
    watchlist: string[]

    // Actions
    placeBid: (itemId: string, amount: number) => void
    simulateWin: (itemId: string) => Order
    markAsPaid: (orderId: string) => void
    addToWatchlist: (itemId: string) => void
    removeFromWatchlist: (itemId: string) => void
    isInWatchlist: (itemId: string) => boolean
    switchUser: (role: UserRole) => void

    // Admin Actions
    toggleItemStatus: (itemId: string) => void
}

const AuctionContext = createContext<AuctionState | null>(null)

export function AuctionProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Item[]>(MOCK_ITEMS)
    const [orders, setOrders] = useState<Order[]>([])
    const [watchlist, setWatchlist] = useState<string[]>([])
    const [user, setUser] = useState<User>(MOCK_USER)

    const placeBid = (itemId: string, amount: number) => {
        setItems(prev => prev.map(item => {
            if (item.id !== itemId) return item

            const newBid: Bid = {
                id: `bid-${Date.now()}`,
                userId: user.id,
                userName: user.name,
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
            o.id === orderId ? { ...o, status: 'paid' as const } : o
        ))
    }

    const addToWatchlist = (itemId: string) => {
        setWatchlist(prev => [...prev, itemId])
    }

    const removeFromWatchlist = (itemId: string) => {
        setWatchlist(prev => prev.filter(id => id !== itemId))
    }

    const isInWatchlist = (itemId: string) => {
        return watchlist.includes(itemId)
    }

    const switchUser = (role: UserRole) => {
        setUser(role === 'admin' ? MOCK_ADMIN : MOCK_USER)
    }

    const toggleItemStatus = (itemId: string) => {
        setItems(prev => prev.map(item => {
            if (item.id !== itemId) return item

            const newStatus = item.status === 'paused' ? 'active' : 'paused'
            return { ...item, status: newStatus as any }
        }))
    }

    return (
        <AuctionContext.Provider value={{
            items,
            user,
            orders,
            watchlist,
            placeBid,
            simulateWin,
            markAsPaid,
            addToWatchlist,
            removeFromWatchlist,
            isInWatchlist,
            switchUser,
            toggleItemStatus
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
