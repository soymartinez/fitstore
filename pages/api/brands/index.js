import prisma from 'utils/prisma'

export default async (req, res) => {
    const brands = await prisma.brand.findMany()
    return res.status(200).json(brands)
}