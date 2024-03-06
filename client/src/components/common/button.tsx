import React, { MouseEventHandler } from 'react'
import { DefaultProps } from '../../types/components'

interface ButtonProps extends DefaultProps {
    type?: 'button' | 'submit' | 'reset',
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({children, className, handleClick, type='button'}: ButtonProps) {
    
  return (
    <button type={type} onClick={handleClick} className={className}>{children}</button>
  )
}
