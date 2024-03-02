import { UserDTO } from "../dto/userDTO";

export interface AuthResponse {
    user: UserDTO,
    accessToken: string,
    refreshToken: string
}

export interface DBUserIdResponse {
    userid: string
}
export interface DBLoginResponse extends DBUserIdResponse {
    username: string,
    password: string
}

export interface DBUserResponse extends DBUserIdResponse {
    username: string,
    email: string
}
