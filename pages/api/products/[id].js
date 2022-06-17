import { dbConnect } from 'utils/mongoose'
import Product from 'models/Product'

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id }
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: "Product does not exxists" });
        return res.status(200).json(product);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!product) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: product });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
  
      case "DELETE":
        try {
          const product = await Task.deleteOne({ _id: id });
          if (!product) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
};