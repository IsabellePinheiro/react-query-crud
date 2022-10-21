import React, { useState } from 'react'
import { useQuery } from 'react-query'
import * as api from './userApi'
import UserForm from './UserForm'

const UserDetails = ({userId}) => {
    const [isEditing, setIsEditing] = useState(false)

    const {data:user, isLoading, isFetching} = useQuery(['user', userId], 
    () => api.getUser(userId), {
        enabled:Boolean(userId)
    })

    if(!userId){
        return 'Select a user'
    }

    if(isLoading){
        return 'Loading user details'
    }

    return(
        <div>
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'CANCEL' : 'EDIT'}
            </button>
            {isEditing ? <UserForm user={user} setIsEditing={setIsEditing}/> : (
                <div>
                    <h2>{user.name}</h2>
                    <h2>{user.details}</h2>
                </div>
            ) }
        </div>
    )
}

export default UserDetails