import { $api } from "../http";
import { IUser } from "../types/models";

export class UserService {
    static async getUsers(query: string) {
        const res = await $api.get<{users: IUser[]}>('/users', {
            params: {
                query
            }
        });
        const {users} = res.data;
        return users;
    }
}