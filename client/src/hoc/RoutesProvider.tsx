import React from 'react'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginPage from '../components/login/loginPage'
import SignupPage from '../components/signup/signupPage'
import MainPage from '../components/main/mainPage'
import ForgotPage from '../components/login/forgotPage'
import { Provider } from 'react-redux'
import store from '../store'
import RequireAuth from './RequireAuth'

export default function RoutesProvider() {
    const routes = <>
                        <Route path='/' element={<Navigate to='/login' replace/>}></Route>
                        <Route path='/login' element={<LoginPage/>}></Route>
                        <Route path='/forgot' element={<ForgotPage/>}></Route>
                        <Route path='/signup' element={<SignupPage/>}></Route>
                        <Route path='/main' element={
                            <RequireAuth>
                                <MainPage/>
                            </RequireAuth>
                        }></Route>
                    </>

    const router = createBrowserRouter(createRoutesFromElements(routes));
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}
