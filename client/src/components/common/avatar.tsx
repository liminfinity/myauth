import React from 'react'
import { DefaultProps } from '../../types/components'


interface AvatarProps extends DefaultProps {
    src?: string
}
const defaultImg = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


export default function Avatar({className, src = defaultImg}: AvatarProps) {
  return (
    <img className={'avatar' + (className ?? '')} src={src} alt="user avatar"/>
  )
}
