import { QueryResult } from "pg";
import { DAL } from "./DAL";
import { DBUserResponse } from "../types/responseTypes";
import {v4 as uuid} from 'uuid';
class UserDAL extends DAL {
    async getUsers(excludedId: string=uuid(), query: string) {
        const res: QueryResult<DBUserResponse> = await this.pool.query(`select userId, email, username from users 
        where compareWithTemplate('%' || $1 || '%', username) and userId <> $2`, [query, excludedId]);
        return res.rows;
    }
}

const userDAL = new UserDAL();
export {userDAL}