import { UserDTO } from "../dto/userDTO";
 
interface Tokens {
    accessToken: string,
    refreshToken: string
}

export interface RegResponse extends Tokens {
    email: string
}

export interface AuthResponse extends Tokens {
    user: UserDTO,
}

export interface DBUserIdResponse {
    userid: string
}
export interface DBIdResponse {
    id: number
}
export interface DBLoginResponse extends DBUserIdResponse {
    username: string,
    password: string
}

export interface DBUserResponse extends DBUserIdResponse {
    username: string,
    email: string
}
