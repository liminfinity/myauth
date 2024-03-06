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
    <label className={className}>
        <FontAwesomeIcon icon={icon}/>
        <Input {...inputProps}/>
    </label>
  )
}

