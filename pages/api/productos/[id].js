import { dbConnect } from "/utils/moongose";
import Task from "models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "Task does not exists" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
      case "PUT":
        try {
          const task = await Task.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!Task) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: Task });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
  
      case "DELETE":
        try {
          const task = await Task.deleteOne({ _id: id });
          if (!movie) {
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