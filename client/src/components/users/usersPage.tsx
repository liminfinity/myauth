import React from 'react'
import UsersList from './usersList'
import SearchForm from '../search/searchForm'


export default function UsersPage() {
  return (
    <>
      <SearchForm/>
      <UsersList className='myGrid grid gap-4 px-8'/>
    </>
  )
}