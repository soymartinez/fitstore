import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
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
      required: [true, "The brand is required "],
      unique: false,
      trim: true,
      maxlength: [25, "title cannot be grater than 25 characters"],
    },
    price: {
      type: Number,
      required: [true, "The price is required "],
      unique: false,
      trim: true,
      maxlength: [10, "price cannot be grater than 10 characters"],
    },
    weight: {
      type: Number,
      required: [true, "The weight is required "],
      unique: false,
      trim: true,
      maxlength: [5, "weight cannot be grater than 5 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [900, "description cannot be grater than 200 characters"],
    },
    image: {
      type: String,
      required: [true, "The image is required "],
      unique: true,
      trim: true,
      maxlength: [400, "image text cannot be grater than 400 characters"],
    },
    taste: {
      type: Array,
      required: [false, "The taste is required "],
      unique: false,
      trim: true,
      maxlength: [400, "taste text cannot be grater than 400 characters"],
    }

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Product || model('Product', ProductSchema);