'use client'

import { useState } from 'react'
import { Item } from '@/lib/mock-data'
import { useAuction } from '@/lib/auction-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Radio } from 'lucide-react'

interface BidFormProps {
    item: Item
    onBidPlaced?: () => void
}

export function BidForm({ item, onBidPlaced }: BidFormProps) {
    const { placeBid } = useAuction()
    const [amount, setAmount] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const minBid = item.currentPrice + 1

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const bidAmount = parseFloat(amount)
        if (bidAmount < minBid) {
            toast.error('Bid too low', {
                description: `Minimum bid is €${minBid}`
            })
            return
        }

        setIsSubmitting(true)

        // Simulate network delay
        await new Promise(r => setTimeout(r, 500))

        placeBid(item.id, bidAmount)
        toast.success('🎉 Bid placed!', {
            description: `You bid €${bidAmount}`
        })
        setAmount('')
        onBidPlaced?.()

        setIsSubmitting(false)
    }

    const quickBid = (increment: number) => {
        setAmount(String(item.currentPrice + increment))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Live Indicator */}
            <div className="flex items-center justify-center gap-2 py-2 bg-green-50 rounded-lg border border-green-200">
                <Radio className="w-4 h-4 text-green-600 animate-pulse" />
                <span className="text-sm font-medium text-green-700">Live Bidding</span>
                <Badge variant="secondary" className="text-xs">Real-time updates</Badge>
            </div>

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
                            className="pl-8 h-12 text-lg"
                            min={minBid}
                            step="1"
                        />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Minimum bid: €{minBid}
                </p>
            </div>

            {/* Quick Bid Buttons - Touch Optimized */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold"
                    onClick={() => quickBid(1)}
                >
                    +€1
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold"
                    onClick={() => quickBid(5)}
                >
                    +€5
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold"
                    onClick={() => quickBid(10)}
                >
                    +€10
                </Button>
            </div>

            <Button
                type="submit"
                className="w-full h-14 text-lg font-bold"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Placing bid...' : 'Place Bid'}
            </Button>
        </form>
    )
}
