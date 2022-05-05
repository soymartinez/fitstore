// Endpoint: GET /api/products
// Language: javascript
// Path: pages\api\products.js

export default function handler(req, res) {
    res.status(200).json(
        [
            {
                id: 1,
                name: 'PRO',
                price: 100,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 2,
                name: 'PRO2',
                price: 200,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 3,
                name: 'PRO3',
                price: 300,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 4,
                name: 'PRO4',
                price: 400,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 5,
                name: 'PRO5',
                price: 500,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 6,
                name: 'PRO6',
                price: 600,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 7,
                name: 'PRO7',
                price: 700,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 8,
                name: 'PRO8',
                price: 800,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 9,
                name: 'PRO9',
                price: 900,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            },
            {
                id: 10,
                name: 'PRO10',
                price: 1000,
                image: 'https://via.placeholder.com/150',
                description: 'This is a product'
            }
        ]
    )
}