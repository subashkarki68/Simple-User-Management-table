import { ColumnDef } from '@tanstack/react-table'
import { AddressType, User } from '../../schemas/userSchema'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'profilePicture',
        header: '',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
    },
    {
        accessorKey: 'address',
        header: 'Address',
        cell: ({ row }) => {
            const address: AddressType = row.getValue('address')
            return (
                <span>
                    {address.city}, {address.country}
                </span>
            )
        },
    },
    {
        accessorKey: 'province',
        header: 'Province',
        cell: ({ row }) => row.original.address.province,
    },
    {
        accessorKey: 'dob',
        header: 'DOB',
    },
]
