import React from 'react'
import Input, { InputProps } from '../common/input'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/free-solid-svg-icons'
import { DefaultProps } from '../../types/components'

interface AuthInputProps extends DefaultProps, InputProps {
    icon: IconDefinition
}

export default function AuthInput({icon, className, ...inputProps}: AuthInputProps) {
  return (
    <label className={'border-2 rounded-full py-2 px-4 flex justify-center items-center gap-3 transition-all duration-300  focus-within:border-blue' + (className ?? '')} >
        <FontAwesomeIcon className='icon' icon={icon}/>
        <Input {...inputProps} className='flex-grow'/>
    </label>
  )
}

