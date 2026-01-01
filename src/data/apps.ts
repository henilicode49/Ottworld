
export type UserRole = 'admin' | 'vendor' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  logo: string;
  bio: string;
  subscription: 'standard' | 'premium';
  joinedDate: string;
}

export interface AppMetrics {
  downloads: number;
  revenue: number;
  likes: number;
  views: number;
}

export interface App {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  category: string;
  price: number | 'free';
  status: 'pending' | 'approved' | 'rejected' | 'review';
  description: string;
  shortDescription: string;
  icon: string;
  version: string;
  size: string;
  lastUpdated: string;
  metrics: AppMetrics;
  isFeatured: boolean;
  isMature: boolean;
  tags: string[];
  screenshots: string[];
  downloadUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "all", name: "All Apps", icon: "Grid3X3", count: 156 },
  { id: "games", name: "Games", icon: "Gamepad2", count: 48 },
  { id: "productivity", name: "Productivity", icon: "Briefcase", count: 32 },
  { id: "utilities", name: "Utilities", icon: "Wrench", count: 28 },
  { id: "creative", name: "Creative", icon: "Palette", count: 24 },
  { id: "education", name: "Education", icon: "GraduationCap", count: 18 },
  { id: "entertainment", name: "Entertainment", icon: "Film", count: 15 },
  { id: "social", name: "Social", icon: "Users", count: 12 },
  { id: "mature", name: "18+ Content", icon: "ShieldAlert", count: 8 },
];

// Initial Users
export const initialUsers: User[] = [
  { id: 'u1', name: 'Admin', email: 'admin@ott.com', password: 'admin', role: 'admin' },
  { id: 'u2', name: 'RetroGame Studios', email: 'retrogamestudios@gmail.com', password: 'RetroGameStudios123', role: 'vendor' },
  { id: 'u3', name: 'Productivity Labs', email: 'productivitylabs@gmail.com', password: 'ProductivityLabs123', role: 'vendor' },
  { id: 'u4', name: 'AudioCraft Inc', email: 'audiocraftinc@gmail.com', password: 'AudioCraftInc123', role: 'vendor' },
  { id: 'u5', name: 'DevTools Co', email: 'devtoolsco@gmail.com', password: 'DevToolsCo123', role: 'vendor' },
];

// Initial Vendors
export const initialVendors: Vendor[] = [
  {
    id: 'v1',
    userId: 'u2',
    businessName: 'RetroGame Studios',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Retro',
    bio: 'Creating pixel perfect adventures since 2020.',
    subscription: 'premium',
    joinedDate: '2024-01-15'
  },
  {
    id: 'v2',
    userId: 'u3',
    businessName: 'Productivity Labs',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Prod',
    bio: 'Tools for the modern workflow.',
    subscription: 'standard',
    joinedDate: '2024-02-20'
  },
  {
    id: 'v3',
    userId: 'u4',
    businessName: 'AudioCraft Inc',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Audio',
    bio: 'Professional audio tools.',
    subscription: 'premium',
    joinedDate: '2024-03-10'
  },
  {
    id: 'v4',
    userId: 'u5',
    businessName: 'DevTools Co',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Dev',
    bio: 'Tools for developers.',
    subscription: 'standard',
    joinedDate: '2024-04-05'
  },
];

