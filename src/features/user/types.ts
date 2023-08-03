import { z } from 'zod';
import { CartItemSchema } from '../catalog/types';

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.number(),
  total: z.number(),
  status: z.string(),
  orderItems: z
    .array(
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
    )
    .optional(),
});

export const PaymentDetailsSchema = z.object({
  id: z.string(),
  userId: z.number(),
  orderId: z.number(),
  amount_total: z.number(),
  currency: z.string(),
  status: z.string(),
});

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string(),
  role: z.string(),
  cartItems: z.array(CartItemSchema).optional(),
  orders: z.array(OrderSchema).optional(),
  paymentDetails: z.array(PaymentDetailsSchema).optional(),
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

export const OrdersSchema = z.object({
  orders: z.array(OrderSchema),
});

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
export type UserSchemaType = z.infer<typeof UserSchema>;
export type PaymentDetailsType = z.infer<typeof PaymentDetailsSchema>;
export type AcceptedOrderType = z.infer<typeof AcceptedOrderSchema>;
export type OrderType = z.infer<typeof OrderSchema>;
export type OrdersType = z.infer<typeof OrdersSchema>;
export type AddToOrderType = z.infer<typeof AddToOrderSchema>;
