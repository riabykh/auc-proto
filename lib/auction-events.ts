import { Item, MOCK_ITEMS } from './mock-data'

export interface AuctionEvent {
    id: string
    title: string
    location: string
    address: string
    startTime: Date
    status: 'upcoming' | 'active' | 'closing' | 'closed'
    items: Item[]
}

// Generate auction events
const now = new Date()
const hoursFromNow = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000)
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000)

export const AUCTION_EVENTS: AuctionEvent[] = [
    // ===== CURRENT / CLOSING AUCTIONS =====
    {
        id: 'event-1',
        title: 'Alicante Electronics & Home Goods - Morning Session',
        location: 'Alicante, Spain',
        address: 'Calle Mayor 45, 03001 Alicante, Spain',
        startTime: hoursFromNow(1),
        status: 'closing',
        items: [
            MOCK_ITEMS[0],  // Samsung TV
            MOCK_ITEMS[2],  // AirPods
            MOCK_ITEMS[4],  // Dyson Vacuum
            MOCK_ITEMS[7],  // Bose Headphones
            MOCK_ITEMS[10], // MacBook Air
            MOCK_ITEMS[12], // GoPro
        ]
    },
    {
        id: 'event-4',
        title: 'Warsaw Home & Kitchen Essentials',
        location: 'Warsaw, Poland',
        address: 'ul. Marszałkowska 100, 00-001 Warsaw, Poland',
        startTime: hoursFromNow(0.5),
        status: 'closing',
        items: [
            MOCK_ITEMS[1],  // DeLonghi Espresso
            MOCK_ITEMS[6],  // KitchenAid Mixer
            MOCK_ITEMS[9],  // Roomba
        ]
    },

    // ===== ACTIVE AUCTIONS =====
    {
        id: 'event-2',
        title: 'Alicante Premium Tech & Gaming',
        location: 'Alicante, Spain',
        address: 'Calle Mayor 45, 03001 Alicante, Spain',
        startTime: hoursFromNow(4),
        status: 'active',
        items: [
            MOCK_ITEMS[8],  // PlayStation 5
            MOCK_ITEMS[3],  // Nintendo Switch
            MOCK_ITEMS[14], // Galaxy Watch
        ]
    },
    {
        id: 'event-5',
        title: 'Warsaw Outdoor, Garden & Furniture',
        location: 'Warsaw, Poland',
        address: 'ul. Marszałkowska 100, 00-001 Warsaw, Poland',
        startTime: hoursFromNow(6),
        status: 'active',
        items: [
            MOCK_ITEMS[5],  // Weber Grill
            MOCK_ITEMS[13], // IKEA Bed Frame
        ]
    },

    // ===== UPCOMING AUCTIONS =====
    {
        id: 'event-3',
        title: 'Alicante Afternoon Luxury Items',
        location: 'Alicante, Spain',
        address: 'Calle Mayor 45, 03001 Alicante, Spain',
        startTime: hoursFromNow(24),
        status: 'upcoming',
        items: [
            MOCK_ITEMS[11], // Nespresso
        ]
    },
    {
        id: 'event-6',
        title: 'Warsaw Weekend Electronics Sale',
        location: 'Warsaw, Poland',
        address: 'ul. Marszałkowska 100, 00-001 Warsaw, Poland',
        startTime: hoursFromNow(48),
        status: 'upcoming',
        items: [
            MOCK_ITEMS[0],  // Samsung TV
            MOCK_ITEMS[10], // MacBook Air
            MOCK_ITEMS[8],  // PlayStation 5
            MOCK_ITEMS[14], // Galaxy Watch
        ]
    },
    {
        id: 'event-7',
        title: 'Alicante Premium Appliances - Next Week',
        location: 'Alicante, Spain',
        address: 'Calle Mayor 45, 03001 Alicante, Spain',
        startTime: hoursFromNow(72),
        status: 'upcoming',
        items: [
            MOCK_ITEMS[4],  // Dyson Vacuum
            MOCK_ITEMS[6],  // KitchenAid Mixer
            MOCK_ITEMS[9],  // Roomba
        ]
    },

    // ===== CLOSED AUCTIONS =====
    {
        id: 'event-8',
        title: 'Warsaw New Year Electronics Blowout',
        location: 'Warsaw, Poland',
        address: 'ul. Marszałkowska 100, 00-001 Warsaw, Poland',
        startTime: hoursAgo(24),
        status: 'closed',
        items: [
            MOCK_ITEMS[2],  // AirPods
            MOCK_ITEMS[7],  // Bose Headphones
            MOCK_ITEMS[12], // GoPro
        ]
    },
    {
        id: 'event-9',
        title: 'Alicante Holiday Kitchen & Home',
        location: 'Alicante, Spain',
        address: 'Calle Mayor 45, 03001 Alicante, Spain',
        startTime: hoursAgo(48),
        status: 'closed',
        items: [
            MOCK_ITEMS[1],  // DeLonghi Espresso
            MOCK_ITEMS[11], // Nespresso
            MOCK_ITEMS[6],  // KitchenAid Mixer
        ]
    },
    {
        id: 'event-10',
        title: 'Warsaw Gaming & Entertainment',
        location: 'Warsaw, Poland',
        address: 'ul. Marszałkowska 100, 00-001 Warsaw, Poland',
        startTime: hoursAgo(72),
        status: 'closed',
        items: [
            MOCK_ITEMS[3],  // Nintendo Switch
            MOCK_ITEMS[8],  // PlayStation 5
        ]
    },
    {
        id: 'event-11',
        title: 'Alicante December Clearance',
        location: 'Alicante, Spain',
        address: 'Calle Mayor 45, 03001 Alicante, Spain',
        startTime: hoursAgo(96),
        status: 'closed',
        items: [
            MOCK_ITEMS[5],  // Weber Grill
            MOCK_ITEMS[13], // IKEA Bed Frame
            MOCK_ITEMS[4],  // Dyson Vacuum
        ]
    },
]
