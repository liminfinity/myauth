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
    <Link className={'flex justify-center items-center link self-start transition-all hover:text-blue ' + (className ?? '')} to={to} state={state} replace={replace}>
        <FontAwesomeIcon className='w-6 h-6' icon={faArrowLeft}/>
    </Link>
  )
}
