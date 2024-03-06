import { ChangeEvent } from "react"

interface IAuthContext {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface ILoginContext extends IAuthContext {
    form: ILoginForm
    
}
export interface ISignUpConext extends IAuthContext {
    form: ISignUpForm
}

export interface ILoginForm {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface ISignUpForm extends ILoginForm {
    username: string
}