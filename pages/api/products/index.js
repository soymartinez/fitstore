export const data = {
    "products": [
        {
            "id": 1,
            "name": "MASS TECH Elite",
            "brand": "Muscletech",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 998.00,
            "description": "¡MASS-TECH®® proporciona los macronutrientes y los ingredientes para el desarrollo muscular que necesita para ayudarlo a ganar masa, tamaño y fuerza! Ya sea que esté atrapado en una frustrante meseta de crecimiento o simplemente le resulte difícil aumentar de tamaño. ¡MASS-TECH®® tiene todo el poder de construcción muscular que necesita para empacar en losas de nueva masa! MASS-TECH®® está diseñado para hombres y mujeres activos que luchan por consumir las calorías diarias necesarias para desarrollar tamaño, así como para aquellos que buscan aumentar su ingesta de proteínas y carbohidratos en la dieta. También es perfecto para atletas que buscan superar sus estancamientos de entrenamiento de fuerza y ​​músculos.ASS-TECH® TIENE MÁS PROTEÍNA, MEJORES CALORÍAS Y MAYORES RESULTADOS ¡MASS-TECH® es el ganador de masa masivamente popular que ha estado ayudando a los ganadores de peso durante más de una década! ¡MASS-TECH® tiene más proteínas, mejores calorías y mejores resultados que otros ganadores de masa! Comience a ver los resultados de todo su arduo trabajo en el gimnasio: MASS-TECH® brinda las proteínas, los carbohidratos y la creatina que necesita para aumentar su volumen, acumular músculo, aumentar su fuerza y ​​finalmente obtener el tipo de ganancias de masa que necesita. nunca antes experimentado! 14 servingz per container (5 scoops) 231gr",
            "image": "https://firebasestorage.googleapis.com/v0/b/fitstore-4db57.appspot.com/o/muscletech-mass-tech-elite-300x300.webp?alt=media&token=7b6bc615-070c-4c07-973e-b7545a665659"
        },
        {
            "id": 2,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00,
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=501"
        },
        {
            "id": 3,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00,
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=502"
        },
        {
            "id": 4,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00, 
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=503"
        },
        {
            "id": 5,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00, 
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=504"
        },
        {
            "id": 6,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00, 
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=505"
        },
        {
            "id": 7,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00, 
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=506"
        },
        {
            "id": 8,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00, 
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=507"
        },
        {
            "id": 9,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00, 
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=508"
        },
        {
            "id": 10,
            "name": "Best Protein Nutrition Pro Gainer",
            "brand": "Optimum Nutrition",
            "weight": 2.26,
            "toast": ['chocolate', 'vainilla'],
            "price": 898.00,
            "description": "This is a product description, it can be as long or short as you want it to be. It can even be empty.",
            "image": "https://picsum.photos/800/800?image=509"
        }
    ]
}

export default function handler(req, res) {
    res.status(200).json(data)
}