import sql from "@/config/db.config";
import { User } from "@/models/user.model";
import { IUser, IUserUpdateColumns } from "@/utils/interface";

export class UserRepository {
    static async createNewUser(user: IUser): Promise<string>{
        const userEntity = {
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            passwordHash: user.password
        };

        const userId = await sql`INSERT INTO users ${sql(userEntity)} RETURNING id`;
        console.log(userId);

        return userId[0].id;
    }

    static async findById(userId: string): Promise<User | null> {
        const user = await sql<User[]>`SELECT * FROM users WHERE id = ${userId}`;
        if(user.length === 0){
            return null;
        }
        return user[0];
    }

    static async checkUserExists(userId: string) {
        await sql<User[]>`SELECT id FROM users WHERE id = ${userId}`;
    }

    static async updateUser(userId: string, updatedColumns: Array<keyof IUserUpdateColumns>, user: Partial<IUserUpdateColumns>) {
        await sql`UPDATE users SET ${sql(user, updatedColumns)} WHERE id = ${userId}`;
    }

    static async updatePassword(userId: string, password: { passwordHash: string }) {
        await sql`UPDATE users SET ${sql(password, ['passwordHash'])} WHERE id = ${userId}`;
    }

    static async findByEmail(email: string): Promise<User | null>{
        const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
        if(user.length === 0){
            return null
        }
        return user[0];
    }

    static async findByUsername(username: string): Promise<User | null>{
        const user = await sql<User[]>`SELECT * FROM users WHERE username = ${username}`;
        if(user.length === 0){
            return null
        }
        return user[0];
    }
}