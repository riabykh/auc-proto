'use client'

import { AUCTION_EVENTS } from '@/lib/auction-events'
import { ItemCard } from '@/components/item-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/use-countdown'
import { MapPin, Clock, ArrowLeft, Calendar } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export default function EventDetailPage({ params }: { params: { id: string } }) {
    const event = AUCTION_EVENTS.find(e => e.id === params.id)

    if (!event) {
        return (
            <div className="container py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
                <Link href="/">
                    <Button>Back to Auctions</Button>
                </Link>
            </div>
        )
    }

    const timeLeft = useCountdown(event.startTime)

    const getStatusColor = () => {
        switch (event.status) {
            case 'closing':
                return 'bg-red-500'
            case 'active':
                return 'bg-green-500'
            case 'upcoming':
                return 'bg-blue-500'
            default:
                return 'bg-gray-500'
        }
    }

    const getStatusText = () => {
        switch (event.status) {
            case 'closing':
                return 'Accepting Final Bids'
            case 'active':
                return 'Bidding Open'
            case 'upcoming':
                return 'Upcoming'
            default:
                return 'Closed'
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container py-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Auctions
                    </Link>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-blue-600 mb-3">{event.title}</h1>
                            <div className="flex flex-col gap-2 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-medium">Pickup Location:</span>
                                    <span>{event.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="font-medium">Location:</span>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge className={cn(getStatusColor(), "text-white px-4 py-2 text-base")}>
                                {getStatusText()}
                            </Badge>

                            {event.status === 'closing' ? (
                                <div className="text-right">
                                    <p className="text-xs text-red-600 font-medium uppercase">Closing</p>
                                    <p className="text-2xl font-bold text-red-600 font-mono">{timeLeft.display}</p>
                                </div>
                            ) : event.status === 'active' ? (
                                <div className="text-right">
                                    <p className="text-xs text-green-600 font-medium uppercase">Starts Closing In</p>
                                    <p className="text-2xl font-bold text-green-600 font-mono">{timeLeft.display}</p>
                                </div>
                            ) : (
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Starts In</p>
                                    <p className="text-2xl font-bold font-mono">{timeLeft.display}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div className="container py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">All Items ({event.items.length})</h2>
                    <p className="text-muted-foreground">
                        Browse all items available in this auction event
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {event.items.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
