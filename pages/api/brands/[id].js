import prisma from 'utils/prisma'

BigInt.prototype.toJSON = function () {
    return this.toString()
}

export default async (req, res) => {
    const { method, query: { id }, body } = req

    switch (method) {
        case 'GET':
            try {
                const brand = await prisma.brand.findUnique({
                    where: { id: BigInt(id) },
                })
                if (!brand) return res.status(404).json({ msg: 'Brand does not exists' })
                return res.status(200).json(brand)
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'PUT':
            try {
                const updated = await prisma.brand.update({
                    where: { id: BigInt(id) },
                    data: {
                        name: body.name,
                        image: body.image
                    }
                })
                if (!updated) return res.status(400).json({ msg: error.message })
                return res.status(200).json({ success: true, msg: 'Brand updated' })
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'DELETE':
            try {
                const deleted = await prisma.brand.delete({ where: { id: BigInt(id) } })
                if (!deleted) return res.status(400).json({ msg: error.message })
                res.status(200).json({ success: true, msg: 'Brand deleted' })
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        default:
            return res.status(400).json({ msg: 'Method not allowed' })
    }
}