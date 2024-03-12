import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../common/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import ProfileMenu from './profileMenu'

export default function ProfileHeader() {
  const [isOpen, setOpen] = useState(false);

  function handleClick() {
    setOpen(!isOpen)
  }
  const modalRef = useRef<HTMLDivElement>(null);

  function handleOutsideClick(e: MouseEvent) {
    if (modalRef.current) {
      if (!modalRef.current.contains(e.target as Node | null)) {
        setOpen(false)
      }
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, []) 

  return (
    <div className='flex items-center justify-center gap-3'>
        <Avatar className='w-14'/>
        <div ref={modalRef} className='relative'>
          <FontAwesomeIcon onClick={handleClick} className={'cursor-pointer transition-all w-6 h-6 ' + (isOpen ? 'text-blue rotate-180' : '')} icon={faAngleDown}/>
          <ProfileMenu className='right-0 top-20 animate-openModal' isOpen={isOpen}/>
        </div>
    </div>
  )
}
