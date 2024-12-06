import sql from "@/config/db.config";
import { UserEntity } from "@/models/user.model";
import {  CreateUser, UpdateUser } from "@/utils/types";

export class UserRepository {
    static async createNewUser(user: CreateUser): Promise<string>{
        const userId = await sql`INSERT INTO users ${sql(user)} RETURNING id`;
        return userId[0].id;
    }

    static async findById(userId: string): Promise<UserEntity | null> {
        const user = await sql<UserEntity[]>`SELECT * FROM users WHERE id = ${userId}`;
        if(user.length === 0){
            return null;
        }
        return user[0];
    }

    static async checkUserExists(userId: string) {
        await sql<UserEntity[]>`SELECT id FROM users WHERE id = ${userId}`;
    }

    static async updateUser(user: UpdateUser){
        const userWithUpdatedAt = {
            ...user,
            updatedAt: new Date()
        }
        const result = await sql`UPDATE users SET ${sql(userWithUpdatedAt)} where id = ${user.id} RETURNING id`;
        if(result.length === 0){
            return null;
        }
        return result[0].id;
    }

    static async checkConflictingFields(user: { id: string, email?: string, username?: string }){
        if(user.email === undefined && user.username === undefined){
            return null;
        }
        const result = await sql<[{ emailExists: boolean, usernameExists: boolean }]>`
                    SELECT  ${user.email ? sql`bool_or(email = ${user.email})` : sql`FALSE`} as email_exists,
                            ${user.username ? sql`bool_or(username = ${user.username})` : sql`FALSE`} as username_exists
                    FROM users 
                    WHERE   ${user.email ? sql`email = ${user.email} and id != ${user.id}` : sql``} 
                    OR      ${user.username ? sql`username = ${user.username} and id != ${user.id}` : sql``}`;
        return result[0];
    }
    /* static async updateUser(userId: string, updatedColumns: Array<keyof UpdatedUserColumns>, user: Partial<IUserUpdateColumns>) {
        await sql`UPDATE users SET ${sql(user, updatedColumns)} WHERE id = ${userId}`;
    } */

    static async updatePassword(userId: string, password: { password: string }) {
        const passwordWithUpdatedAt = {
            ...password,
            updatedAt: new Date()
        }
        await sql`UPDATE users SET ${sql(passwordWithUpdatedAt)} WHERE id = ${userId}`;
    }

    static async findByEmail(email: string): Promise<UserEntity | null>{
        const user = await sql<UserEntity[]>`SELECT * FROM users WHERE email = ${email}`;
        if(user.length === 0){
            return null
        }
        return user[0];
    }

    static async findByUsername(username: string): Promise<UserEntity | null>{
        const user = await sql<UserEntity[]>`SELECT * FROM users WHERE username = ${username}`;
        if(user.length === 0){
            return null
        }
        return user[0];
    }
}