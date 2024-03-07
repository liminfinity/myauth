import { QueryResult } from "pg"
import { UserActivationInfo } from "../types/userTypes"
import { DAL } from "./DAL"
import { DBLoginResponse, DBUserIdResponse } from "../types/responseTypes"
import { compare } from "bcrypt"
import { UserDTO } from "../dto/userDTO"

class AuthDAL extends DAL {

    async createUser(newUser: UserActivationInfo) {
        const {user} = newUser
        await this.pool.query(`insert into users values ($1, $2, $3, $4)`, 
        [user.userId, user.email, user.password, user.username])

        await this.pool.query(`insert into userActivations values ($1, $2, $3)`, 
        [user.userId, newUser.isActivated, newUser.activationId])
    }
    async saveToken(userId: string, token: string, userAgent: string) {
        const res: QueryResult<DBUserIdResponse> = await this.pool.query(
            `select userId from tokens where token=$1 and userAgent=$2`,
        [token, userAgent])
        if (!res.rows[0]?.userid) {
            await this.pool.query(`insert into tokens values ($1, $2, $3)`, 
            [userId, token, userAgent])
        }
        else {
            await this.pool.query(`update tokens set token=$1 where userId=$2 and userAgent=$3`, 
            [token, userId, userAgent])
        }
        
    }
    async activationUser(activationId: string) {
        const res: QueryResult<DBUserIdResponse> = await this.pool.query(
            `update userActivations set isActivated=true where activationId=$1 returning userId`, 
            [activationId]);
        return res.rows[0].userid;
    }
    async login(email: string, password: string) {
        const res: QueryResult<DBLoginResponse> = await this.pool.query(
            `select userId, username, password from users where email=$1`,
            [email]);
        const {userid, username, password: u_pass} = res.rows[0] || {};
        const isEqual = await compare(password, u_pass ?? '', );
        return isEqual && {
            userId: userid,
            username,
            email,
        };
    }
    async logout(refreshToken: string, userAgent: string) {
        const res = await this.pool.query(
            `delete from tokens where token=$1 and userAgent=$2`,
            [refreshToken, userAgent]);
        if (res.rowCount) {
            return refreshToken
        }
    }
    async refresh(refreshToken: string, userAgent: string) {
        const token = await this.logout(refreshToken, userAgent);
        return token;
    }
    async getUserById(userId: string): Promise<UserDTO> {
        const res = await this.pool.query(`select email, username from users where userId=$1`, [userId]);
        const user = res.rows[0] || {};
        return {
            userId,
            ...user
        }
    }
    async isActivated(email: string): Promise<boolean> {
        const res: QueryResult<{isactivated: boolean}> = await this.pool.query(`select isActivated from users 
        join userActivations using(userId) where email=$1`, [email])
        const isActivated = res.rows[0]?.isactivated;
        return isActivated
    }
    async deleteAccount(userId: string) {
        const res = await this.pool.query(
            `delete from users where userId=$1`,
            [userId]);
        console.log(res.rowCount);
        return res.rowCount;
    }

}

const authDAL = new AuthDAL()

export {authDAL}