import React from 'react'
import { DefaultProps } from '../../types/components'

export default function Description({children, className}: DefaultProps) {
  return (
    <span className={className}>{children}</span>
  )
}
