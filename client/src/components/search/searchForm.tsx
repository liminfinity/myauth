import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AuthInput from '../auth/authInput'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '../../hook/reduxHooks';
import { getUsersAction } from '../../store/reducers/usersReducer';

export default function SearchForm() {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        handleSubmit()
    }, [])
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleSubmit(e?: FormEvent) {
        e?.preventDefault();
        dispatch(getUsersAction(query))
    }
  return (
    <form onSubmit={handleSubmit}>
        <AuthInput icon={faSearch} value={query} handleChange={handleChange} placeholder='Search' type='search'/>
    </form>
  )
}
