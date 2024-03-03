export interface LoginReq {
    email: string,
    password: string,
    rememberMe: boolean
}
export interface SignUpReq extends LoginReq {
    username: string
}