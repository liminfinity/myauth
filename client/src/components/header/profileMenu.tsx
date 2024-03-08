import React from 'react'
import User from '../users/user'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHooks'
import { IUser } from '../../types/models'
import Button from '../common/button'
import { deleteAccountAction, logoutAction } from '../../store/reducers/authReducer'
import { DefaultProps } from '../../types/components'

interface ProfileMenuProps extends DefaultProps {
    isOpen: boolean
}

export default function ProfileMenu({isOpen, className}: ProfileMenuProps) {
    const {user} = useAppSelector(state => state.auth) 
    const dispatch = useAppDispatch()
    
    function handleLogout() {
        dispatch(logoutAction());
    }
    function handleDeleteAccount() {
        dispatch(deleteAccountAction(user?.userId as string));
    }
    return (
        <>
            {isOpen && (
                <div className={'absolute flex justify-center flex-col whiteGlass p-5 rounded-lg gap-6 ' + (className ?? '')}>
                    <User {...(user as IUser)}/>
                    <div className='flex flex-col gap-2'>
                        <Button className='authButton ' handleClick={handleLogout}>Log out</Button>
                        <Button className='authButton ' handleClick={handleDeleteAccount}>Delete account</Button>
                    </div>
                </div>
            )}
        </>
        
    )
}
