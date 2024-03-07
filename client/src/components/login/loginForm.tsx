import React, { ChangeEvent, FormEvent } from 'react'
import RememberCB from '../auth/rememberCB'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthInput from '../auth/authInput'
import Button from '../common/button'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useImmer } from 'use-immer'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHooks'
import { loginAction } from '../../store/reducers/authReducer'
import { locationState } from '../../types/routers'

export default function LoginForm() {
    const location = useLocation();
    console.log(location)
    const {from} = location.state as locationState || {}
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
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

    function handleSubmit(e?: FormEvent) {
        e?.preventDefault();
        dispatch(loginAction(form))
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <AuthInput icon={faEnvelope} name='email'type='email' placeholder='Email' 
                handleChange={handleChange} value={form.email}/>
                <AuthInput icon={faLock} name='password' type='password' placeholder='Password' 
                handleChange={handleChange} value={form.password}/>
            </fieldset>
            <section>
                <RememberCB name='rememberMe' checked={form.rememberMe} handleChange={handleChange}/>
                <Link to='/check-email' state={{from: location.pathname}}>Forgot password?</Link>
            </section>
            <Button type='submit'>Log in with your account</Button>
        </form>
  )
}
