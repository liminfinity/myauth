import React from 'react'
import Title from '../common/title'
import Description from '../common/description'
import LoginForm from './loginForm'
import { Link, useLocation } from 'react-router-dom'


export default function LoginPage() {
  const location = useLocation();
  return (
    <main>
      <Title level={1}>Log in</Title>
      <LoginForm/>
      <Link to='/signup' state={{from: location.pathname}}>
        <Description>New user?</Description>
        <Description>Create account</Description>
      </Link>
    </main>
  )
}