// Initial Apps
export const mockApps: App[] = [
  {
    id: "1",
    vendorId: "v1",
    vendorName: "RetroGame Studios",
    name: "Pixel Quest Adventure",
    description: "Embark on an epic journey through pixel-perfect worlds filled with challenging puzzles and exciting combat.",
    shortDescription: "Classic pixel adventure game",
    icon: "🎮",
    screenshots: [],
    category: "Games",
    tags: ["adventure", "pixel-art", "rpg"],
    metrics: { downloads: 125000, likes: 2341, views: 450000, revenue: 0 },
    size: "85 MB",
    version: "2.1.0",
    lastUpdated: "2024-01-15",
    price: "free",
    status: "approved",
    isMature: false,
    isFeatured: true,
  },
  {
    id: "2",
    vendorId: "v2",
    vendorName: "Productivity Labs",
    name: "TaskFlow Pro",
    description: "The ultimate task management app with AI-powered scheduling and team collaboration features.",
    shortDescription: "Smart task management",
    icon: "📋",
    screenshots: [],
    category: "Productivity",
    tags: ["tasks", "ai", "collaboration"],
    metrics: { downloads: 45000, likes: 892, views: 120000, revenue: 224550 },
    size: "32 MB",
    version: "3.0.2",
    lastUpdated: "2024-01-20",
    price: 4.99,
    status: "approved",
    isMature: false,
    isFeatured: true,
  },
  {
    id: "3",
    vendorId: "v3",
    vendorName: "AudioCraft Inc",
    name: "SynthWave Studio",
    description: "Create stunning synthwave music with this professional-grade synthesizer and beat maker.",
    shortDescription: "Professional music creation",
    icon: "🎹",
    screenshots: [],
    category: "Creative",
    tags: ["music", "synthesizer", "audio"],
    metrics: { downloads: 28000, likes: 567, views: 80000, revenue: 279720 },
    size: "156 MB",
    version: "1.5.0",
    lastUpdated: "2024-01-18",
    price: 9.99,
    status: "approved",
    isMature: false,
    isFeatured: true,
  },
  {
    id: "4",
    vendorId: "v4",
    vendorName: "DevTools Co",
    name: "CodeSnap",
    description: "Beautiful code screenshot generator with syntax highlighting and customizable themes.",
    shortDescription: "Code screenshot tool",
    icon: "📸",
    screenshots: [],
    category: "Utilities",
    tags: ["code", "screenshot", "developer"],
    metrics: { downloads: 67000, likes: 1203, views: 150000, revenue: 0 },
    size: "18 MB",
    version: "2.3.1",
    lastUpdated: "2024-01-22",
    price: "free",
    status: "approved",
    isMature: false,
    isFeatured: false,
  },
  {
    id: "5",
    vendorId: "v1", // Assigned to John
    vendorName: "RetroGame Studios",
    name: "Learn Japanese",
    description: "Master Japanese with interactive lessons, spaced repetition, and native speaker audio.",
    shortDescription: "Japanese language learning",
    icon: "🇯🇵",
    screenshots: [],
    category: "Education",
    tags: ["language", "japanese", "learning"],
    metrics: { downloads: 32000, likes: 445, views: 60000, revenue: 0 },
    size: "95 MB",
    version: "4.1.0",
    lastUpdated: "2024-01-10",
    price: "free",
    status: "pending", // Pending for demo
    isMature: false,
    isFeatured: false,
  },
  {
    id: "6",
    vendorId: "v3", // Assigned to Mike
    vendorName: "AudioCraft Inc",
    name: "StreamDeck Controller",
    description: "Control your streaming setup with customizable buttons and scene switching.",
    shortDescription: "Streaming control panel",
    icon: "🎬",
    screenshots: [],
    category: "Entertainment",
    tags: ["streaming", "twitch", "obs"],
    metrics: { downloads: 18000, likes: 321, views: 40000, revenue: 53820 },
    size: "42 MB",
    version: "1.8.0",
    lastUpdated: "2024-01-12",
    price: 2.99,
    status: "review", // Mapped to review
    isMature: false,
    isFeatured: false,
  },
  {
    id: "7",
    vendorId: "v1",
    vendorName: "RetroGame Studios",
    name: "Space Commander",
    description: "Command your fleet across the galaxy in this epic space strategy game.",
    shortDescription: "Space strategy game",
    icon: "🚀",
    screenshots: [],
    category: "Games",
    tags: ["strategy", "space", "multiplayer"],
    metrics: { downloads: 52000, likes: 876, views: 110000, revenue: 0 },
    size: "220 MB",
    version: "1.2.0",
    lastUpdated: "2024-01-08",
    price: "free",
    status: "approved",
    isMature: false,
    isFeatured: false,
  },
  {
    id: "8",
    vendorId: "v4",
    vendorName: "DevTools Co",
    name: "FileSync Ultimate",
    description: "Sync files across all your devices with end-to-end encryption.",
    shortDescription: "Secure file sync",
    icon: "📁",
    screenshots: [],
    category: "Utilities",
    tags: ["sync", "cloud", "backup"],
    metrics: { downloads: 78000, likes: 1567, views: 200000, revenue: 0 },
    size: "24 MB",
    version: "5.0.1",
    lastUpdated: "2024-01-21",
    price: "free",
    status: "approved",
    isMature: false,
    isFeatured: false,
  }
];
