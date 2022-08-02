import prisma from 'utils/prisma'

export default async (req, res) => {
    const { method, body } = req

    switch (method) {
        case 'GET':
            try {
                const products = await prisma.product.findMany()
                return res.status(200).json(products)
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'POST':
            try {
                const product = await prisma.product.create({
                    data: {
                        name: body.name,
                        subname: body.subname,
                        brand: body.brand,
                        image: body.image,
                        descriptions: {
                            create: [
                                { ...body.descriptions }
                            ]
                        }
                    }
                })
                return res.status(201).json(product)
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        default:
            return res.status(400).json({ msg: 'This method is not supported' })
    }
}
