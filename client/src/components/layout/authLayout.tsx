import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hook/reduxHooks'
import Loader from '../common/loader'

export default function AuthLayout() {
    const {isLoading} = useAppSelector(state => state.auth)
    return (
        <div className='login-wrapper'>
            {isLoading && <Loader/>}
            <main className='login-container glass rounded-lg px-6 sm:px-10 py-8'>
                <Outlet/>
            </main>
        </div>
    )
}
