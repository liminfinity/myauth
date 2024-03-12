import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginPage from '../components/login/loginPage'
import SignupPage from '../components/signup/signupPage'
import { Provider } from 'react-redux'
import store from '../store'
import RequireAuth from './RequireAuth'
import AuthProvider from './AuthProvider'
import UsersPage from '../components/users/usersPage'
import MainLayout from '../components/layout/mainLayout'
import CheckEmailPage from '../components/forgot/checkEmailPage'
import SendCodePage from '../components/forgot/sendCodePage'
import RestorePasswordPage from '../components/forgot/restorePasswordPage'
import AuthLayout from '../components/layout/authLayout'

export default function RoutesProvider() {
    const routes = <>
                        <Route path='/auth' element={<AuthLayout/>}>
                            <Route path='login' element={<LoginPage/>}></Route>
                            <Route path='signup' element={<SignupPage/>}></Route>
                            <Route path='check-email' element={<CheckEmailPage/>}></Route>
                            <Route path='send-code' element={<SendCodePage/>}></Route>
                            <Route path='restore-password' element={<RestorePasswordPage/>}></Route>
                        </Route>
                        
                        <Route path='/' element={
                            <RequireAuth>
                                <MainLayout/>
                            </RequireAuth>
                        }>
                            <Route index element={<UsersPage/>}></Route>
                        </Route>
                    </>

    const router = createBrowserRouter(createRoutesFromElements(routes));
    return (
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </Provider>
    )
}
