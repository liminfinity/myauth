import React from 'react'
import User from '../users/user'
import { useAppSelector } from '../../hook/reduxHooks'
import { IUser } from '../../types/models'
import Button from '../common/button'

export default function ProfileMenu() {
    const {user} = useAppSelector(state => state.auth) 
    return (
        <div>
            <User {...(user as IUser)}/>
            <Button>Log out</Button>
            <Button>Delete account</Button>
        </div>
    )
}
