import { ChangeEvent, createContext } from "react";
import { ILoginContext, ISignUpConext } from "../types/context";


const loginInitialState = {
    form: {
        email: '',
        password: '',
        rememberMe: false
    },
    handleChange: (e?: ChangeEvent<HTMLInputElement>) => {}
}

const signUpInitialState = {
    form: {
        ...loginInitialState.form,
        username: ''
    },
    handleChange: (e?: ChangeEvent<HTMLInputElement>) => {}
}

export const SignUpContext = createContext<ISignUpConext>(signUpInitialState);

export const LoginContext = createContext<ILoginContext>(loginInitialState);