import React from 'react'
import UsersList from './usersList'
import SearchForm from '../search/searchForm'
import { useAppSelector } from '../../hook/reduxHooks'
import Loader from '../common/loader'


export default function UsersPage() {
  const {isLoading} = useAppSelector(state => state.users)
  console.log(isLoading)
  return (
    <>
      <SearchForm/>
      <UsersList className='myGrid grid gap-4 px-8'/>
    </>
  )
}