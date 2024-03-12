import {config} from 'dotenv'
import jwt from 'jsonwebtoken'
import { UserDTO } from '../dto/userDTO';

config()



class TokenService {
    generateTokens(payload: UserDTO) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }
    verifyAccessToken(accessToken: string) {
        try {
            const user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as UserDTO;
            return user;
        } catch (error) {
            return null;
        }
    }
    verifyRefreshToken(refreshToken: string) {
        try {
            const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as UserDTO;
            return user;
        } catch (error) {
            return null;
        }
    }
}

const tokenService = new TokenService();

export {tokenService}