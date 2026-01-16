'use client'

import { useState, useEffect } from 'react'

export function useCountdown(endsAt: Date) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endsAt))

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endsAt))
        }, 1000)

        return () => clearInterval(timer)
    }, [endsAt])

    return timeLeft
}

function calculateTimeLeft(endsAt: Date) {
    const diff = endsAt.getTime() - Date.now()

    if (diff <= 0) {
        return {
            days: 0, hours: 0, minutes: 0, seconds: 0,
            totalSeconds: 0,
            display: 'Ended',
            isEnded: true
        }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    let display = ''
    if (days > 0) display = `${days}d ${hours}h`
    else if (hours > 0) display = `${hours}h ${minutes}m`
    else display = `${minutes}m ${seconds}s`

    return {
        days, hours, minutes, seconds,
        totalSeconds: Math.floor(diff / 1000),
        display,
        isEnded: false
    }
}
