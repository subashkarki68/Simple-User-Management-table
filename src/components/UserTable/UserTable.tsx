import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addUser,
    fillUser,
    selectAllUsers,
} from '../../redux/slices/users/usersSlice'
import { AppDispatch } from '../../redux/store'
import { usersData } from '../../sample_data'
import { User } from '../../schemas/userSchema'
import { columns } from './Columns'
import { DataTable } from './DataTable'

const UserTable = () => {
    //Redux
    const users = useSelector(selectAllUsers)
    const dispatch: AppDispatch = useDispatch()

    const handleFillSampleData = () => {
        usersData.map((user) => {
            dispatch(fillUser(user))
        })
    }

    useEffect(() => {
        console.log('users', users)
    }, [])

    const handleAddUser = (newUser: User) => {
        console.log('Adding New User', newUser)
        if (newUser.address.country === '') newUser.address.country = 'Nepal'
        dispatch(addUser(newUser))
    }

    return (
        <div>
            {/* <ModeToggle /> */}
            <DataTable
                columns={columns}
                data={users.users}
                fillSampleData={handleFillSampleData}
                onAddUser={handleAddUser}
            />
        </div>
    )
}

export default UserTable
