// lib/mock-data.ts

export type UserRole = 'admin' | 'user'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    avatar?: string
}

export interface Item {
    id: string
    title: string
    description: string
    condition: 'new' | 'open_box' | 'used'
    category: string
    images: string[]
    startingPrice: number
    currentPrice: number
    endsAt: Date
    status: 'active' | 'ended' | 'sold' | 'paused'
    bids: Bid[]
}

export interface Bid {
    id: string
    userId: string
    userName: string
    amount: number
    createdAt: Date
}

export interface Order {
    id: string
    itemId: string
    status: 'pending' | 'paid'
    winningBid: number
    buyersPremium: number
    itemFee: number
    total: number
    pickupCode: string
    pickupDeadline: Date
}

// Mock Users
export const MOCK_USER: User = {
    id: 'user-1',
    name: 'Demo User',
    email: 'user@example.com',
    role: 'user'
}

export const MOCK_ADMIN: User = {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
}

// Generate end times relative to now
const hoursFromNow = (h: number) => new Date(Date.now() + h * 60 * 60 * 1000)
const minutesFromNow = (m: number) => new Date(Date.now() + m * 60 * 1000)

export const MOCK_ITEMS: Item[] = [
    {
        id: 'item-1',
        title: 'Samsung 55" QLED Smart TV',
        description: 'Brand new in box. 4K resolution, smart features, voice control. Model QN55Q60B. Full manufacturer warranty included. Perfect for your living room entertainment setup.',
        condition: 'new',
        category: 'Electronics',
        images: [
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
            'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800',
        ],
        startingPrice: 1,
        currentPrice: 127,
        endsAt: minutesFromNow(15),
        status: 'active',
        bids: [
            { id: 'b1', userId: 'user-2', userName: 'Anna K.', amount: 127, createdAt: new Date(Date.now() - 5 * 60000) },
            { id: 'b2', userId: 'user-3', userName: 'Tomek W.', amount: 115, createdAt: new Date(Date.now() - 15 * 60000) },
            { id: 'b3', userId: 'user-4', userName: 'Maria S.', amount: 98, createdAt: new Date(Date.now() - 45 * 60000) },
        ]
    },
    {
        id: 'item-2',
        title: 'DeLonghi Automatic Espresso Machine',
        description: 'Professional quality espresso at home. Built-in grinder, milk frother, programmable settings. Minor box damage, machine is perfect. Makes incredible lattes and cappuccinos.',
        condition: 'open_box',
        category: 'Home & Kitchen',
        images: [
            'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800',
        ],
        startingPrice: 1,
        currentPrice: 89,
        endsAt: hoursFromNow(2),
        status: 'active',
        bids: [
            { id: 'b4', userId: 'user-5', userName: 'Piotr M.', amount: 89, createdAt: new Date(Date.now() - 30 * 60000) },
            { id: 'b5', userId: 'user-6', userName: 'Ewa B.', amount: 75, createdAt: new Date(Date.now() - 2 * 3600000) },
        ]
    },
    {
        id: 'item-3',
        title: 'Apple AirPods Pro (2nd Gen)',
        description: 'Active noise cancellation, spatial audio, MagSafe charging case. Tested and working perfectly. Includes all original tips and cable.',
        condition: 'open_box',
        category: 'Electronics',
        images: [
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800',
        ],
        startingPrice: 1,
        currentPrice: 67,
        endsAt: hoursFromNow(5),
        status: 'active',
        bids: [
            { id: 'b6', userId: 'user-7', userName: 'Kasia L.', amount: 67, createdAt: new Date(Date.now() - 1 * 3600000) },
        ]
    },
    {
        id: 'item-4',
        title: 'Nintendo Switch OLED',
        description: 'White edition with enhanced 7" OLED display. Complete in box with all accessories including dock, Joy-Cons, and grip. Adult owned, excellent condition.',
        condition: 'used',
        category: 'Gaming',
        images: [
            'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800',
        ],
        startingPrice: 1,
        currentPrice: 156,
        endsAt: hoursFromNow(8),
        status: 'active',
        bids: [
            { id: 'b7', userId: 'user-8', userName: 'Michał R.', amount: 156, createdAt: new Date(Date.now() - 20 * 60000) },
            { id: 'b8', userId: 'user-9', userName: 'Zofia K.', amount: 142, createdAt: new Date(Date.now() - 1 * 3600000) },
            { id: 'b9', userId: 'user-10', userName: 'Adam P.', amount: 128, createdAt: new Date(Date.now() - 3 * 3600000) },
        ]
    },
    {
        id: 'item-5',
        title: 'Dyson V15 Detect Vacuum',
        description: 'Latest model with laser dust detection. Powerful suction, long battery life. Box damaged in shipping, vacuum unused. Includes all attachments and wall mount.',
        condition: 'new',
        category: 'Home & Kitchen',
        images: [
            'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
        ],
        startingPrice: 1,
        currentPrice: 203,
        endsAt: hoursFromNow(12),
        status: 'active',
        bids: [
            { id: 'b10', userId: 'user-11', userName: 'Agata N.', amount: 203, createdAt: new Date(Date.now() - 45 * 60000) },
        ]
    },
    {
        id: 'item-6',
        title: 'Weber Spirit Gas Grill',
        description: '3-burner propane grill with side tables. Perfect for backyard BBQs. Never assembled, still in original packaging. Retail value over €500.',
        condition: 'new',
        category: 'Garden',
        images: [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        ],
        startingPrice: 1,
        currentPrice: 78,
        endsAt: hoursFromNow(24),
        status: 'active',
        bids: [
            { id: 'b11', userId: 'user-12', userName: 'Bartek J.', amount: 78, createdAt: new Date(Date.now() - 2 * 3600000) },
        ]
    },
    {
        id: 'item-7',
        title: 'KitchenAid Stand Mixer - Empire Red',
        description: 'Classic 5-quart tilt-head stand mixer. Customer return, tested working perfectly. Includes all attachments: flat beater, dough hook, and wire whip.',
        condition: 'open_box',
        category: 'Home & Kitchen',
        images: [
            'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=800',
        ],
        startingPrice: 1,
        currentPrice: 112,
        endsAt: hoursFromNow(3),
        status: 'active',
        bids: [
            { id: 'b12', userId: 'user-13', userName: 'Dorota W.', amount: 112, createdAt: new Date(Date.now() - 10 * 60000) },
            { id: 'b13', userId: 'user-14', userName: 'Robert K.', amount: 95, createdAt: new Date(Date.now() - 1 * 3600000) },
        ]
    },
    {
        id: 'item-8',
        title: 'Bose QuietComfort Ultra Headphones',
        description: 'Premium noise-cancelling over-ear headphones in black. Open box, never used. CustomTune sound calibration, 24-hour battery life.',
        condition: 'open_box',
        category: 'Electronics',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        ],
        startingPrice: 1,
        currentPrice: 89,
        endsAt: minutesFromNow(45),
        status: 'active',
        bids: [
            { id: 'b14', userId: 'user-15', userName: 'Kamil T.', amount: 89, createdAt: new Date(Date.now() - 8 * 60000) },
            { id: 'b15', userId: 'user-16', userName: 'Natalia S.', amount: 76, createdAt: new Date(Date.now() - 30 * 60000) },
        ]
    },
    {
        id: 'item-9',
        title: 'Sony PlayStation 5 Digital Edition',
        description: 'The latest PlayStation console - digital edition. Factory sealed, brand new. Includes DualSense controller. EU region.',
        condition: 'new',
        category: 'Gaming',
        images: [
            'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
        ],
        startingPrice: 1,
        currentPrice: 234,
        endsAt: hoursFromNow(4),
        status: 'active',
        bids: [
            { id: 'b16', userId: 'user-17', userName: 'Jakub M.', amount: 234, createdAt: new Date(Date.now() - 12 * 60000) },
            { id: 'b17', userId: 'user-18', userName: 'Patrycja K.', amount: 210, createdAt: new Date(Date.now() - 1 * 3600000) },
            { id: 'b18', userId: 'user-19', userName: 'Łukasz P.', amount: 185, createdAt: new Date(Date.now() - 2 * 3600000) },
        ]
    },
    {
        id: 'item-10',
        title: 'iRobot Roomba j7+ Robot Vacuum',
        description: 'Self-emptying robot vacuum with object avoidance. Learns your home layout. Includes Clean Base automatic dirt disposal. Lightly used, works perfectly.',
        condition: 'used',
        category: 'Home & Kitchen',
        images: [
            'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800',
        ],
        startingPrice: 1,
        currentPrice: 145,
        endsAt: hoursFromNow(6),
        status: 'active',
        bids: [
            { id: 'b19', userId: 'user-20', userName: 'Szymon W.', amount: 145, createdAt: new Date(Date.now() - 25 * 60000) },
        ]
    },
    {
        id: 'item-11',
        title: 'MacBook Air M2 13"',
        description: '8GB RAM, 256GB SSD, Midnight color. Customer return, opened but never used. Full Apple warranty. Perfect for students or professionals.',
        condition: 'open_box',
        category: 'Electronics',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        ],
        startingPrice: 1,
        currentPrice: 412,
        endsAt: hoursFromNow(7),
        status: 'active',
        bids: [
            { id: 'b20', userId: 'user-21', userName: 'Martyna K.', amount: 412, createdAt: new Date(Date.now() - 15 * 60000) },
            { id: 'b21', userId: 'user-22', userName: 'Damian R.', amount: 385, createdAt: new Date(Date.now() - 45 * 60000) },
            { id: 'b22', userId: 'user-23', userName: 'Olga T.', amount: 350, createdAt: new Date(Date.now() - 2 * 3600000) },
        ]
    },
    {
        id: 'item-12',
        title: 'Nespresso Vertuo Next Coffee Machine',
        description: 'Centrifusion brewing technology for perfect crema. Chrome finish. New in box with 12 coffee capsule samples. Makes both espresso and coffee.',
        condition: 'new',
        category: 'Home & Kitchen',
        images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        ],
        startingPrice: 1,
        currentPrice: 45,
        endsAt: hoursFromNow(10),
        status: 'active',
        bids: [
            { id: 'b23', userId: 'user-24', userName: 'Monika L.', amount: 45, createdAt: new Date(Date.now() - 3 * 3600000) },
        ]
    },
    {
        id: 'item-13',
        title: 'GoPro HERO12 Black',
        description: 'Latest action camera with 5.3K video, HyperSmooth 6.0 stabilization. Waterproof to 10m. Includes 64GB SD card and mounting kit.',
        condition: 'new',
        category: 'Electronics',
        images: [
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
        ],
        startingPrice: 1,
        currentPrice: 178,
        endsAt: minutesFromNow(30),
        status: 'active',
        bids: [
            { id: 'b24', userId: 'user-25', userName: 'Krzysztof N.', amount: 178, createdAt: new Date(Date.now() - 5 * 60000) },
            { id: 'b25', userId: 'user-26', userName: 'Joanna S.', amount: 165, createdAt: new Date(Date.now() - 20 * 60000) },
        ]
    },
    {
        id: 'item-14',
        title: 'IKEA MALM King Bed Frame',
        description: 'White oak veneer, includes slatted bed base. Never assembled, in original flat-pack boxes. Minor box damage from storage.',
        condition: 'new',
        category: 'Furniture',
        images: [
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        ],
        startingPrice: 1,
        currentPrice: 56,
        endsAt: hoursFromNow(18),
        status: 'active',
        bids: [
            { id: 'b26', userId: 'user-27', userName: 'Marta G.', amount: 56, createdAt: new Date(Date.now() - 4 * 3600000) },
        ]
    },
    {
        id: 'item-15',
        title: 'Samsung Galaxy Watch 6 Classic',
        description: '47mm Silver with rotating bezel. Health monitoring, GPS, LTE connectivity. Open box, charged once to test. Includes all straps.',
        condition: 'open_box',
        category: 'Electronics',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        ],
        startingPrice: 1,
        currentPrice: 134,
        endsAt: hoursFromNow(9),
        status: 'active',
        bids: [
            { id: 'b27', userId: 'user-28', userName: 'Wojciech K.', amount: 134, createdAt: new Date(Date.now() - 35 * 60000) },
            { id: 'b28', userId: 'user-29', userName: 'Aleksandra M.', amount: 118, createdAt: new Date(Date.now() - 2 * 3600000) },
        ]
    },
]

// Pre-made "won" order for demo
export const MOCK_WON_ORDER: Order = {
    id: 'order-demo',
    itemId: 'item-demo',
    status: 'pending',
    winningBid: 127,
    buyersPremium: 19.05,
    itemFee: 2,
    total: 148.05,
    pickupCode: 'DEMO2024',
    pickupDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
}

export const PICKUP_INFO = {
    location: 'ul. Przykładowa 123, 00-001 Warsaw',
    hours: 'Mon-Fri: 10:00-18:00, Sat: 10:00-14:00',
}
