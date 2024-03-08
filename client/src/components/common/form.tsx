import React, { FormEvent } from 'react'
import { DefaultProps } from '../../types/components'

interface FormProps extends DefaultProps {
    handleSubmit: (e: FormEvent) => void
}

export default function Form({children, className, handleSubmit}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className={'form ' + (className ?? '')}>
        {children}
    </form>
  )
}
