'use client'

import { useAuction } from '@/lib/auction-store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import { TrendingUp, TrendingDown, Trophy } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

export default function MyBidsPage() {
    const { items, user } = useAuction()
    const t = useTranslations('myBids')

    // Find items where user has bid
    const myBids = items.filter(item =>
        item.bids.some(bid => bid.userId === user.id)
    ).map(item => {
        const myBid = item.bids.find(bid => bid.userId === user.id)!
        const isWinning = item.bids[0]?.userId === user.id
        const isEnded = item.endsAt.getTime() < Date.now()

        return {
            item,
            myBid,
            isWinning,
            isEnded,
            status: isEnded ? (isWinning ? 'won' : 'lost') : (isWinning ? 'winning' : 'outbid')
        }
    })

    const activeBids = myBids.filter(b => !b.isEnded)
    const wonBids = myBids.filter(b => b.status === 'won')
    const lostBids = myBids.filter(b => b.status === 'lost')

    const BidCard = ({ bidInfo }: { bidInfo: typeof myBids[0] }) => (
        <Link href={`/items/${bidInfo.item.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={bidInfo.item.images[0]}
                            alt={bidInfo.item.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold truncate">{bidInfo.item.title}</h3>
                            {bidInfo.status === 'winning' && (
                                <Badge className="bg-green-500 gap-1 flex-shrink-0">
                                    <TrendingUp className="w-3 h-3" />
                                    {t('winning')}
                                </Badge>
                            )}
                            {bidInfo.status === 'outbid' && (
                                <Badge variant="destructive" className="gap-1 flex-shrink-0">
                                    <TrendingDown className="w-3 h-3" />
                                    {t('outbid')}
                                </Badge>
                            )}
                            {bidInfo.status === 'won' && (
                                <Badge className="bg-yellow-500 gap-1 flex-shrink-0">
                                    <Trophy className="w-3 h-3" />
                                    {t('won')}
                                </Badge>
                            )}
                        </div>

                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Your bid:</span>
                                <span className="font-medium">€{bidInfo.myBid.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Current price:</span>
                                <span className="font-bold">€{bidInfo.item.currentPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-muted-foreground">
                    Track all your bids in one place
                </p>
            </div>

            {myBids.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t('empty')}</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Start bidding on items to see them here
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Active Bids */}
                    {activeBids.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">{t('active')}</h2>
                            <div className="grid gap-4">
                                {activeBids.map(bidInfo => (
                                    <BidCard key={bidInfo.item.id} bidInfo={bidInfo} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Won Bids */}
                    {wonBids.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">{t('won')}</h2>
                            <div className="grid gap-4">
                                {wonBids.map(bidInfo => (
                                    <BidCard key={bidInfo.item.id} bidInfo={bidInfo} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lost Bids */}
                    {lostBids.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">{t('lost')}</h2>
                            <div className="grid gap-4 opacity-60">
                                {lostBids.map(bidInfo => (
                                    <BidCard key={bidInfo.item.id} bidInfo={bidInfo} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
