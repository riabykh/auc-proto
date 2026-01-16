'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuction } from "@/lib/auction-store"
import { BarChart, LineChart, PieChart, Activity } from "lucide-react"

export default function ReportsPage() {
    const { items, orders } = useAuction()

    const totalSales = orders.reduce((acc, order) => acc + order.total, 0)
    const paidOrders = orders.filter(o => o.status === 'paid').length
    const pickupRate = orders.length > 0 ? (paidOrders / orders.length) * 100 : 0

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Sales Overview */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Sales Overview (Past 30 Days)</CardTitle>
                        <CardDescription>Daily revenue from completed auctions.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 border rounded-md m-6 border-dashed">
                        <div className="text-center text-muted-foreground p-4">
                            <BarChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                            <p>Chart Visualization Placeholder</p>
                            <p className="text-sm">Simulated Data: Trending Upwards ↗</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">€{totalSales.toFixed(2)}</div>
                            <p className="text-xs text-green-600 mt-1">+15% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Selling Price</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">€142.50</div>
                            <p className="text-xs text-slate-500 mt-1">Based on {orders.length} orders</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pickup Completion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{pickupRate.toFixed(1)}%</div>
                            <p className="text-xs text-slate-500 mt-1">Orders picked up on time</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center bg-slate-50 border rounded-md m-6 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <PieChart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Category Distribution</p>
                            <div className="text-xs mt-2 space-x-2">
                                <span className="text-blue-600">● Electronics (45%)</span>
                                <span className="text-green-600">● Home (30%)</span>
                                <span className="text-orange-600">● Other (25%)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Bid Activity Volume</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center bg-slate-50 border rounded-md m-6 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Bid Traffic (Hourly)</p>
                            <p className="text-xs">Peak times: 18:00 - 21:00</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
