import React from 'react'
import CheckBox, { CheckBoxProps } from '../common/checkBox'
import Description from '../common/description'
import { DefaultProps } from '../../types/components'

interface RememberCBProps extends DefaultProps, CheckBoxProps {
  
}

export default function RememberCB({className, checked, handleChange, name}: RememberCBProps) {
  return (
    <label className={'text-sm flex justify-center items-center gap-1 ' + (className ?? '')}>
      <CheckBox name={name} checked={checked} handleChange={handleChange} />
      <Description className={'cursor-pointer transition-all duration-100 ' + (checked ? 'text-blue ' : '')}>Remember me?</Description>
    </label>
  )
}

