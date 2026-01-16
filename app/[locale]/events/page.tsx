'use client'

import { AUCTION_EVENTS } from '@/lib/auction-events'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/use-countdown'
import { MapPin, Clock, Package } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export default function AuctionEventsPage() {
    // Group events by location
    const eventsByLocation = AUCTION_EVENTS.reduce((acc, event) => {
        const location = event.location
        if (!acc[location]) {
            acc[location] = []
        }
        acc[location].push(event)
        return acc
    }, {} as Record<string, typeof AUCTION_EVENTS>)

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Auction Events</h1>
                <p className="text-muted-foreground">
                    Browse auctions by location and pickup point
                </p>
            </div>

            {/* Location Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                <Button variant="default" className="gap-2 whitespace-nowrap">
                    <MapPin className="w-4 h-4" />
                    All Locations
                </Button>
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                    🇪🇸 Alicante, Spain
                </Button>
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                    🇵🇱 Warsaw, Poland
                </Button>
            </div>

            <div className="space-y-6">
                {Object.entries(eventsByLocation).map(([location, events]) => (
                    <div key={location}>
                        {/* Location Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{location}</h2>
                                <p className="text-sm text-muted-foreground">{events.length} active auctions</p>
                            </div>
                        </div>

                        {/* Auction Events */}
                        <div className="space-y-4">
                            {events.map((event) => (
                                <AuctionEventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AuctionEventCard({ event }: { event: typeof AUCTION_EVENTS[0] }) {
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
                return 'Closing Soon'
            case 'active':
                return 'Bidding Open'
            case 'upcoming':
                return 'Upcoming'
            default:
                return 'Closed'
        }
    }

    return (
        <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-blue-600">{event.title}</h3>
                            <Badge className={cn(getStatusColor(), "text-white")}>
                                {getStatusText()}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{event.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        {event.status === 'closing' ? (
                            <div className="text-red-600">
                                <p className="text-xs font-medium uppercase">Closing In</p>
                                <p className="text-2xl font-bold font-mono">{timeLeft.display}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase">Starts In</p>
                                <p className="text-lg font-bold font-mono">{timeLeft.display}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Horizontal Item Thumbnails */}
                <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{event.items.length} Items in this auction</span>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {event.items.map((item) => (
                            <Link
                                key={item.id}
                                href={`/items/${item.id}`}
                                className="flex-shrink-0 group"
                            >
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <p className="text-xs mt-1 text-center font-medium truncate w-24">
                                    €{item.currentPrice}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-3">
                        <Link href={`/events/${event.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                                View All Items
                            </Button>
                        </Link>
                        <Button className="flex-1 gap-2">
                            <Clock className="w-4 h-4" />
                            Place Bids
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
