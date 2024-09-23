export class User {
    userId: string;
    email: string;
    username: string | null;
    firstName: string;
    lastName: string;
    passwordHash: string;

    constructor(
        userId: string,
        email: string,
        firstName: string,
        lastName: string,
        username: string | null = null,
        passwordHash: string
    ) {
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.passwordHash = passwordHash;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
