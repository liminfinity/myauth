import { $api } from "../http";
import { IUser } from "../types/models";

export class UserService {
    static async getUsers() {
        const res = await $api.get<IUser[]>('/users');
        const users = res.data;
        return users;
    }
}