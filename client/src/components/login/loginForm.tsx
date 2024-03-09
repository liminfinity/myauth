import React, { ChangeEvent, FormEvent, useRef } from 'react'
import RememberCB from '../auth/rememberCB'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthInput from '../auth/authInput'
import Button from '../common/button'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useImmer } from 'use-immer'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHooks'
import { loginAction } from '../../store/reducers/authReducer'
import { locationState } from '../../types/routers'
import InputFields from '../auth/inputFields'
import Form from '../common/form'
import ReCAPTCHA from 'react-google-recaptcha'
import config from '../../../config.json'

export default function LoginForm() {
    const location = useLocation();
    const {from} = location.state as locationState || {}
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const captchaRef = useRef<ReCAPTCHA>(null);
    const [form, setForm] = useImmer({
        email: '',
        password: '',
        rememberMe: false
      })
    if (user) return <Navigate to={from || '/'} replace/>

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm(draft => {
            const input = e.target;
            draft[input.name] = input[input.type === 'checkbox' ? 'checked' : 'value']
        })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (captchaRef.current) {
            dispatch(loginAction({...form, captcha: captchaRef.current.getValue()}))
        }
    }
    return (
        <Form handleSubmit={handleSubmit}>
            <InputFields>
                <AuthInput icon={faEnvelope} name='email'type='email' placeholder='Email' 
                handleChange={handleChange} value={form.email}/>
                <AuthInput icon={faLock} name='password' type='password' placeholder='Password' 
                handleChange={handleChange} value={form.password}/>
            </InputFields>
            <section className='flex justify-between items-center gap-3'>
                <RememberCB name='rememberMe' checked={form.rememberMe} handleChange={handleChange}/>
                <Link className='link text-sm hover:text-blue transition-all' to='/auth/check-email' state={{from: location.pathname}}>Forgot password?</Link>
            </section>
            <ReCAPTCHA sitekey={config.ReCAPTCHA_SITE} ref={captchaRef} className='rounded-full self-center'/>
            <Button type='submit' className='authButton'>Log in with your account</Button>
        </Form>
  )
}
