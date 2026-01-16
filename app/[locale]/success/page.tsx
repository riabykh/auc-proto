'use client'

import { Link } from '@/i18n/routing'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QRDisplay } from '@/components/qr-display'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SuccessPage() {
    const pickupCode = 'DEMO2024' // In real app, get from order
    const t = useTranslations('success')

    return (
        <div className="container py-8 max-w-lg mx-auto">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold">{t('title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('subtitle')}
                </p>
            </div>

            <Card className="p-6">
                <QRDisplay
                    code={pickupCode}
                    location="ul. Przykładowa 123, Warsaw"
                    hours="Mon-Fri: 10:00-18:00, Sat: 10:00-14:00"
                    deadline={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)}
                />
            </Card>

            <div className="mt-6 flex gap-4">
                <Button variant="outline" className="flex-1">
                    {t('saveQR')}
                </Button>
                <Link href="/" className="flex-1">
                    <Button className="w-full">
                        {t('viewDashboard')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
