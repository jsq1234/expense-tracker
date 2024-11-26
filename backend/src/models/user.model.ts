import { UserDto } from "@/dto/user-dto";

export class User {
    id: string;
    email: string;
    username: string | null;
    firstName: string;
    lastName: string;
    passwordHash: string;

    constructor(
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        username: string | null = null,
        passwordHash: string
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.passwordHash = passwordHash;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getDto(): UserDto {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            id: this.id,
            username: this.username
        };
    }
}
