import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionData } from '../types/socketTypes'

const initialState: SessionData = {
  sessionID: '',
  userID: '',
  username: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SessionData>) {
      state.sessionID = action.payload.sessionID
      state.userID = action.payload.userID
      state.username = action.payload.username
    },
    clearUser(state) {
      state.sessionID = ''
      state.userID = ''
      state.username = ''
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
