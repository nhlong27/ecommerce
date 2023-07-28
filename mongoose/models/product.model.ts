import mongoose from 'mongoose';

interface ProductDocument extends mongoose.Document {
  title: string;
  size: string;
  quantity: string;
  sku: string;
  image: string;
  category: string;
  price: number;
  score: number;
  n_o_reviews: number;
  instock_reserved: number;
  instock_available: number;
}

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    size: { type: String },
    quantity: { type: String },
    sku: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    price: { type: Number },
    score: { type: Number },
    n_o_reviews: { type: Number },
    instock_reserved: { type: Number },
    instock_available: { type: Number },
  },
  { timestamps: true },
);

const ProductModel =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

export { ProductModel };
export type { ProductDocument };
