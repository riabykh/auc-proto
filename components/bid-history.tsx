'use client'

import { Bid } from '@/lib/mock-data'
import { format } from 'date-fns'

interface BidHistoryProps {
    bids: Bid[]
}

export function BidHistory({ bids }: BidHistoryProps) {
    if (bids.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">No bids yet</p>
        )
    }

    return (
        <div className="space-y-2">
            {bids.map((bid) => (
                <div key={bid.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                        <p className="font-medium">{bid.userName}</p>
                        <p className="text-xs text-muted-foreground">
                            {format(bid.createdAt, 'MMM d, HH:mm')}
                        </p>
                    </div>
                    <p className="font-bold">€{bid.amount}</p>
                </div>
            ))}
        </div>
    )
}
