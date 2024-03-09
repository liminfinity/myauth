import React, { ChangeEvent, FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { locationState } from '../../types/routers';
import { ForgotService } from '../../services/ForgotService';
import { useAppDispatch } from '../../hook/reduxHooks';
import { pushError, setLoading, setUser } from '../../store/reducers/authReducer';
import AuthInput from '../auth/authInput';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/button';
import Title from '../common/title';
import Form from '../common/form';
import { getErrorMessage } from '../../utils/format';
export default function RestorePasswordPage() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useImmer({
    password: '',
    confirmPassword: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const {from, email} = location.state as locationState & {email: string} || {};
  if (from != '/auth/send-code') return <Navigate to='/auth/login' replace/>

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(draft => {
      const input = e.target;
      draft[input.name] = input.value;
    })
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await ForgotService.restorePassword(email, form.password, form.confirmPassword);
      if (user) {
        dispatch(setUser(user))
        navigate('/', {
          replace: true
        })
      }
    } catch(err) {
      dispatch(pushError(getErrorMessage(err as Error)))
    }
    
    dispatch(setLoading(false));
  }
  return (
    <>
      <Title level={1} className='self-start'>Enter new password</Title>
      <Form handleSubmit={handleSubmit}>
        <AuthInput placeholder='Password' type='password' name='password' icon={faLock} value={form.password} 
        handleChange={handleChange} />
        <AuthInput placeholder='Confirm password' type='password' name='confirmPassword' icon={faLock} value={form.confirmPassword} 
        handleChange={handleChange} />
        <Button type='submit' className='authButton'>Reset</Button>
      </Form>
    </>
  )
}
