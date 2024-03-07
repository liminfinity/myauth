import React, { MouseEventHandler } from 'react'
import { DefaultProps } from '../../types/components'

interface ButtonProps extends DefaultProps {
    type?: 'button' | 'submit' | 'reset',
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
}

export default function Button({disabled, children, className, handleClick, type='button'}: ButtonProps) {
    
  return (
    <button disabled={disabled} type={type} onClick={handleClick} className={className}>{children}</button>
  )
}
