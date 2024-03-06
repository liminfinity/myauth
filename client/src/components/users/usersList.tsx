import React from 'react'
import { useAppSelector } from '../../hook/reduxHooks'
import { DefaultProps } from '../../types/components'
import User from './user'
import { isI } from '../../utils/predicates'
import { IUser } from '../../types/models'

export default function UsersList({className}: DefaultProps) {
    const {user, usersList} = useAppSelector(state => ({
        user: state.auth.user,
        usersList: state.users.usersList
    }))
    return (
        <ul className={className}>
            {usersList.map(usr => {
                return !isI((user as IUser).userId, usr.userId) ? <User key={usr.userId} {...usr}/> : undefined;
            })}
        </ul>
    )
}
