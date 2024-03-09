export interface loginReuest {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}
export interface signUpReuest extends loginReuest {
    username: string
}