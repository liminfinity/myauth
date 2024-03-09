import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hook/reduxHooks'
import Loader from '../common/loader'
import Error from '../common/error'
import { shiftError } from '../../store/reducers/authReducer'
export default function AuthLayout() {
    const {isLoading, errors} = useAppSelector(state => state.auth)
    return (
        <div className='login-wrapper'>
            {isLoading && <Loader/>}
            <main className='login-container glass rounded-lg px-6 sm:px-10 py-8'>
                <Outlet/>
            </main>
            {errors.map(err => {
                return <Error key={err} shiftError={shiftError}>{err}</Error>
            })}
        </div>
    )
}
