'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScanLine, CheckCircle2, XCircle, Package } from "lucide-react"
import { useAuction } from "@/lib/auction-store"
import { Badge } from "@/components/ui/badge"

export default function ScannerPage() {
    const { orders } = useAuction()
    const [code, setCode] = useState('')
    const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null)
    const [scannedOrder, setScannedOrder] = useState<any>(null)

    const handleSimulateScan = () => {
        // Find an order with this pickup code (case insensitive)
        const foundOrder = orders.find(o => o.pickupCode === code.toUpperCase())

        if (foundOrder) {
            setScannedOrder(foundOrder)
            setScanResult('success')
        } else {
            setScannedOrder(null)
            setScanResult('error')
        }
    }

    // Pre-fill a code for demo purposes if there are orders
    const demoCode = orders.length > 0 ? orders[0].pickupCode : 'DEMO2024'

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">QR Scanner</h1>
                <p className="text-muted-foreground">Scan buyer&apos;s QR code to verify payment and release items.</p>
            </div>

            <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
                <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center">
                        <ScanLine className="h-10 w-10 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Camera View (Simulated)</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Manual Entry</CardTitle>
                    <CardDescription>Enter the 8-character pickup code manually if scanning fails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. X7K9P2M"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="font-mono uppercase tracking-widest text-center text-lg"
                            maxLength={8}
                        />
                        <Button onClick={handleSimulateScan}>Verify</Button>
                    </div>

                    <div className="text-xs text-center text-muted-foreground">
                        Try demo code: <button onClick={() => setCode(demoCode)} className="underline text-blue-500 hover:text-blue-600">{demoCode}</button>
                    </div>
                </CardContent>
            </Card>

            {/* Result Messages */}
            {scanResult === 'success' && scannedOrder && (
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600 shrink-0" />
                            <div className="space-y-1">
                                <h3 className="font-bold text-green-900">Valid Pickup Code!</h3>
                                <p className="text-green-800 text-sm">
                                    Order #{scannedOrder.id} matches.
                                </p>

                                <div className="mt-4 bg-white p-3 rounded border border-green-100 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="h-4 w-4 text-slate-500" />
                                        <span className="font-medium text-slate-900">
                                            Item ID: {scannedOrder.itemId}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Total Paid:</span>
                                        <span className="font-bold text-slate-900">€{scannedOrder.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-slate-500">Status:</span>
                                        <Badge variant={scannedOrder.status === 'paid' ? 'default' : 'destructive'}>
                                            {scannedOrder.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>

                                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                                    Confirm Pickup & Release
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {scanResult === 'error' && (
                <Card className="bg-red-50 border-red-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <XCircle className="h-8 w-8 text-red-600 shrink-0" />
                            <div>
                                <h3 className="font-bold text-red-900">Invalid Code</h3>
                                <p className="text-red-800 text-sm">
                                    Code &quot;{code}&quot; not found. Please check and try again.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
