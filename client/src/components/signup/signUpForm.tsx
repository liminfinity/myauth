import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef } from 'react'
import AuthInput from '../auth/authInput'
import Button from '../common/button'
import { useImmer } from 'use-immer'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import RememberCB from '../auth/rememberCB'
import { useAppDispatch } from '../../hook/reduxHooks'
import { signUpAction } from '../../store/reducers/authReducer'
import InputFields from '../auth/inputFields'
import Form from '../common/form'
import { DefaultProps } from '../../types/components'
import ReCAPTCHA from 'react-google-recaptcha'
import config from '../../../config.json'

interface SignUpFormProps extends DefaultProps {
  setActivatedEmail: Dispatch<SetStateAction<string>>
}

export default function SignUpForm({setActivatedEmail}: SignUpFormProps) {
  const dispatch = useAppDispatch();
  const captchaRef = useRef<ReCAPTCHA>(null)
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (captchaRef.current) {
      const result = await dispatch(signUpAction({...form, captcha: captchaRef.current.getValue()}))
      if (result.type.endsWith('fulfilled')) {
        setActivatedEmail(result.payload);
      }
    }
    
  }

  return (
    <Form handleSubmit={handleSubmit}>
        <InputFields>
            <AuthInput icon={faUser} type='text' name='username' placeholder='Username' 
            value={form.username} handleChange={handleChange}/>
            <AuthInput icon={faEnvelope} type='email' name='email' placeholder='Email'
            value={form.email} handleChange={handleChange}/>
            <AuthInput icon={faLock} name='password' type='password' placeholder='Password'
            value={form.password} handleChange={handleChange}/>
            <RememberCB className='self-start' name='rememberMe' checked={form.rememberMe} handleChange={handleChange}/>
        </InputFields>
        <ReCAPTCHA sitekey={config.ReCAPTCHA_SITE} ref={captchaRef} className='rounded-full self-center'/>
        <Button type='submit' className='authButton'>Create account</Button>
    </Form>
  )
}
