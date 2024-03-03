import { IUser } from "./models";

export interface AuthResponse {
    user: IUser,
    accessToken: string
}
export interface RegResponse {
    email: string,
    accessToken: string
}
