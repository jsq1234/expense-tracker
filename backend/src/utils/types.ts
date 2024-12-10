
import { z } from "zod";
import { createFinancialRecordSchema, createUserSchema, updateUserSchema } from "./validation";
import { UserEntity } from "@/models/user.model";

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type CreateFinancialRecord = z.infer<typeof createFinancialRecordSchema>;


export type UserDto = Omit<UserEntity, 'password' | 'fullName' | 'getDto'>;

export type JwtConfig = {
  secret: string;
  expiresIn: string;
}

export type FieldError = {
  field: string;
  message: string;
}

export type CommonResponse<T, U = any[]> = {
  data: T | null;
  status: 'SUCCESS' | 'FAILURE';
  errors: U | null;
}


type Nullable<T> = {
  [K in keyof T]: T[K] | null
};

export type MakeNullable<T,K extends keyof T> = Omit<T, K> & Nullable<Pick<T, K>>