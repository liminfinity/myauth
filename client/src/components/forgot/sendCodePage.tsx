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
import Form from '../common/form';
import { useAppDispatch } from '../../hook/reduxHooks';
import { setLoading } from '../../store/reducers/authReducer';
import OTPInput from '../auth/otpInput';
export default function SendCodePage() {
  const startNumber = 30;
  const [indicator, setIndicator] = useCountDown(startNumber);
  
  const isCoolDown = indicator != startNumber;
  const dispatch = useAppDispatch();

  const timerId = useRef<number | undefined>(undefined);

  const [recoveryCode, setRecoveryCode] = useState<string[]>(new Array(6).fill(""));
  const location = useLocation();
  const navigate = useNavigate();
  const {from, email} = location.state as locationState & {email: string} || {};
  if (from != '/auth/check-email') return <Navigate to='/auth/login' replace/>

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(setLoading(true));
    const validated = await ForgotService.sendCode(email, recoveryCode.join(''));
    if (validated) {
      navigate('/auth/restore-password', {
        state:{from: location.pathname, email: email}
       })
    }
    dispatch(setLoading(false));
  }
  async function sendAgain() {
    dispatch(setLoading(true));
    await ForgotService.generateNewCode(email);
    dispatch(setLoading(false));
    timerId.current = setTimeout(function start() {
      setIndicator(prevState => {
        if (!prevState) {
          clearTimeout(timerId.current)
          return startNumber;
        }
        else {
          return prevState - 1
        }
      
      });
      timerId.current = setTimeout(start, 1000)  
    })

  }
  return (
    <>
      <BackLink to={from} replace state={{from: location.pathname}}/>
      <Title level={1} className='self-start'>Enter recovery code</Title>
      <Description className='text-center'>The recovery code was sent to {email}.</Description>
      <Form handleSubmit={handleSubmit}>
        <OTPInput otp={recoveryCode} setOTP={setRecoveryCode} />
        <Button type='submit' className='authButton'>Send code</Button>
        <Button  className={'button hover:text-blue p-0 ' + (isCoolDown ? 'hover:text-inherit cursor-auto' : '')} handleClick={sendAgain} disabled={isCoolDown}>{isCoolDown ? minuteFormatBySecond(indicator) : 'Code didn’t appear? Send again'}</Button>
      </Form>
    </>
  )
}
