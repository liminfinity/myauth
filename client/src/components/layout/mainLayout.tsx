import React from 'react'
import Title from '../common/title'
import { Outlet } from 'react-router-dom'
import ProfileHeader from '../header/profileHeader'
import { useAppSelector } from '../../hook/reduxHooks'
import Loader from '../common/loader'
import Error from '../common/error'
import { shiftError } from '../../store/reducers/usersReducer'

export default function MainLayout() {
  const {isLoading, errors} = useAppSelector(state => state.users)
  console.log(errors)
  return (
    <div className='grid grid-cols-1 grid-rows-6 justify-center'>
        {isLoading && <Loader/>}
        <header className='z-10 flex justify-between items-center p-8 glass rounded-lg row-start-1 row-span-1 col-start-1 col-span-1'>
            <Title level={1} className='text-2xl'>App header</Title>
            <ProfileHeader/>
        </header>
        <main className='mt-10 row-start-2 row-span-4 col-start-1 col-span-1 flex flex-col px-8 gap-8'>
          <Outlet/>
        </main>
        {errors.map(err => {
                return <Error key={err} shiftError={shiftError}>{err}</Error>
          })}
    </div>
  )
}
