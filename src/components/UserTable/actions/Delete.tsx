import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { removeUser } from '@/redux/slices/users/usersSlice'
import { useDispatch } from 'react-redux'

const Delete = ({ email }: { email: string }) => {
    const dispatch = useDispatch()
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger
                    className={`grow bg-violet-900 ${buttonVariants({ variant: 'destructive' })}`}
                >
                    Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={`${buttonVariants({ variant: 'destructive' })}`}
                            onClick={() => dispatch(removeUser({ email }))}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Delete
