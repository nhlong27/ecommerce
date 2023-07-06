import mongoose from 'mongoose';

interface ProductDocument extends mongoose.Document {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const ProductModel =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

export { ProductModel };
export type { ProductDocument };
