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
import Delete from './actions/Delete'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'profilePicture',
        header: '',
        cell: ({ row }) => {
            return (
                <img
                    width={'60px'}
                    height={'60px'}
                    className="rounded-full object-contain"
                    src={row.getValue('profilePicture')}
                    alt="PP"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src =
                            'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0'
                    }}
                />
            )
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
                    {address?.city || ''}, {address?.country || ''}
                </span>
            )
        },
    },
    {
        accessorKey: 'province',
        header: 'Province',
        cell: ({ row }) => {
            const address: AddressType = row.getValue('address')
            return <span>{address?.province || '3'}</span>
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
        cell: ({ row }) => (
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
                            <UserForm
                                initialUser={row.original}
                                editingUser={true}
                            />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Delete email={row.original.email} />
            </div>
        ),
    },
]
