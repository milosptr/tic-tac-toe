import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import matchesReducer from './matchReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    matches: matchesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
