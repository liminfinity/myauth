import React from 'react'
import Title from '../common/title'
import { Outlet } from 'react-router-dom'
import ProfileHeader from '../header/profileHeader'

export default function MainLayout() {
  return (
    <>
        <header>
            <Title level={1}>App header</Title>
            <ProfileHeader/>
        </header>
        <Outlet/>
    </>
  )
}
