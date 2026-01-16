'use client'

import { useAuction } from '@/lib/auction-store'
import { ItemCard } from '@/components/item-card'
import { useTranslations } from 'next-intl'
import { Heart } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export default function WatchlistPage() {
    const { items, watchlist } = useAuction()
    const t = useTranslations('watchlist')

    // Get items that are in the watchlist
    const watchlistItems = items.filter(item => watchlist.includes(item.id))

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-muted-foreground">
                    Keep track of items you&apos;re interested in
                </p>
            </div>

            {watchlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Heart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t('empty')}</h3>
                    <p className="text-muted-foreground max-w-sm mb-6">
                        {t('emptyDescription')}
                    </p>
                    <Link href="/">
                        <Button>Browse Auctions</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {watchlistItems.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}
