import {
  PaymentMethod,
  TransactionType,
} from "@/models/financial-records.model";

export type User = {
  id?: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UpdateUserColumns = Omit<User, 'id'>;

export type FinancialRecord = {
  userId: string;
  type: number;
  amount: number;
  transactionType: TransactionType;
  paymentMethod: PaymentMethod;
  transactionDate?: Date;
  description?: string;
}

export type JwtConfig = {
  secret: string;
  expiresIn: string;
}
