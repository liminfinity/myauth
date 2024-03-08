import React, { useState } from 'react'
import Title from '../common/title'
import SignUpForm from './signUpForm'
import { Link, useLocation } from 'react-router-dom'
import Description from '../common/description'
import { locationState } from '../../types/routers'
import BackLink from '../common/backLink'
import { useAppSelector } from '../../hook/reduxHooks'
import Loader from '../common/loader'


export default function SignupPage() {
  const location = useLocation();
  const state = location.state as locationState
  const [activatedEmail, setActivatedEmail] = useState('');
  return (
    <>
      {state?.from && <BackLink to={state.from}/>}
      <Title level={1} className='self-start'>Create New account</Title>
      <SignUpForm setActivatedEmail={setActivatedEmail}/>
      <Link className='prompt w-full' to='/auth/login'>
        <Description className='font-medium'>Already a User?</Description>
        <Description>Log in</Description>
      </Link>
      {activatedEmail && <Description className='success'>Go to {activatedEmail} for activation your account</Description>}
    </>
  )
}
