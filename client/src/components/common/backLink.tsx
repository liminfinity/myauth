import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { DefaultProps } from '../../types/components'
import { Link } from 'react-router-dom'

interface BackBtnProps extends DefaultProps {
    to: string
}

export default function BackLink({className, to}: BackBtnProps) {
  return (
    <Link className={className} to={to}>
        <FontAwesomeIcon icon={faArrowLeft}/>
    </Link>
  )
}
