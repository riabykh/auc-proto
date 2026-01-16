'use client'

import React from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { LayoutDashboard, Gavel, ScanLine, Users, BarChart3, LogOut, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuction } from '@/lib/auction-store'

export function AdminSidebar() {
    const pathname = usePathname()
    const { switchUser } = useAuction()

    const links = [
        { href: '/admin/monitor', label: 'Live Monitor', icon: LayoutDashboard },
        { href: '/admin/auctions', label: 'Auctions', icon: Gavel },
        { href: '/admin/scanner', label: 'QR Scanner', icon: ScanLine },
        { href: '/admin/users', label: 'Users', icon: Users },
        { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
    ]

    return (
        <div className="flex h-screen flex-col justify-between border-r bg-slate-900 text-white w-64 fixed left-0 top-0 z-40">
            <div className="px-4 py-6">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
                    <span className="text-lg font-bold tracking-tight">Admin Panel</span>
                </div>
                <nav className="flex flex-col gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-slate-800 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white mb-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Store
                </Link>
                <button
                    onClick={() => switchUser('user')}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Exit Admin Mode
                </button>
            </div>
        </div>
    )
}
