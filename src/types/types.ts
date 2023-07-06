import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export const BookSchema = z.object({
  title: z.string(),
});

export const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export const BooksSchema = z.array(BookSchema);

export const ProductsSchema = z.array(ProductSchema);

export type UserType = z.infer<typeof UserSchema>;
export type BookType = z.infer<typeof BookSchema>;
export type BooksType = z.infer<typeof BooksSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductsType = z.infer<typeof ProductsSchema>;
