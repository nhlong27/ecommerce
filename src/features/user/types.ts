import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});
export type UserType = z.infer<typeof UserSchema>;


export const AddToOrderSchema = z.object({
  status: z.string(),
  userId: z.number(),
  cartItems: z.array(
    z.object({
      productId: z.string(),
      productTitle: z.string(),
      productPrice: z.number(),
      productCategory: z.string(),
      productSize: z.string(),
      productImage: z.string(),
      productQuantity: z.string(),
      quantity: z.number(),
    }),
  ),
});

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.number(),
  total: z.number(),
  status: z.string(),
  orderItems: z.array(
    z.object({
      productId: z.string(),
      productTitle: z.string(),
      productPrice: z.number(),
      productCategory: z.string(),
      productSize: z.string(),
      productImage: z.string(),
      productQuantity: z.string(),
      quantity: z.number(),
    }),
  ).optional(),
})

export const OrdersSchema = z.object({
  orders: z.array(OrderSchema)
})

export const AcceptedOrderSchema = z.object({
  outOfStockItems: z.array(
    z.object({
      productId: z.string(),
      instock_available: z.number(),
      instock_reserved: z.number(),
    }),
  ),
  order: OrderSchema,
});

export type AcceptedOrderType = z.infer<typeof AcceptedOrderSchema>;
export type OrderType = z.infer<typeof OrderSchema>;
export type OrdersType = z.infer<typeof OrdersSchema>;
export type AddToOrderType = z.infer<typeof AddToOrderSchema>;