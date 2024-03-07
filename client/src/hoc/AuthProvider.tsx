import React, { useEffect } from 'react'
import { DefaultProps } from '../types/components'
import { useAppDispatch } from '../hook/reduxHooks'
import { checkAuthAction } from '../store/reducers/authReducer'
export default function AuthProvider({children}: DefaultProps) {

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (localStorage.getItem('accessToken')) {
        dispatch(checkAuthAction());
      }
    }, [])
    
    return children;
}
