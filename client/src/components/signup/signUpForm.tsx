import React from 'react'
import AuthInput from '../auth/authInput'
import Button from '../common/button'

export default function SignUpForm() {
  return (
    <form>
        <fieldset>
            <AuthInput/>
            <AuthInput/>
            <AuthInput/>
        </fieldset>
        <Button>Create account</Button>
    </form>
  )
}
