import React, { ChangeEvent, FormEvent } from 'react'
import AuthInput from '../auth/authInput'
import Button from '../common/button'
import { useImmer } from 'use-immer'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import RememberCB from '../auth/rememberCB'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHooks'
import { signUpAction } from '../../store/reducers/authReducer'

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useImmer({
    username: '',
    email: '',
    password: '',
    rememberMe: false
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(draft => {
        const input = e.target;
        draft[input.name] = input[input.type === 'checkbox' ? 'checked' : 'value']
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(signUpAction(form))
  }

  return (
    <form onSubmit={handleSubmit}>
        <fieldset>
            <AuthInput icon={faUser} type='text' name='username' placeholder='Username' 
            value={form.username} handleChange={handleChange}/>
            <AuthInput icon={faEnvelope} type='email' name='email' placeholder='Email'
            value={form.email} handleChange={handleChange}/>
            <AuthInput icon={faLock} name='password' type='password' placeholder='Password'
            value={form.password} handleChange={handleChange}/>
            <RememberCB name='rememberMe' checked={form.rememberMe} handleChange={handleChange}/>
        </fieldset>
        <Button type='submit'>Create account</Button>
    </form>
  )
}
