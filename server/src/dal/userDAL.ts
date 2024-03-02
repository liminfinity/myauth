import { QueryResult } from "pg";
import { DAL } from "./DAL";
import { UserDTO } from "../dto/userDTO";
import { DBUserResponse } from "../types/responseTypes";

class UserDAL extends DAL {
    async getUsers() {
        const res: QueryResult<DBUserResponse> = await this.pool.query(`select userId, email, username from users`);
        return res.rows;
    }
}

const userDAL = new UserDAL();
export {userDAL}