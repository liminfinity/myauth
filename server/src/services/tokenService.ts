import {config} from 'dotenv'
import jwt from 'jsonwebtoken'
import { UserDTO } from '../dto/userDTO';

config()



class TokenService {
    generateTokens(payload: UserDTO) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }
    verifyAccessToken(accessToken: string) {
        try {
            const user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
            return user;
        } catch (error) {
            return null;
        }
    }
    verifyRefreshToken(refresh: string) {
        try {
            const user = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET as string);
            return user;
        } catch (error) {
            return null;
        }
    }
}

const tokenService = new TokenService();

export {tokenService}