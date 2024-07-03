import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { AddressType, User } from '../../schemas/userSchema'
import UserForm from '../Form/UserForm'
import { Button, buttonVariants } from '../ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'profilePicture',
        header: '',
        cell: ({ row }) => {
            return <img src={row.getValue('profilePicture')} alt="PP" />
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        cell: ({ row }) => {
            const address: AddressType = row.getValue('address')
            return <span>{address.province}</span>
        },
    },
    {
        accessorKey: 'dob',
        header: ({ column }) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    DOB
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'actions',
        header: ' ',
        cell: () => (
            <div className="flex justify-evenly gap-2">
                <Sheet>
                    <SheetTrigger
                        className={`grow button ${buttonVariants({ variant: 'secondary' })}`}
                    >
                        Edit
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Edit User</SheetTitle>
                            <UserForm />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Button variant={'destructive'} className="grow bg-violet-900">
                    Delete
                </Button>
            </div>
        ),
    },
]
