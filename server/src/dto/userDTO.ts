import { User } from "../types/userTypes";

export class UserDTO {
    public email: string
    public userId: string
    public username: string
    constructor(user: User) {
        this.email = user.email
        this.userId = user.userId as string,
        this.username = user.username
    }
}