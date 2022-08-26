export interface Destination {
    id: number;
    name: string;
    country: string;
    description: string;
    images: string[];
    position: {
        latitude: number;
        longitude: number;
    };
    favourite: boolean;
    visited: boolean;
}

export const DESTINATIONS: Destination[] = [
    {
        id: 1,
        name: 'Paris',
        country: 'France',
        description: 'Paris is the capital of France.',
        images: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
        ],
        position: {
            latitude: 48.856614,
            longitude: 2.3522219,
        },
        favourite: false,
        visited: false,
    },
    {
        id: 2,
        name: 'Rome',
        country: 'Italy',
        description: 'Rome is the capital of Italy.',
        images: [
            'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        ],
        position: {
            latitude: 41.9027835,
            longitude: 12.4963655,
        },
        favourite: true,
        visited: true,
    },
    {
        id: 3,
        name: 'Bali',
        country: 'Indonesia',
        description: 'Bali is the capital of Indonesia.',
        images: [
            'https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        ],
        position: {
            latitude: -8.7489464,
            longitude: 115.2165228,
        },
        favourite: true,
        visited: false,
    },
    {
        id: 4,
        name: 'Reykjavik',
        country: 'Iceland',
        description: 'Reykjavik is the capital of Iceland.',
        images: [
            'https://images.unsplash.com/photo-1528837516156-0a7225a43641?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80',
        ],
        position: {
            latitude: 64.1265205,
            longitude: -21.8174393,
        },
        favourite: true,
        visited: false,
    },
    {
        id: 5,
        name: 'Madeira',
        country: 'Portugal',
        description: 'Madeira is the capital of Portugal.',
        images: [
            'https://images.unsplash.com/photo-1628413283166-a7666966d26b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        ],
        position: {
            latitude: 32.691256,
            longitude: -16.974998,
        },
        favourite: true,
        visited: true,
    },
];
