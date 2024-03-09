import {boolean, object, ref, string} from 'yup'

export const userSchema = object({
    email: string().email().required('Email is a required field'),
    password: string().min(5, "Password is too small").required('Password is a required field'),
    username: string().min(2, "Username is too small").required('Username is a required field'),
    rememberMe: boolean().required('Remember me is a required field'),
    captcha: string().nullable().required('Captcha is a required field')
})

export const loginSchema = object({
    email: string().email().required('Email is a required field'),
    password: string().min(5, "Password is too small").required('Password is a required field'),
    rememberMe: boolean().required('Remember me is a required field'),
    captcha: string().nullable().required('Captcha is a required field')
})

export const emailSchema = object({
    email: string().email().required('Email is a required field'),
})

export const recoveryPasswordSchema = object({
    email: string().email().required('Email is a required field'),
    password: string().required('Password is a required field').min(5, "Password is too small"),
    confirmPassword: string().required('Confirm password is a required field').oneOf([ref('password')],
     'Passwords must match')
})