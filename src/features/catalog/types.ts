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

export const CartItemSchema = z.object({
  id: z.string(),
  userId: z.number(),
  productId: z.string(),
  productTitle: z.string(),
  productPrice: z.number(),
  productCategory: z.string(),
  productSize: z.string(),
  productImage: z.string(),
  productQuantity: z.string(),
  quantity: z.number(),
});

export const CartItemsSchema = z.object({
  cartItems: z.array(CartItemSchema),
});

export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  productImage: z.string(),
  email: z.string(),
  productTitle: z.string(),
  productPrice: z.number(),
  productCategory: z.string(),
  productSize: z.string(),
  productQuantity: z.string(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  userId: z.number(),
  userEmail: z.string().email(),
  productId: z.string(),
  rating: z.number(),
  description: z.string(),
})

export type ProductType = z.infer<typeof ProductSchema>;
export type ProductsType = z.infer<typeof ProductsSchema>;
export type CartItemType = z.infer<typeof CartItemSchema>;
export type addToCartType = z.infer<typeof addToCartSchema>;
export type CartItemsType = z.infer<typeof CartItemsSchema>;
export type ReviewType = z.infer<typeof ReviewSchema>;

