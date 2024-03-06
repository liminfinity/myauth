
import { QueryResult } from "pg";
import { DAL } from "./DAL";
import { DBIdResponse, DBUserIdResponse } from "../types/responseTypes";


class ForgotDAL extends DAL {
    async checkEmail(email: string) {
        const res: QueryResult<DBUserIdResponse> = await this.pool.query(
            `select userId from users where email=$1`, [email])
        const userId = res.rows[0]?.userid
        return userId;
    }
    async saveCode(email: string, code: number) {
        const res: QueryResult<DBIdResponse> = await this.pool.query(
            `insert into recoveryCodes (email, code) values ($1, $2) returning id`, [email, code])
        return res.rows[0]?.id;
    }
    async checkCode(email: string, code: number) {
        const res: QueryResult<DBIdResponse> = await this.pool.query(
            `select id from recoveryCodes where email=$1 and code=$2`, [email, code])
        return res.rows[0]?.id;
    }
    async deleteCode(email: string) {
        const res: QueryResult<DBIdResponse> = await this.pool.query(
            `delete from recoveryCodes where email=$1 returning id`, [email])
        return res.rows[0]?.id;
    }
    async restorePassword(email: string, newPassword: string) {
        const res = await this.pool.query(
            `update users set password=$1 where email=$2 returning password`, [newPassword, email])
        return res.rows[0]?.password;
    }
    async deleteUserTokens(email: string) {
        const res: QueryResult<DBUserIdResponse> = await this.pool.query(
            `delete from tokens where userId = (select userId from users where email=$1) returning userId`,
             [email])
        return res.rows[0]?.userid;
    }
}

const forgotDAL = new ForgotDAL();
export {forgotDAL}