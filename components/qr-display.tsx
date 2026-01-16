'use client'

import { QRCodeSVG } from 'qrcode.react'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface QRDisplayProps {
    code: string
    location: string
    hours: string
    deadline: Date
}

export function QRDisplay({ code, location, hours, deadline }: QRDisplayProps) {
    return (
        <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                <QRCodeSVG
                    value={code}
                    size={200}
                    level="H"
                />
            </div>

            <p className="text-lg font-medium">
                Show this QR code at pickup
            </p>

            <div className="text-left space-y-4 max-w-sm mx-auto">
                <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{location}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="font-medium">{hours}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                        <p className="text-sm text-muted-foreground">Pickup by</p>
                        <p className="font-medium">
                            {format(deadline, 'MMMM d, yyyy')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
