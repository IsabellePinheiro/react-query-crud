import React from 'react'
import { useQuery } from 'react-query'
import * as api from './userApi'

const Users = ({setUserId}) => {
    const {data, isLoading, isError, error} = useQuery('users', api.getUsers)
    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }

    if(isError){
        return(
            <div>{error.message}</div>
        )
    }
    return (
        <div>
            <ul>{data?.map(user => (
                <li key={user.id}>{user.name}
                    <button onClick={() => setUserId(user.id)}>View</button>
                </li>))}
            </ul>
        </div>
    )
}

export default Users