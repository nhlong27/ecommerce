import { z } from 'zod';

export const ProductSchema = z.object({
  title: z.string(),
  size: z.string(),
  quantity: z.string(),
  sku: z.string(),
  image: z.string(),
  category: z.string(),
  price: z.number(),
  score: z.number(),
  n_o_reviews: z.number(),
  instock_reserved: z.number(),
  instock_available: z.number(),
});

export const ProductsSchema = z.object({
  products: z.array(ProductSchema),
});

export type ProductType = z.infer<typeof ProductSchema>;
export type ProductsType = z.infer<typeof ProductsSchema>;
