import {  UserDto } from "@/utils/types";

export class UserEntity {
    id!: string;
    email!: string;
    username!: string;
    firstName!: string;
    lastName!: string;
    password!: string;


    constructor(user: Partial<UserEntity>){
        Object.assign(this, user);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getDto(): UserDto {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username
        };
    }
}
