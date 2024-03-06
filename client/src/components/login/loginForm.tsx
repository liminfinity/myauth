import React, { ChangeEvent, FormEvent } from 'react'
import RememberCB from '../auth/rememberCB'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthInput from '../auth/authInput'
import Button from '../common/button'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useImmer } from 'use-immer'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHooks'
import { loginAction } from '../../store/reducers/authReducer'
import { locationState } from '../../types/routers'

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state as locationState  
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const [form, setForm] = useImmer({
        email: '',
        password: '',
        rememberMe: false
      })
      if (user) return navigate(from || '/main', {
        replace: true
    })
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    function handleSubmit(e?: FormEvent) {
        e?.preventDefault();
        dispatch(loginAction(form))
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <AuthInput icon={faEnvelope} name='email' placeholder='Email' handleChange={handleChange} value={form.email}/>
                <AuthInput icon={faLock} name='password' placeholder='Password' handleChange={handleChange} value={form.password}/>
            </fieldset>
            <section>
            <RememberCB name='rememberMe' checked={form.rememberMe} handleChange={handleChange}/>
            <Link to='/forgot'>Forgot password?</Link>
            </section>
            <Button type='submit'>Log in with your account</Button>
        </form>
  )
}
