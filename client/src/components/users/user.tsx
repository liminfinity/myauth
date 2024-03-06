import React from 'react'
import { IUser } from '../../types/models'
import { DefaultProps } from '../../types/components'
import Avatar from '../common/avatar'
import Description from '../common/description'
import Title from '../common/title'

interface UserProps extends DefaultProps, Omit<IUser, 'userId'> {}

export default function User({className, username, email}: UserProps) {
  return (
    <li className={className}>
        <Avatar/>
        <div>
            <Title level={3}>{username}</Title>
            <Description>{email}</Description>
        </div>
    </li>
  )
}
