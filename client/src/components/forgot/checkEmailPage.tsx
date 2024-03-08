import React, { FormEvent, useState } from 'react'
import Title from '../common/title'
import Description from '../common/description'
import AuthInput from '../auth/authInput'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { locationState } from '../../types/routers'
import Button from '../common/button'
import { ForgotService } from '../../services/ForgotService'
import BackLink from '../common/backLink'
import Form from '../common/form'
import { useAppDispatch } from '../../hook/reduxHooks'
import { setLoading } from '../../store/reducers/authReducer'
export default function CheckEmailPage() {
  const dispatch = useAppDispatch();

  const [verifyEmail, setVerifyEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state as locationState || {};
  if (!['/auth/login', '/auth/send-code'].includes(String(from))) return <Navigate to='/auth/login' replace/>

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(setLoading(true));
    const validated = await ForgotService.checkEmail(verifyEmail);
    if (validated) {
     navigate('/auth/send-code', {
      state:{from: location.pathname, email: verifyEmail}
     })
    }
    dispatch(setLoading(false));
  }
  return (
    <>
      <BackLink to='/auth/login'/>
      <Title level={1} className='self-start'>Reset your password</Title>
      <Description>Enter your user account's verified email address and we will send you a password recovery code.</Description>
      <Form handleSubmit={handleSubmit}>
        <AuthInput placeholder='Email' type='email' name='email' icon={faEnvelope} value={verifyEmail} 
        handleChange={e => setVerifyEmail(e.target.value)} />
        <Button type='submit' className='authButton'>Get code</Button>
      </Form>
    </>
  )
}
