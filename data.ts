import { PortfolioItem, ProjectCategory } from './types';

// Helper to generate 6 random images for the gallery
const getGallery = (seed: number) => [
  `https://picsum.photos/600/400?random=${seed}1`,
  `https://picsum.photos/600/400?random=${seed}2`,
  `https://picsum.photos/600/400?random=${seed}3`,
  `https://picsum.photos/600/400?random=${seed}4`,
  `https://picsum.photos/600/400?random=${seed}5`,
  `https://picsum.photos/600/400?random=${seed}6`,
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // 2024 Projects
  {
    id: 'p1',
    title: 'Future Tech Vision',
    client: 'Samsung Electronics',
    year: 2024,
    month: 1, // January (CES)
    location: 'CES, Las Vegas',
    description: 'Main booth immersive LED facade design and system operation featuring a 8K ultra-wide media wall.',
    category: ProjectCategory.EXHIBITION,
    tags: ['CES', 'LED System', 'Media Art'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=1',
    galleryImages: getGallery(1)
  },
  {
    id: 'p1-2',
    title: 'Mobile Experience Zone',
    client: 'Samsung Electronics',
    year: 2024,
    month: 2, // Feb (MWC)
    location: 'MWC, Barcelona',
    description: 'Interactive Galaxy AI experience zone setup with kinetic displays.',
    category: ProjectCategory.EXHIBITION,
    tags: ['MWC', 'Interactive', 'Kinetic'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=12',
    galleryImages: getGallery(12)
  },

  // 2023 Projects
  {
    id: 'p2',
    title: 'Smart Home Connectivity',
    client: 'LG Electronics',
    year: 2023,
    month: 9, // September (IFA)
    location: 'IFA, Berlin',
    description: 'IoT experience zone signage installation and technical support connecting 50+ smart devices.',
    category: ProjectCategory.EXHIBITION,
    tags: ['IFA', 'Signage', 'Interactive'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=2',
    galleryImages: getGallery(2)
  },
  {
    id: 'p3',
    title: 'Mobile World Premiere',
    client: 'SK Telecom',
    year: 2023,
    month: 2, // February (MWC)
    location: 'MWC, Barcelona',
    description: '5G/6G concept booth design including a flying taxi VR simulator system.',
    category: ProjectCategory.EXHIBITION,
    tags: ['MWC', 'Kinetic', 'Booth Design'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=3',
    galleryImages: getGallery(3)
  },

  // 2022 Projects
  {
    id: 'p4',
    title: 'Kitchen & Bath Luxury',
    client: 'Kohler',
    year: 2022,
    month: 2, // February (KBIS)
    location: 'KBIS, Orlando',
    description: 'Luxury showroom lighting and media server operation for the water pavilion.',
    category: ProjectCategory.EXHIBITION,
    tags: ['KBIS', 'Lighting', 'Premium'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=4',
    galleryImages: getGallery(4)
  },

  // 2021 Projects
  {
    id: 'p5',
    title: 'Korea Electronics Show Highlight',
    client: 'Hyundai Mobis',
    year: 2021,
    month: 10, // October (KES)
    location: 'KES, Seoul',
    description: 'Automotive display solutions and transparent OLED setup for concept car reveal.',
    category: ProjectCategory.EXHIBITION,
    tags: ['KES', 'Transparent OLED', 'Automotive'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=5',
    galleryImages: getGallery(5)
  },

  // 2020 Projects
  {
    id: 'p6',
    title: 'Digital Signage Expo',
    client: 'Google Cloud',
    year: 2020,
    month: 2, // February (ISE)
    location: 'ISE, Amsterdam',
    description: 'Cloud infrastructure visualization wall using 1.5mm pixel pitch LED.',
    category: ProjectCategory.EXHIBITION,
    tags: ['ISE', 'Visualization', 'System Planning'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=6',
    galleryImages: getGallery(6)
  },

  // Pre-2020 Projects (archive)
  {
    id: 'p7',
    title: 'Global Auto Salon',
    client: 'Kia Motors',
    year: 2019,
    month: 3,
    location: 'Geneva Motor Show',
    description: 'Main stage curved LED setup and live relay system.',
    category: ProjectCategory.EXHIBITION,
    tags: ['Motor Show', 'Live Relay', 'Curved LED'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=7',
    galleryImages: getGallery(7)
  },
  {
    id: 'p8',
    title: 'Tech Convention 2018',
    client: 'Naver',
    year: 2018,
    month: 10,
    location: 'Deview, Seoul',
    description: 'Conference main hall projection mapping on 30m wide screen.',
    category: ProjectCategory.EVENT,
    tags: ['Conference', 'Projection Mapping'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=8',
    galleryImages: getGallery(8)
  },
  {
    id: 'p9',
    title: 'Historical archive',
    client: 'National Museum',
    year: 2017,
    month: 5,
    location: 'Seoul',
    description: 'Permanent media wall installation for history hall.',
    category: ProjectCategory.INSTALLATION,
    tags: ['Museum', 'Permanent', 'Maintenance'],
    mainImageUrl: 'https://picsum.photos/1200/800?random=9',
    galleryImages: getGallery(9)
  }
];