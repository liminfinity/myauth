import React from 'react'
import Title from '../common/title'
import SignUpForm from './signUpForm'
import { Link, useLocation } from 'react-router-dom'
import Description from '../common/description'
import { locationState } from '../../types/routers'
import BackLink from '../common/backLink'
import { useAppSelector } from '../../hook/reduxHooks'


export default function SignupPage() {
  const location = useLocation();
  const state = location.state as locationState
  const {activatedEmail} = useAppSelector(state => state.auth)
  return (
    <main>
      {state?.from && <BackLink to={state.from}/>}
      <Title level={1}>Create New account</Title>
      <SignUpForm/>
      <Link to='/login'>
        <Description>Already a User?</Description>
        <Description>Log in</Description>
      </Link>
      {activatedEmail && <Description>Go to {activatedEmail} for activation your account</Description>}
    </main>
  )
}
