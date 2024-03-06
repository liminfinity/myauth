import React from 'react'
import CheckBox, { CheckBoxProps } from '../common/checkBox'
import Description from '../common/description'
import { DefaultProps } from '../../types/components'

interface RememberCBProps extends DefaultProps, CheckBoxProps {
  
}

export default function RememberCB({className, checked, handleChange, name}: RememberCBProps) {
  return (
    <label className={className}>
      <CheckBox name={name} checked={checked} handleChange={handleChange} />
      <Description>Remember me?</Description>
    </label>
  )
}

