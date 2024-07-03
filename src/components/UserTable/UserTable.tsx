import { useDispatch, useSelector } from 'react-redux'
import {
    fillUser,
    resetData,
    selectAllUsers,
} from '../../redux/slices/users/usersSlice'
import { AppDispatch } from '../../redux/store'
import { usersData } from '../../sample_data'
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
    const handleDataReset = () => {
        dispatch(resetData())
    }

    return (
        <div>
            {/* <ModeToggle /> */}
            <DataTable
                columns={columns}
                data={users.users}
                fillSampleData={handleFillSampleData}
                handleDataReset={handleDataReset}
            />
        </div>
    )
}

export default UserTable
