import prisma from 'utils/prisma'

BigInt.prototype.toJSON = function () {
    return this.toString()
}

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const brands = await prisma.brand.findMany()
                return res.status(200).json(brands)
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'POST':
            try {
                const brand = await prisma.brand.create({
                    data: req.body,
                })
                return res.status(201).json(brand)
            }
            catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        default:
            return res.status(400).json({ msg: 'Method not allowed' })
    }
}
