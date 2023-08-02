import {z} from 'zod'

export const ItemsSchema = z.array(
  z.object({
    id:z.number().optional(),
    orderId: z.number().optional(),
    productId: z.string(),
    productTitle: z.string(),
    productPrice: z.number(),
    productCategory: z.string(),
    productSize: z.string(),
    productImage: z.string(),
    productQuantity: z.string(),
    quantity: z.number(),
  }),
);

export const AddToOrderSchema = z.object({
  status: z.string(),
  userId: z.number(),
  cartItems: ItemsSchema,
});

export const OrderSchema = z.object({
  id: z.number(),
  status: z.string(),
  userId: z.number(),
  orderItems: ItemsSchema,
})