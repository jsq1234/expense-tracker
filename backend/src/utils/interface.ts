import {
  PaymentMethod,
  TransactionType,
} from "@/models/financial-records.model";

export interface IUser {
  userId?: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUserUpdateColumns {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IFinancialRecord {
  userId: string;
  type: number;
  amount: number;
  transactionType: TransactionType;
  paymentMethod: PaymentMethod;
  transactionDate?: Date;
  description?: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}
