import React from 'react'
import Avatar from '../common/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import ProfileMenu from './profileMenu'
import Loader from '../common/loader'

export default function ProfileHeader() {
  return (
    <div>
        <Avatar/>
        <div>
          <FontAwesomeIcon icon={faAngleDown}/>
          <ProfileMenu/>
        </div>
    </div>
  )
}
