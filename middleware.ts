import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './i18n/routing';

export default createMiddleware({
    locales,
    defaultLocale: 'en',
    localePrefix
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(pl|en|es|uk)/:path*']
};
