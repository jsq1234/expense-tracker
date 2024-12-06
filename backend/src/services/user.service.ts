import { UserRepository } from "@/repository/user.repository";
import { CreateUser, FieldError, UpdateUser } from "@/utils/types";
import * as bcrypt from "bcrypt";
import { PostgresError } from "postgres";
import { PostgresError as PgError } from "pg-error-enum";
import { ApiError, genericCatchHandler } from "@/utils/errors";
import { HttpStatus } from "@/utils/http-status";

export class UserService {
  static async createUser(user: CreateUser) {
    try {
      const passwordHash = await bcrypt.hash(user.password, 10);
      user.password = passwordHash;
      return await UserRepository.createNewUser(user);
    } catch (e: any) {
      genericCatchHandler(e, () => {
        if (e instanceof PostgresError) {
          if (e.code === PgError.UNIQUE_VIOLATION) {
            throw new ApiError(HttpStatus.CONFLICT, "User already exists");
          }
        }
      });
    }
    return undefined as never;
  }

  static async updateUser(user: UpdateUser) {
    try {
      const userId = await UserRepository.updateUser(user);
      if (userId === null) {
        throw new ApiError(HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (e: any) {
      await genericCatchHandler(e, async () => {
        if (e instanceof PostgresError) {
          if (e.code === PgError.UNIQUE_VIOLATION) {
            const conflictingFields =
              await UserRepository.checkConflictingFields(user);
            if (conflictingFields !== null) {
              let obj: FieldError[] = [];
              if (conflictingFields.emailExists) {
                obj.push({
                  field: "email",
                  message: "Email already exists",
                });
              }
              if (conflictingFields.usernameExists) {
                obj.push({
                  field: "username",
                  message: "Username already exists",
                });
              }
              throw new ApiError(HttpStatus.CONFLICT, JSON.stringify(obj));
            }
          }
          throw new ApiError(HttpStatus.BAD_REQUEST);
        }
      });
    }
    return undefined as never;
  }

  //TODO
  static async deleteUser(userId: string) {}

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    try {
      const user = await UserRepository.findById(userId);
      if (user === null) {
        throw new ApiError(HttpStatus.UNAUTHORIZED);
      }
      const isSame = await bcrypt.compare(currentPassword, user.password);
      if (isSame) {
        const password = await bcrypt.hash(newPassword, 10);
        await UserRepository.updatePassword(userId, { password });
      } else {
        throw new ApiError(HttpStatus.FORBIDDEN);
      }
    } catch (e: any) {
      genericCatchHandler(e);
    }
  }

  static async comparePassword(givenPassword: string, correctPassword: string) {
    try {
      return await bcrypt.compare(givenPassword, correctPassword);
    } catch (e: any) {
      genericCatchHandler(e);
    }
    return undefined as never;
  }

  static async fetchUser(userId: string) {
    try {
      const user = await UserRepository.findById(userId);
      return user;
    } catch (e: any) {
      await genericCatchHandler(e);
    }
    return undefined as never;
  }

  static async fetchUserByEmail(email: string) {
    try {
      const user = await UserRepository.findByEmail(email);
      return user;
    } catch (e: any) {
      genericCatchHandler(e);
    }
    return undefined as never;
  }
}
