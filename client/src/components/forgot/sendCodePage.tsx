import React, { FormEvent, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { locationState } from '../../types/routers';
import Title from '../common/title';
import Description from '../common/description';
import { ForgotService } from '../../services/ForgotService';
import Button from '../common/button';
import Input from '../common/input';
import BackLink from '../common/backLink';
import { useCountDown } from '../../hook/useCountDown';
import { minuteFormatBySecond } from '../../utils/format';
export default function SendCodePage() {
  const startNumber = 30;
  const [indicator, setIndicator] = useCountDown(startNumber);
  
  const isCoolDown = indicator != startNumber;
  console.log(isCoolDown)

  const timerId = useRef<number | undefined>(undefined);

  const [recoveryCode, setRecoveryCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const {from, email} = location.state as locationState & {email: string} || {};
  if (from != '/check-email') return <Navigate to='/login' replace/>

  

  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    const validated = await ForgotService.sendCode(email, recoveryCode);
    if (validated) {
      navigate('/restore-password', {
        state:{from: location.pathname, email: email}
       })
    }
  }
  async function sendAgain() {
    await ForgotService.generateNewCode(email);
    timerId.current = setInterval(() => {
      setIndicator(prevState => {
        if (!prevState) {
          clearInterval(timerId.current)
          return startNumber;
        }
        else {
          return prevState - 1
        }
      });
    }, 1000)

  }
  return (
    <main>
      <BackLink to={from} replace state={{from: location.pathname}}/>
      <Title level={1}>Enter recovery code</Title>
      <Description>The recovery code was sent to {email}.</Description>
      <form onSubmit={handleSubmit}>
        <Input placeholder='Code' value={recoveryCode} 
        handleChange={e => setRecoveryCode(e.target.value)} />
        <Button type='submit'>Send code</Button>
        <Button handleClick={sendAgain} disabled={isCoolDown}>{isCoolDown ? minuteFormatBySecond(indicator) : 'Code didn’t appear? Send again'}</Button>
      </form>
    </main>
  )
}
