import {
  PaymentMethod,
  TransactionType,
} from "@/models/financial-records.model";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  username: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9_]+$/),
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
    ),
});

export const userSchema = createUserSchema.extend({ id: z.string().uuid() });

export const updateUserSchema = userSchema
  .pick({
    email: true,
    firstName: true,
    lastName: true,
    username: true,
    password: true,
  })
  .partial()
  .extend({ id: z.string().uuid() });

export const createFinancialRecordSchema = z.object({
  userId: z.string().uuid(),
  type: z.number(),
  amount: z.number().positive(),
  transactionType: z.enum(
    Object.values(TransactionType) as [TransactionType, ...TransactionType[]]
  ),
  transactionDate: z.date().optional(),
  paymentMethod: z.enum(
    Object.keys(PaymentMethod) as [PaymentMethod, ...PaymentMethod[]]
  ),
  description: z.string().optional(),
  createdAt: z.date().optional(),
});

export const financialRecordSchema = createFinancialRecordSchema.extend({
  id: z.string().uuid(),
});
