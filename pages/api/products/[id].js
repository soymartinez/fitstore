import prisma from 'utils/prisma'

export default async (req, res) => {
    const { method, query: { id } } = req

    switch (method) {
        case 'GET':
            try {
                const product = await prisma.products.findUnique({ where: { id } })
                if (!product) return res.status(404).json({ msg: 'Product does not exists' })
                return res.status(200).json(product)
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'UPDATE':
            try {
                const updated = await prisma.products.update({
                    where: { id },
                    data: { ...body, }
                })
                if (!updated) return res.status(400).json({ msg: error.message })
                return res.status(200).json({ success: true, data: product })
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        case 'DELETE':
            try {
                const deleted = await prisma.products.delete({ where: { id } })
                if (!deleted) return res.status(400).json({ msg: error.message })
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }
        default:
            return res.status(400).json({ msg: 'This method is not supported' })
    }
}
