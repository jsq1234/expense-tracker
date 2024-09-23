export interface IUser{
    userId?: string;
    username: string | null;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface IUserUpdateColumns{
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}