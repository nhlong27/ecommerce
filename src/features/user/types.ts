import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
});
export type UserType = z.infer<typeof UserSchema>;


export const PaymentIntentSchema = z.object({
  userId: z.number(),
  total: z.number(),
  status: z.string(),
  cartItems: z.array(
    z.object({
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
    }),
  ),
});

export const StockPaymentIntentSchema = z.object({
  availableItems: z.array(
    z.object({
      productId: z.string(),
      instock_available: z.number(),
      instock_reserved: z.number(),
    }),
  ),
  outOfStockItems: z.array(
    z.object({
      productId: z.string(),
      instock_available: z.number(),
      instock_reserved: z.number(),
    }),
  ),
  paymentIntent: PaymentIntentSchema,
});

export type StockPaymentIntentType = z.infer<typeof StockPaymentIntentSchema>;

export type PaymentIntentType = z.infer<typeof PaymentIntentSchema>;