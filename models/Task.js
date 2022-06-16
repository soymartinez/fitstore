import { Schema, model, models } from "mongoose";



const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required "],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    brand: {
      type: String,
      required: [true, "The brand title is required "],
      unique: true,
      trim: true,
      maxlength: [25, "title cannot be grater than 25 characters"],
    },
    price: {
      type: Number,
      required: [true, "The Task title is required "],
      unique: true,
      trim: true,
      maxlength: [10, "title cannot be grater than 10 characters"],
    },
    weight: {
      type: Number,
      required: [true, "The brand title is required "],
      unique: true,
      trim: true,
      maxlength: [5, "title cannot be grater than 5 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [900, "title cannot be grater than 200 characters"],
    },
    image: {
      type: String,
      required: [true, "The image is required "],
      unique: true,
      trim: true,
      maxlength: [400, "title cannot be grater than 400 characters"],
    },
    taste: {
      type: Array,
      required: [false, "The taste is required "],
      unique: false,
      trim: true,
      maxlength: [400, "title cannot be grater than 400 characters"],
    }

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", TaskSchema);