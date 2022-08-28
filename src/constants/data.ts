import { TPlace } from '@store/places';

export const Places: TPlace[] = [
    {
        id: 1,
        name: 'Paris',
        country: 'France',
        description: 'Paris is the capital of France.',
        images: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
            'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        ],
        position: {
            latitude: 48.856614,
            longitude: 2.3522219,
        },
        isFavorite: false,
        isVisited: false,
    },
    {
        id: 2,
        name: 'Rome',
        country: 'Italy',
        description: 'Rome is the capital of Italy.',
        images: [
            'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
            'https://images.unsplash.com/photo-1555992828-35627f3b373f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
            'https://images.unsplash.com/photo-1596627118111-5b6c7890bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        ],
        position: {
            latitude: 41.9027835,
            longitude: 12.4963655,
        },
        isFavorite: true,
        isVisited: true,
    },
    {
        id: 3,
        name: 'Bali',
        country: 'Indonesia',
        description: 'Bali is the capital of Indonesia.',
        images: [
            'https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        ],
        position: {
            latitude: -8.7489464,
            longitude: 115.2165228,
        },
        isFavorite: true,
        isVisited: false,
    },
    {
        id: 4,
        name: 'Reykjavik',
        country: 'Iceland',
        description: 'Reykjavik is the capital of Iceland.',
        images: [
            'https://images.unsplash.com/photo-1528837516156-0a7225a43641?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80',
            'https://images.unsplash.com/photo-1504829857797-ddff29c27927?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        ],
        position: {
            latitude: 64.1265205,
            longitude: -21.8174393,
        },
        isFavorite: true,
        isVisited: false,
    },
    {
        id: 5,
        name: 'Madeira',
        country: 'Portugal',
        description: 'Madeira is the capital of Portugal.',
        images: [
            'https://images.unsplash.com/photo-1628413283166-a7666966d26b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
            'https://images.unsplash.com/photo-1627931501443-ad739e4644b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1585173615300-88d39b0b7eae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
        ],
        position: {
            latitude: 32.691256,
            longitude: -16.974998,
        },
        isFavorite: true,
        isVisited: true,
    },
];
