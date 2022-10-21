import React, { useState } from 'react'
import {useMutation, useQueryClient} from 'react-query'
import * as api from './userApi'


const UserForm = ({user, setIsEditing}) => {
    const [fields, setFields] = useState({...user})
    const queryClient = new useQueryClient();
    const {isLoading, mutate} = useMutation(api.updateUser, {
        onMutate: (updateUser) => {
            queryClient.setQueryData(['user', user.id], updateUser)
            setIsEditing(false)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user', user.id])
        }
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFields({...fields, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fields)
        mutate(fields)
    }

    if(isLoading){
        return 'Saving your changes...'
    }

    return(
        <div style={{paddingTop: 20}}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:{' '}
                    <input
                        name="name"
                        type="text"
                        value={fields.name}
                        onChange={handleChange}
                        style={{width:'100%', marginBottom: 20}}
                    />
                </label>
                <label>
                    Details:{' '}
                    <input
                        name="details"
                        type="text"
                        value={fields.details}
                        onChange={handleChange}
                        style={{width:'100%', height: 100}}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default UserForm;