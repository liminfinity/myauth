import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { DefaultProps } from '../../types/components'
import { Link } from 'react-router-dom'
import { locationState } from '../../types/routers'

interface BackBtnProps extends DefaultProps {
    to: string,
    state?: locationState
    replace?: boolean
}

export default function BackLink({className, to, state, replace}: BackBtnProps) {
  return (
    <Link className={className} to={to} state={state} replace={replace}>
        <FontAwesomeIcon icon={faArrowLeft}/>
    </Link>
  )
}
