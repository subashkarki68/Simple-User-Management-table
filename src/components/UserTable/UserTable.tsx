import { usersData } from '../../sample_data'
import { columns } from './Columns'
import { DataTable } from './DataTable'

const getUsers = () => {
    return usersData
}
const UserTable = () => {
    const users = getUsers()
    console.log(users)
    return (
        <div>
            UserTable
            <DataTable columns={columns} data={users} />
        </div>
    )
}

export default UserTable
