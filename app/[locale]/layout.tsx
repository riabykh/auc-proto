import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AuctionProvider } from '@/lib/auction-store';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import '../globals.css';

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
                <NextIntlClientProvider messages={messages}>
                    <AuctionProvider>
                        <Header />
                        <main className="min-h-[calc(100vh-8rem)]">
                            {children}
                        </main>
                        <Toaster />
                    </AuctionProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
