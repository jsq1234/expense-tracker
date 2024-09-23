import { UserRepository } from "@/repository/user-repository";
import { IUser, IUserUpdateColumns } from "@/utils/interface";
import * as bcrypt from 'bcrypt';
import { PostgresError } from "postgres";
import { PostgresError as PgError } from "pg-error-enum";
import { ApiError, genericCatchHandler } from "@/utils/errors";
import { HttpStatus } from "@/utils/http-status";
import { UserDto } from "@/dto/user-dto";

export class UserService {
    static async createUser(user: IUser) {
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
    }

    static async updateUser(userId: string, user: Partial<IUserUpdateColumns>) {
        try {
            await UserRepository.checkUserExists(userId);
            const updatedColumns = Object.keys(user) as Array<keyof IUserUpdateColumns>;
            if (updatedColumns.length === 0) {
                throw new ApiError(HttpStatus.BAD_REQUEST);
            }
            await UserRepository.updateUser(userId, updatedColumns, user);
        } catch (e: any) {
            genericCatchHandler(e, () => {
                if (e instanceof PostgresError) {
                    if (e.code === PgError.UNIQUE_VIOLATION) {
                        throw new ApiError(HttpStatus.CONFLICT, "")
                    }
                    throw new ApiError(HttpStatus.BAD_REQUEST);
                }
            });
        }
    }

    //TODO
    static async deleteUser(userId: string) {

    }

    static async changePassword(userId: string, currentPassword: string, newPassword: string) {
        try {
            const user = await UserRepository.findById(userId);
            const isSame = await bcrypt.compare(currentPassword, user.passwordHash);
            if (isSame) {
                const passwordHash = await bcrypt.hash(newPassword, 10);
                await UserRepository.updatePassword(userId, { passwordHash });
            } else {
                throw new ApiError(HttpStatus.FORBIDDEN);
            }
        } catch (e: any) {
            genericCatchHandler(e);
        }
    }

    static async fetchUser(userId: string){
        try{
            const user = await UserRepository.findById(userId);
            return user as UserDto;
        }catch(e: any){
            genericCatchHandler(e);
        }
    }


} 