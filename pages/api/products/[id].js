import { data } from './index'

export default function handler(req, res) {
  const { id } = req.query
  const product = data.products.find(product => product.id === Number(id))
  if (!product) {
    res.status(404).json({
      error: `Product with id ${id} not found`
    })
  } else {
    res.status(200).json(product)
  }
}
