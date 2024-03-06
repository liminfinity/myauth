import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { DefaultProps } from '../types/components';
import { useAppSelector } from '../hook/reduxHooks';



export default function RequireAuth({children}: DefaultProps) {
    const location = useLocation();
    const {user} = useAppSelector(state => state.auth);
    if (!user) {
        return <Navigate to='/login' state={{from: location.pathname}}/>
    }
    return children;
}
