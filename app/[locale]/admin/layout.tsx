import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar />
            <main className="pl-64">
                <div className="container py-8 max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
