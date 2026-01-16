'use client'

import { useAuction } from '@/lib/auction-store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { User, Mail, Bell, Globe } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AccountPage() {
    const { user } = useAuction()
    const t = useTranslations('account')
    const [bidNotifications, setBidNotifications] = useState(true)
    const [outbidAlerts, setOutbidAlerts] = useState(true)
    const [winningAlerts, setWinningAlerts] = useState(true)

    const handleSave = () => {
        toast.success('Settings saved successfully!')
    }

    return (
        <div className="container py-8 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{t('profile')}</h2>
                            <p className="text-sm text-muted-foreground">Your personal information</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">{t('name')}</Label>
                            <Input
                                id="name"
                                defaultValue={user.name}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">{t('email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user.email}
                                className="mt-1"
                            />
                        </div>
                    </div>
                </Card>

                {/* Notifications Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{t('notifications')}</h2>
                            <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t('bidNotifications')}</p>
                                <p className="text-sm text-muted-foreground">Get notified when you place a bid</p>
                            </div>
                            <button
                                onClick={() => setBidNotifications(!bidNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${bidNotifications ? 'bg-primary' : 'bg-muted'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${bidNotifications ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t('outbidAlerts')}</p>
                                <p className="text-sm text-muted-foreground">Get notified when you&apos;re outbid</p>
                            </div>
                            <button
                                onClick={() => setOutbidAlerts(!outbidAlerts)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${outbidAlerts ? 'bg-primary' : 'bg-muted'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${outbidAlerts ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t('winningAlerts')}</p>
                                <p className="text-sm text-muted-foreground">Get notified when you win an auction</p>
                            </div>
                            <button
                                onClick={() => setWinningAlerts(!winningAlerts)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${winningAlerts ? 'bg-primary' : 'bg-muted'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${winningAlerts ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Language Section */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{t('language')}</h2>
                            <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { code: 'en', name: 'English', flag: '🇬🇧' },
                            { code: 'pl', name: 'Polski', flag: '🇵🇱' },
                            { code: 'es', name: 'Español', flag: '🇪🇸' },
                            { code: 'uk', name: 'Українська', flag: '🇺🇦' },
                        ].map((lang) => (
                            <button
                                key={lang.code}
                                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                            >
                                <span className="text-2xl">{lang.flag}</span>
                                <span className="font-medium">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button size="lg" onClick={handleSave}>
                        {t('saveChanges')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
