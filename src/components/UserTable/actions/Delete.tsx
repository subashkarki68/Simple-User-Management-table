import { Button } from '@/components/ui/button'
import { removeUser } from '@/redux/slices/users/usersSlice'
import { useDispatch } from 'react-redux'

const Delete = ({ email }: { email: string }) => {
    const dispatch = useDispatch()
    return (
        <div>
            <Button
                variant={'destructive'}
                className="grow bg-violet-900"
                onClick={() => {
                    dispatch(removeUser({ email }))
                }}
            >
                Delete
            </Button>
        </div>
    )
}

export default Delete
