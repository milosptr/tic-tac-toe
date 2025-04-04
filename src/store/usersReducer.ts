import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session } from '../types/socketTypes'

const initialState: { users: Session[] } = {
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Session[]>) {
      state.users = [...action.payload]
    },
    connectedUser(state, action: PayloadAction<Session>) {
      const user = state.users.find((user) => user.userID === action.payload.userID)
      if (user) {
        user.connected = true
      } else {
        state.users.push({ ...action.payload, connected: true })
      }
    },
    disconnectedUser(state, action: PayloadAction<string>) {
      state.users = state.users.map((user) => {
        if (user.userID === action.payload) {
          return { ...user, connected: false }
        }
        return user
      })
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((user) => user.userID !== action.payload)
    },
  },
})

export const { setUsers, connectedUser, disconnectedUser, removeUser } = usersSlice.actions
export default usersSlice.reducer
