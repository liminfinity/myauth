import React from 'react'
import UsersList from './usersList'
import SearchForm from '../search/searchForm'


export default function UsersPage() {
  return (
    <main>
      <SearchForm/>
      <UsersList/>
    </main>
  )
}