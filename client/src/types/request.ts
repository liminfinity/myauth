export interface LoginReq {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}
export interface SignUpReq extends LoginReq {
    username: string
}