export const data = {
    "orders": [
        // {
        //     "id": 1,
        //     "name": "MASS TECH Elite",
        //     "brand": "Muscletech",
        //     "weight": 2.26,
        //     "toast": "vainilla",
        //     "price": 998.00,
        //     "amount": 1,
        //     "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
        //     "image": "https://firebasestorage.googleapis.com/v0/b/fitstore-4db57.appspot.com/o/muscletech-mass-tech-elite-300x300.webp?alt=media&token=7b6bc615-070c-4c07-973e-b7545a665659"
        // },
    ]
}

export default function handler(req, res) {
    res.status(200).json(data)
}