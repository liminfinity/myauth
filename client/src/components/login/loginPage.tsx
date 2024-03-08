import React from 'react'
import Title from '../common/title'
import Description from '../common/description'
import LoginForm from './loginForm'
import { Link, useLocation } from 'react-router-dom'


export default function LoginPage() {
  const location = useLocation();
  return (
    <>
      <Title level={1} className='self-start'>Log in</Title>
      <LoginForm/>
      <Link className='prompt w-full' to='/auth/signup' state={{from: location.pathname}}>
        <Description className='font-medium'>New user?</Description>
        <Description> Create account</Description>
      </Link>
    </>
  )
}
