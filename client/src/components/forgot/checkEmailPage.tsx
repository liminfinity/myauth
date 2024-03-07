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
export default function CheckEmailPage() {
  const [verifyEmail, setVerifyEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state as locationState || {};
  if (!['/login', '/send-code'].includes(String(from))) return <Navigate to='/login' replace/>

  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    const validated = await ForgotService.checkEmail(verifyEmail);
    if (validated) {
     navigate('/send-code', {
      state:{from: location.pathname, email: verifyEmail}
     })
    }
  }
  return (
    <main>
      <BackLink to='/login'/>
      <Title level={1}>Reset your password</Title>
      <Description>Enter your user account's verified email address and we will send you a password recovery code.</Description>
      <form onSubmit={handleSubmit}>
        <AuthInput placeholder='Email' type='email' name='email' icon={faEnvelope} value={verifyEmail} 
        handleChange={e => setVerifyEmail(e.target.value)} />
        <Button type='submit'>Get code</Button>
      </form>
    </main>
  )
}
