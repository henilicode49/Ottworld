const MOCK_REVIEWS = [
    { id: 1, user: 'Alex G.', rating: 5, comment: 'Absolutely stunning visuals! Running smooth on my device.', date: '2023-11-15' },
    { id: 2, user: 'Sam K.', rating: 4, comment: 'Great app but needs a dark mode toggle.', date: '2023-11-10' },
    { id: 3, user: 'Jordan P.', rating: 5, comment: 'Changed my workflow completely. Highly recommend.', date: '2023-10-05' },
];

export const MOCK_APPS = [
    {
        id: '1',
        name: 'Cosmic Explorer',
        slug: 'cosmic-explorer',
        shortDescription: 'Explore the universe with real-time 3D rendering.',
        fullDescription: 'Cosmic Explorer takes you on a journey through the stars. Features include real-time planet rendering, star charts, and educational tours of the solar system. Experience the vastness of space from your pocket.',
        category: 'Education',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Cosmic',
        // Space/Stars background
        screenshots: [
            'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80',
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
            'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '1.2.0',
        size: '150 MB',
        supportedPlatforms: ['Android', 'iOS'],
        tags: ['Space', '3D', 'Education', 'Editors Choice'],
        vendorId: 'v1',
        vendorName: 'StellarSoft',
        status: 'approved',
        createdAt: '2023-01-15T10:00:00Z',
        rating: 4.8,
        activeUsers: '850k',
        downloads: '1.2M',
        reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[2]],
        versionHistory: [
            { version: '1.2.0', date: '2023-11-20', notes: 'Added new solar systems and improved rendering engine. Fixed crash on older devices.' },
            { version: '1.1.5', date: '2023-10-05', notes: 'Performance improvements and bug fixes.' },
            { version: '1.0.0', date: '2023-01-15', notes: 'Initial release.' }
        ]
    },
    {
        id: '2',
        name: 'Pixel Painter',
        slug: 'pixel-painter',
        shortDescription: 'Create 8-bit art on the go.',
        fullDescription: 'A powerful pixel art editor for mobile. Support layers, custom palettes, and GIF export. Perfect for game designers and hobbyists.',
        category: 'Design',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Pixel',
        // Artistic/Colorful background
        screenshots: [
            'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80',
            'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
            'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '2.0.1',
        size: '45 MB',
        supportedPlatforms: ['Android'],
        tags: ['Art', 'Pixel', 'Creation', 'Trending'],
        vendorId: 'v2',
        vendorName: 'CreativeLabs',
        status: 'approved',
        createdAt: '2023-02-20T14:30:00Z',
        rating: 4.5,
        activeUsers: '400k',
        downloads: '850k',
        reviews: [MOCK_REVIEWS[1]]
    },
    {
        id: '3',
        name: 'TaskMaster Pro',
        slug: 'taskmaster-pro',
        shortDescription: 'Boost your productivity.',
        fullDescription: 'Manage your daily tasks with ease. Includes calendar integration, reminders, and team collaboration features. Now with AI suggestions.',
        category: 'Productivity',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Task',
        // Clean/Desk background
        screenshots: [
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
            'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
            'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'website',
        websiteUrl: 'https://example.com/taskmaster',
        version: '1.0.5',
        size: '20 MB',
        supportedPlatforms: ['Android', 'iOS', 'Web'],
        tags: ['Productivity', 'Tools', 'Trending'],
        vendorId: 'v1',
        vendorName: 'StellarSoft',
        status: 'pending',
        createdAt: '2023-03-10T09:15:00Z',
        rating: 0,
        activeUsers: '0',
        downloads: '0',
        reviews: []
    },
    {
        id: '4',
        name: 'Bad Game 3000',
        slug: 'bad-game',
        shortDescription: 'Do not play this.',
        fullDescription: 'It is a really bad game.',
        category: 'Games',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Bad',
        screenshots: [
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
            'https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=800&q=80',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '0.0.1',
        size: '900 MB',
        supportedPlatforms: ['Android'],
        tags: ['Junk'],
        vendorId: 'v2',
        vendorName: 'CreativeLabs',
        status: 'rejected',
        createdAt: '2023-03-05T16:45:00Z',
        rating: 1.2,
        activeUsers: '0',
        downloads: '5',
        reviews: []
    },
    {
        id: '5',
        name: 'Zen Garden',
        slug: 'zen-garden',
        shortDescription: 'Relax and unwind with virtual gardening.',
        fullDescription: 'Plant, water, and grow your own virtual garden. Features lo-fi beats and relaxing visuals.',
        category: 'Games',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Zen',
        // Nature/Green background
        screenshots: [
            'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=1200&q=80',
            'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
            'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '1.0.0',
        size: '120 MB',
        supportedPlatforms: ['Android', 'iOS'],
        tags: ['Relax', 'Simulation', 'Games', 'New Release'],
        vendorId: 'v2',
        vendorName: 'CreativeLabs',
        status: 'approved',
        createdAt: '2023-04-01T12:00:00Z',
        rating: 4.9,
        activeUsers: '12k',
        downloads: '50k',
        reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[2]]
    },
    {
        id: '6',
        name: 'FitTrack Pro',
        slug: 'fittrack-pro',
        shortDescription: 'Your ultimate fitness companion.',
        fullDescription: 'Track workouts, monitor nutrition, and achieve your fitness goals with FitTrack Pro. Includes GPS tracking, calorie counter, and community challenges.',
        category: 'Utilities',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Fitness',
        screenshots: [
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '3.1.0',
        size: '65 MB',
        supportedPlatforms: ['Android', 'iOS', 'Web'],
        tags: ['Health', 'Fitness', 'Tracking', 'Editors Choice'],
        vendorId: 'v1',
        vendorName: 'StellarSoft',
        status: 'approved',
        createdAt: '2023-05-10T08:00:00Z',
        rating: 4.7,
        activeUsers: '1.8M',
        downloads: '2.5M',
        reviews: [MOCK_REVIEWS[0]]
    },
    {
        id: '7',
        name: 'CryptoWatch',
        slug: 'cryptowatch',
        shortDescription: 'Real-time cryptocurrency tracker.',
        fullDescription: 'Stay updated with the latest crypto prices. Advanced charts, portfolio tracking, and price alerts for Bitcoin, Ethereum, and 1000+ altcoins.',
        category: 'Utilities',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Crypto',
        screenshots: [
            'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1200&q=80',
            'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '1.4.2',
        size: '30 MB',
        supportedPlatforms: ['Android', 'iOS'],
        tags: ['Finance', 'Crypto', 'Money', 'Trending'],
        vendorId: 'v3',
        vendorName: 'FinTech Solutions',
        status: 'approved',
        createdAt: '2023-06-15T10:30:00Z',
        rating: 4.6,
        activeUsers: '120k',
        downloads: '500k',
        reviews: [MOCK_REVIEWS[2]]
    },
    {
        id: '8',
        name: 'Foodie Express',
        slug: 'foodie-express',
        shortDescription: 'Delicious recipes at your fingertips.',
        fullDescription: 'Discover thousands of recipes from around the world. Step-by-step instructions, video guides, and shopping list generation.',
        category: 'Lifestyle',
        iconUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Food',
        screenshots: [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
            'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80'
        ],
        apkUrl: '#',
        appType: 'apk',
        version: '2.2.0',
        size: '80 MB',
        supportedPlatforms: ['Android', 'iOS'],
        tags: ['Food', 'Cooking', 'Recipes', 'New Release'],
        vendorId: 'v2',
        vendorName: 'CreativeLabs',
        status: 'approved',
        createdAt: '2023-07-01T14:15:00Z',
        rating: 4.8,
        activeUsers: '600k',
        downloads: '1M',
        reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[1]]
    }
];

export const MOCK_VENDORS = [
    {
        id: 'v1',
        name: 'StellarSoft',
        email: 'contact@stellarsoft.com',
        password: '1234',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Stellar',
        apps: ['1', '3', '6']
    },
    {
        id: 'v2',
        name: 'CreativeLabs',
        email: 'dev@creativelabs.io',
        password: '1234',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Creative',
        apps: ['2', '4', '8']
    },
    {
        id: 'v3',
        name: 'FinTech Solutions',
        email: 'contact@fintech.com',
        password: '1234',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FinTech',
        apps: ['7']
    }
];

export const MOCK_STORIES = [
    {
        id: 's1',
        title: 'The Future of Deep Space',
        subtitle: 'WORLD PREMIERE',
        description: 'Dive into the latest update of Cosmic Explorer with improved 3D rendering and new solar systems.',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        appId: '1',
        type: 'featured'
    },
    {
        id: 's2',
        title: 'Master Your Morning Routine',
        subtitle: 'APP COLLECTION',
        description: 'Start your day right with these productivity essentials curated by our editors.',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
        appId: '3',
        type: 'collection'
    },
    {
        id: 's3',
        title: 'Find Your Zen',
        subtitle: 'GAME OF THE DAY',
        description: 'Why Zen Garden is the most relaxing game you will play this year.',
        imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
        appId: '5',
        type: 'featured'
    }
];
