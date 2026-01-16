'use client'

import { useAuction } from '@/lib/auction-store'
import { useCountdown } from '@/hooks/use-countdown'
import { ImageGallery } from '@/components/image-gallery'
import { BidForm } from '@/components/bid-form'
import { BidHistory } from '@/components/bid-history'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import {
    Shield,
    Truck,
    MapPin,
    Clock,
    TrendingUp,
    Eye,
    Heart,
    Share2,
    AlertCircle
} from 'lucide-react'

export default function ItemPage({ params }: { params: { id: string } }) {
    const { items, user, isInWatchlist, addToWatchlist, removeFromWatchlist } = useAuction()
    const item = items.find(i => i.id === params.id)
    const router = useRouter()
    const t = useTranslations('item')


    if (!item) return <div className="container py-8">Item not found</div>

    const timeLeft = useCountdown(item.endsAt)
    const isUserWinning = item.bids[0]?.userId === user.id
    const isEndingSoon = timeLeft.totalSeconds < 300

    // Demo: button to simulate winning
    const handleSimulateWin = () => {
        router.push(`/won?itemId=${item.id}`)
    }

    // Mock data for auction best practices
    const viewCount = 127
    const watchlistCount = 23

    return (
        <div className="container py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-muted-foreground mb-6">
                <span>Home</span> / <span>{item.category}</span> / <span className="text-foreground">{item.title}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Images */}
                <div className="lg:col-span-2 space-y-6">
                    <ImageGallery images={item.images} />

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4 text-center">
                            <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
                            <p className="text-sm font-medium">Verified Item</p>
                            <p className="text-xs text-muted-foreground">Authenticated</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                            <p className="text-sm font-medium">Free Shipping</p>
                            <p className="text-xs text-muted-foreground">On this item</p>
                        </Card>
                        <Card className="p-4 text-center">
                            <MapPin className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                            <p className="text-sm font-medium">Local Pickup</p>
                            <p className="text-xs text-muted-foreground">Available</p>
                        </Card>
                    </div>

                    {/* Description */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Description</h2>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Condition</p>
                                <Badge variant="secondary" className="mt-1">{item.condition}</Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Category</p>
                                <p className="mt-1">{item.category}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Starting Price</p>
                                <p className="mt-1 font-semibold">€{item.startingPrice}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Item Location</p>
                                <p className="mt-1">Warsaw, Poland</p>
                            </div>
                        </div>
                    </Card>

                    {/* Bid History */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Bid History ({item.bids.length})</h2>
                        <BidHistory bids={item.bids} />
                    </Card>
                </div>

                {/* Right Column - Bidding */}
                <div className="space-y-4">
                    {/* Sticky Bid Panel */}
                    <div className="lg:sticky lg:top-24 space-y-4">
                        {/* Title and Actions */}
                        <div>
                            <h1 className="text-2xl font-bold mb-3">{item.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{viewCount} views</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{watchlistCount} watching</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                            <Button
                                variant={isInWatchlist(item.id) ? "default" : "outline"}
                                size="sm"
                                className="flex-1 gap-2 min-h-[44px]"
                                onClick={() => {
                                    if (isInWatchlist(item.id)) {
                                        removeFromWatchlist(item.id)
                                        toast.success('Removed from watchlist')
                                    } else {
                                        addToWatchlist(item.id)
                                        toast.success('Added to watchlist')
                                    }
                                }}
                            >
                                <Heart className={cn("w-4 h-4", isInWatchlist(item.id) && "fill-current")} />
                                {isInWatchlist(item.id) ? 'Watching' : 'Watch'}
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 gap-2 min-h-[44px]">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                        </div>

                        {/* Price & Timer Card */}
                        <Card className="p-6 border-2">
                            {isEndingSoon && !timeLeft.isEnded && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-red-900">Ending Soon!</p>
                                        <p className="text-sm text-red-700">Place your bid now</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">{t('currentBid')}</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        €{item.currentPrice}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>{item.bids.length} {t('bids')}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-muted rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-muted-foreground" />
                                            <span className="text-sm font-medium">{t('timeLeft')}</span>
                                        </div>
                                        <p className={cn(
                                            "text-xl font-bold font-mono",
                                            isEndingSoon && !timeLeft.isEnded && "text-red-500"
                                        )}>
                                            {timeLeft.display}
                                        </p>
                                    </div>
                                </div>

                                {isUserWinning && !timeLeft.isEnded && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        ✓ {t('youreWinning')}
                                    </div>
                                )}

                                {!timeLeft.isEnded ? (
                                    <BidForm item={item} />
                                ) : (
                                    <div className="text-center py-4 text-muted-foreground">
                                        {t('ended')}
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Seller Info */}
                        <Card className="p-4">
                            <h3 className="font-semibold mb-3">Seller Information</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                    AS
                                </div>
                                <div>
                                    <p className="font-medium">AuctionStore</p>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <span className="text-yellow-500">★★★★★</span>
                                        <span>(4.9)</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                98.5% positive feedback • 1,234 sales
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
