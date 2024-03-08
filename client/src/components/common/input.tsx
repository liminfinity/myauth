import React, { ChangeEventHandler } from 'react'
import { DefaultProps } from '../../types/components'

export interface InputProps extends DefaultProps {
    type?: string,
    placeholder?: string,
    value: string,
    name?: string,
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export default function Input({type='text', value, handleChange, className, placeholder, name=''}: InputProps) {
  return (
    <input name={name} type={type} value={value} onChange={handleChange} className={'input p-0 ' + (className ?? '')} placeholder={placeholder}/>
  )
}
