import React from 'react'
import User from '../users/user'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHooks'
import { IUser } from '../../types/models'
import Button from '../common/button'
import { deleteAccountAction, logoutAction } from '../../store/reducers/authReducer'

export default function ProfileMenu() {
    const {user} = useAppSelector(state => state.auth) 
    const dispatch = useAppDispatch()
    
    function handleLogout() {
        dispatch(logoutAction());
    }
    function handleDeleteAccount() {
        dispatch(deleteAccountAction(user?.userId as string));
    }
    return (
        <div>
            <User {...(user as IUser)}/>
            <Button handleClick={handleLogout}>Log out</Button>
            <Button handleClick={handleDeleteAccount}>Delete account</Button>
        </div>
    )
}
