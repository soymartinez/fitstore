import prisma from 'utils/prisma'

export default async (req, res) => {
    const { method, query: { id }, body } = req

    switch (method) {
        case 'GET':
            try {
                const product = await prisma.product.findUnique({
                    where: { id },
                    include: { descriptions: true }
                })
                if (!product) return res.status(404).json({ msg: 'Product does not exists' })
                return res.status(200).json(product)
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'PUT':
            try {
                const updated = await prisma.product.update({
                    where: { id }, include: { descriptions: true },
                    data: {
                        name: body.name,
                        subname: body.subname,
                        brand: body.brand,
                        image: body.image,
                        descriptions: { update: body.description }
                    }
                })
                if (!updated) return res.status(400).json({ msg: error.message })
                return res.status(200).json({ success: true, msg: 'Product updated' })
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'DELETE':
            try {
                const deleted = await prisma.product.delete({ where: { id } })
                if (!deleted) return res.status(400).json({ msg: error.message })
                res.status(200).json({ success: true, msg: 'Product deleted' })
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        default:
            return res.status(400).json({ msg: 'This method is not supported' })
    }
}
