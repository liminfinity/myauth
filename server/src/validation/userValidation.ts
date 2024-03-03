import {boolean, object, string} from 'yup'

export const userSchema = object({
    email: string().email().required('Email is a required field'),
    password: string().min(5, "Password is too small").required('Password is a required field'),
    username: string().min(2, "Username is too small").required('Username is a required field'),
    rememberMe: boolean().required('Remember me is a required field')
})

export const loginSchema = object({
    email: string().email().required('Email is a required field'),
    password: string().min(5, "Password is too small").required('Password is a required field'),
    rememberMe: boolean().required('Remember me is a required field')
})