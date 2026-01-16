'use client'

import { useState, useEffect } from 'react'
import { useAuction } from '@/lib/auction-store'
import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Order } from '@/lib/mock-data'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function WonPage() {
    const { items, simulateWin } = useAuction()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [order, setOrder] = useState<Order | null>(null)
    const t = useTranslations('won')

    const itemId = searchParams.get('itemId')
    const item = items.find(i => i.id === itemId) || items[0]

    useEffect(() => {
        // Create order on mount
        const newOrder = simulateWin(item.id)
        setOrder(newOrder)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!order) return <div className="container py-8">{t('loading', { ns: 'common' })}</div>

    const handlePayNow = () => {
        console.log('Navigating to payment with order:', order.id)
        router.push(`/payment?orderId=${order.id}`)
    }

    return (
        <div className="container py-8 max-w-lg mx-auto">
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold">{t('title')}</h1>
                <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
            </div>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-semibold">{item.title}</h2>
                        <Badge variant="secondary">{item.condition}</Badge>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('winningBid')}</span>
                        <span>€{order.winningBid.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('buyersPremium')}</span>
                        <span>€{order.buyersPremium.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('itemFee')}</span>
                        <span>€{order.itemFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold text-lg">
                            <span>{t('total')}</span>
                            <span>€{order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
                    ⏰ {t('payWithin')}
                </div>

                <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handlePayNow}
                >
                    {t('payNow')} — €{order.total.toFixed(2)}
                </Button>
            </Card>
        </div>
    )
}
