import React from 'react'
import { DefaultProps } from '../../types/components'

export default function InputFields({children, className}: DefaultProps) {
  return (
    <fieldset className={'flex flex-col justify-center gap-3 ' + (className ?? '')}>
        {children}
    </fieldset>
  )
}
