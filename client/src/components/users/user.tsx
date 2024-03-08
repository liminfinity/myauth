import React from 'react'
import { IUser } from '../../types/models'
import { DefaultProps } from '../../types/components'
import Avatar from '../common/avatar'
import Description from '../common/description'
import Title from '../common/title'

interface UserProps extends DefaultProps, Omit<IUser, 'userId'> {}

export default function User({className, username, email}: UserProps) {
  return (
    <li className={'glass list-none rounded-xl p-4 flex justify-center items-center flex-col gap-3 ' + (className ?? '')}>
        <Avatar/>
        <div className='flex flex-col'>
            <Title level={3} className='text-center'>{username}</Title>
            <Description>{email}</Description>
        </div>
    </li>
  )
}
