import React from 'react'
import Avatar from '../common/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import ProfileMenu from './profileMenu'

export default function ProfileHeader() {
  return (
    <div>
        <Avatar/>
        <div>
          <FontAwesomeIcon icon={faArrowDown}/>
          <ProfileMenu/>
        </div>
    </div>
  )
}
