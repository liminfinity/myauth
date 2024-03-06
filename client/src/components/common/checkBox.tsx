import React, { ChangeEventHandler } from 'react'
import { DefaultProps } from '../../types/components'


export interface CheckBoxProps extends DefaultProps {
  name: string,
  checked: boolean,
  handleChange: ChangeEventHandler<HTMLInputElement>

}

export default function CheckBox({className, name, checked, handleChange}: CheckBoxProps) {
  return (
    <input type="checkbox" name={name} className={className} checked={checked} onChange={handleChange}/>
  )
}
