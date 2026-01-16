'use client'

import { useState } from 'react'
import { AUCTION_EVENTS } from '@/lib/auction-events'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCountdown } from '@/hooks/use-countdown'
import { MapPin, Clock, Package, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

type TabType = 'current' | 'upcoming' | 'closed'

export default function HomePage() {
    const [selectedTab, setSelectedTab] = useState<TabType>('current')
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

    // Filter by status tab
    const getFilteredByStatus = () => {
        switch (selectedTab) {
            case 'current':
                return AUCTION_EVENTS.filter(e => e.status === 'active' || e.status === 'closing')
            case 'upcoming':
                return AUCTION_EVENTS.filter(e => e.status === 'upcoming')
            case 'closed':
                return AUCTION_EVENTS.filter(e => e.status === 'closed')
            default:
                return AUCTION_EVENTS
        }
    }

    const statusFilteredEvents = getFilteredByStatus()

    // Get unique locations from filtered events
    const locations = Array.from(new Set(statusFilteredEvents.map(e => e.location)))

    // Apply location filter
    const filteredEvents = selectedLocation
        ? statusFilteredEvents.filter(e => e.location === selectedLocation)
        : statusFilteredEvents

    const getTabTitle = () => {
        switch (selectedTab) {
            case 'upcoming': return 'Upcoming Auctions'
            case 'closed': return 'Closed Auctions'
            default: return 'Current Auctions'
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
                <div className="container py-12">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {getTabTitle()}
                        </h1>
                        <p className="text-xl text-blue-100">
                            {selectedTab === 'current' && 'Browse live auctions by location. Bid now and pick up locally.'}
                            {selectedTab === 'upcoming' && 'Preview upcoming auctions. Set reminders to never miss a deal.'}
                            {selectedTab === 'closed' && 'View past auction results and winning bids.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Tabs + Location Tabs */}
            <div className="border-b bg-white sticky top-16 z-30 shadow-sm">
                <div className="container">
                    <div className="flex gap-1 overflow-x-auto">
                        {/* Status Tabs */}
                        <button
                            onClick={() => { setSelectedTab('current'); setSelectedLocation(null) }}
                            className={cn(
                                "px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors",
                                selectedTab === 'current'
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Current Auctions
                        </button>
                        {locations.map((location) => (
                            <button
                                key={location}
                                onClick={() => setSelectedLocation(selectedLocation === location ? null : location)}
                                className={cn(
                                    "px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2",
                                    selectedLocation === location
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {location === 'Alicante, Spain' ? '🇪🇸' : '🇵🇱'}
                                {location}
                            </button>
                        ))}
                        <button
                            onClick={() => { setSelectedTab('upcoming'); setSelectedLocation(null) }}
                            className={cn(
                                "px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors",
                                selectedTab === 'upcoming'
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Upcoming Auctions
                        </button>
                        <button
                            onClick={() => { setSelectedTab('closed'); setSelectedLocation(null) }}
                            className={cn(
                                "px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors",
                                selectedTab === 'closed'
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Closed Auctions
                        </button>
                    </div>
                </div>
            </div>

            {/* Auction Events List */}
            <div className="bg-white">
                <div className="container px-0">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg text-muted-foreground">No auctions found</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filteredEvents.map((event, index) => (
                                <AuctionEventRow key={event.id} event={event} isEven={index % 2 === 0} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


function AuctionEventRow({ event, isEven }: { event: typeof AUCTION_EVENTS[0], isEven: boolean }) {
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
        <div className={cn(
            "hover:bg-accent/30 transition-colors",
            isEven ? "bg-white" : "bg-slate-50/50"
        )}>
            <div className="container py-5">
                <div className="flex items-start justify-between mb-4">
                    {/* Left: Event Info */}
                    <div className="flex-1">
                        <Link href={`/events/${event.id}`} className="group">
                            <h3 className="text-lg font-bold text-blue-600 group-hover:text-blue-700 mb-1">
                                {event.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>Pickup Address: {event.address}</span>
                        </div>
                    </div>

                    {/* Right: Status & Timer */}
                    <div className="flex items-center gap-4">
                        <Badge className={cn(getStatusColor(), "text-white px-4 py-1.5")}>
                            {getStatusText()}
                        </Badge>

                        {event.status === 'closing' ? (
                            <div className="text-right min-w-[140px]">
                                <p className="text-xs text-red-600 font-medium uppercase">Closing</p>
                                <p className="text-lg font-bold text-red-600 font-mono">{timeLeft.display}</p>
                            </div>
                        ) : event.status === 'active' ? (
                            <div className="text-right min-w-[140px]">
                                <p className="text-xs text-green-600 font-medium uppercase">Starts Closing In</p>
                                <p className="text-lg font-bold text-green-600 font-mono">{timeLeft.display}</p>
                            </div>
                        ) : (
                            <div className="text-right min-w-[140px]">
                                <p className="text-xs text-muted-foreground font-medium uppercase">Starts In</p>
                                <p className="text-lg font-bold font-mono">{timeLeft.display}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Horizontal Item Thumbnails */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-3 flex-1 overflow-x-auto pb-2">
                        {event.items.map((item) => (
                            <Link
                                key={item.id}
                                href={`/items/${item.id}`}
                                className="flex-shrink-0 group relative"
                            >
                                <div className="relative w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all group-hover:shadow-lg">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Link href={`/events/${event.id}`}>
                        <Button variant="outline" className="gap-2 whitespace-nowrap">
                            View All Items
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
