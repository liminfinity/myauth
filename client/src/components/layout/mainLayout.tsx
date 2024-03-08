import React from 'react'
import Title from '../common/title'
import { Outlet } from 'react-router-dom'
import ProfileHeader from '../header/profileHeader'

export default function MainLayout() {
  return (
    <div className='grid grid-cols-1 grid-rows-6 justify-center gap-10'>
        <header className='z-10 flex justify-between items-center p-8 glass rounded-lg row-start-1 row-span-1 col-start-1 col-span-1'>
            <Title level={1} className='text-2xl'>App header</Title>
            <ProfileHeader/>
        </header>
        <main className='row-start-2 row-span-4 col-start-1 col-span-1 flex flex-col px-8 gap-8'>
          <Outlet/>
        </main>
        
    </div>
  )
}
