'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Item } from '@/lib/mock-data'
import { useCountdown } from '@/hooks/use-countdown'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Clock, TrendingUp } from 'lucide-react'

interface ItemCardProps {
    item: Item
}

export function ItemCard({ item }: ItemCardProps) {
    const timeLeft = useCountdown(item.endsAt)
    const isEndingSoon = timeLeft.totalSeconds < 300 // 5 min

    return (
        <Link href={`/items/${item.id}`}>
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-[1.02]">
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {isEndingSoon && !timeLeft.isEnded && (
                            <Badge className="bg-red-500 text-white shadow-lg animate-pulse">
                                Ending soon!
                            </Badge>
                        )}
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                            {item.condition}
                        </Badge>
                    </div>

                    {/* Time Left Badge */}
                    <div className="absolute bottom-3 left-3">
                        <div className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md",
                            isEndingSoon && !timeLeft.isEnded
                                ? "bg-red-500/90 text-white"
                                : "bg-white/90 text-slate-900"
                        )}>
                            <Clock className="w-3 h-3" />
                            {timeLeft.display}
                        </div>
                    </div>
                </div>

                <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg overflow-hidden group-hover:text-primary transition-colors" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {item.title}
                    </h3>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Current bid</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                €{item.currentPrice}
                            </p>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <TrendingUp className="w-3 h-3" />
                            <span>{item.bids.length} bids</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
