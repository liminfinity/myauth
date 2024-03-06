import React, { useEffect } from 'react'
import { AuthService } from '../services/AuthService'
import { Navigate } from 'react-router-dom'
import { DefaultProps } from '../types/components'
export default function AuthProvider({children}: DefaultProps) {
    useEffect(() => {
      async function checkAuth() {
        if (localStorage.getItem('accessToken')) {
          const user = await AuthService.checkAuth();
          console.log(user)
          if (!user) return <Navigate to='/login' replace/>
          return <Navigate to='/main' replace/>
        }
      }
      checkAuth();
    }, [])
    return children;
}
