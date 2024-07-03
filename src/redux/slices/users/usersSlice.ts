import { createSlice, PayloadAction, Reducer, Slice } from '@reduxjs/toolkit'
import { User } from '../../../schemas/userSchema'
import { RootState } from '../../store'

export interface usersState {
    users: User[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: usersState = {
    users: [],
    status: 'idle',
    error: undefined,
}

export const usersSlice: Slice<usersState> = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fillUser: (state, action: PayloadAction<User>) => {
            state.users = [...state.users, action.payload]
        },
        addUser: (state, action: PayloadAction<User>) => {
            const foundUser = state.users.find(
                (u: User) => u.email === action.payload.email
            )
            if (foundUser) return alert('User Email already exist')
            state.users = [...state.users, action.payload]
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.users = state.users.map((user) => {
                if (user.email === action.payload.email) {
                    return action.payload
                }
                return user
            })
        },
        removeUser: (state, action: PayloadAction<User>) => {
            state.users = state.users.filter(
                (user) => user.email !== action.payload.email
            )
        },
    },
})

//Selectors
export const selectAllUsers = (state: RootState) => state.users

export const { addUser, fillUser } = usersSlice.actions
const usersReducer: Reducer<usersState> = usersSlice.reducer

export default usersReducer
export type UsersSlice = typeof usersSlice
