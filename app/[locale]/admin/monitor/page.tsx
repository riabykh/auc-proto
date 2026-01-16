'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuction } from "@/lib/auction-store"
import { Users, Gavel, Timer, TrendingUp, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function LiveMonitorPage() {
    const { items } = useAuction()
    const activeItems = items.filter(i => i.status === 'active')
    const [now, setNow] = useState(new Date())

    // Update timer every second for countdowns
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(interval)
    }, [])

    // Sort by ending soonest
    const sortedItems = [...activeItems].sort((a, b) =>
        a.endsAt.getTime() - b.endsAt.getTime()
    )

    const getRecentBids = () => {
        return items
            .flatMap(item => item.bids.map(bid => ({ ...bid, itemTitle: item.title })))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 5)
    }

    const recentBids = getRecentBids()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Live Auction Monitor</h1>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
                        <Gavel className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeItems.length}</div>
                        <p className="text-xs text-muted-foreground">in progress right now</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ending in &lt; 1h</CardTitle>
                        <Timer className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {activeItems.filter(i => (i.endsAt.getTime() - now.getTime()) < 60 * 60 * 1000).length}
                        </div>
                        <p className="text-xs text-muted-foreground">urgent attention needed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bids Today</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {items.reduce((acc, item) => acc + item.bids.length, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Live Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            €{items.reduce((acc, item) => acc + (item.bids.length > 0 ? item.currentPrice : 0), 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">current high bids total</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Active Auctions Feed */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Ending Soonest</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {sortedItems.slice(0, 5).map(item => {
                                const timeLeft = Math.max(0, item.endsAt.getTime() - now.getTime())
                                const minutes = Math.floor(timeLeft / 60000)
                                const seconds = Math.floor((timeLeft % 60000) / 1000)
                                const isUrgent = timeLeft < 5 * 60 * 1000

                                return (
                                    <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="space-y-1">
                                            <p className="font-medium leading-none">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Current Bid: <span className="text-blue-600 font-bold">€{item.currentPrice}</span>
                                                <span className="mx-2">•</span>
                                                {item.bids.length} bids
                                            </p>
                                        </div>
                                        <Badge variant={isUrgent ? "destructive" : "secondary"} className="font-mono">
                                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                        </Badge>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Live Ticker */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Live Bid Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentBids.map(bid => (
                                <div key={bid.id} className="flex items-start gap-4">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            {bid.userName} bid €{bid.amount}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            on {bid.itemTitle}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {bid.createdAt.toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {recentBids.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                                    <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
                                    <p>No bids yet today.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
