'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function PaymentPage() {
    const router = useRouter()
    const [processing, setProcessing] = useState(false)
    const t = useTranslations('payment')

    const handlePay = async () => {
        setProcessing(true)
        // Fake processing delay
        await new Promise(r => setTimeout(r, 2000))
        router.push('/success')
    }

    return (
        <div className="container py-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

            <Card className="p-6">
                {/* Stripe Badge */}
                <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-slate-50 rounded-lg">
                    <svg viewBox="0 0 60 25" className="h-6 w-auto" aria-label="Stripe">
                        <path fill="#635BFF" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02.96-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-5.13L32.37 0v3.77l-4.13.88V.44zM22.24 7.3c1.18-.67 2.8-1.02 4.04-1.02v3.9c-.46-.07-.98-.07-1.46-.07-1.45 0-2.44.44-2.44 2.07v7.83h-4.13V5.57h3.76l.23 1.73zM13.41 5.3c-3.9 0-6.87 2.18-6.87 5.86 0 2.54 1.5 4.17 4.14 4.82l2.5.62c1.07.26 1.42.55 1.42 1.05 0 .57-.6 1.08-1.87 1.08-1.59 0-3.47-.6-4.9-1.52L6.05 20.4c1.68 1.34 4.08 1.9 6.26 1.9 4.37 0 6.9-2.14 6.9-5.93 0-2.76-1.79-4.25-4.45-4.92l-2.24-.55c-.97-.23-1.43-.47-1.43-1.04 0-.58.6-.98 1.68-.98 1.3 0 2.98.47 4.33 1.17l1.62-3.08c-1.5-1.05-3.67-1.67-5.31-1.67zM4.13 5.57L0 6.38v13.63h4.13V5.57z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600">Powered by Stripe</span>
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ShieldCheck className="w-3 h-3" />
                        <span>PCI Compliant</span>
                    </div>
                </div>

                {/* Card Form */}
                <div className="space-y-4">
                    <div>
                        <Label>{t('cardNumber')}</Label>
                        <div className="relative">
                            <Input
                                placeholder="4242 4242 4242 4242"
                                className="pl-10"
                            />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>{t('expiry')}</Label>
                            <Input placeholder="MM / YY" />
                        </div>
                        <div>
                            <Label>{t('cvc')}</Label>
                            <Input placeholder="CVC" type="password" />
                        </div>
                    </div>
                </div>

                {/* Test Card Notice */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700 text-center">
                        <strong>Test mode:</strong> Use card 4242 4242 4242 4242, any future date, any CVC
                    </p>
                </div>

                <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handlePay}
                    disabled={processing}
                >
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {t('processing')}
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 mr-2" />
                            {t('complete')}
                        </>
                    )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                    Your payment information is encrypted and secure
                </p>
            </Card>
        </div>
    )
}
