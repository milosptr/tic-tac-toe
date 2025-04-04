import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EndMatch, GameMatch, Session } from '../types/socketTypes'

const initialState: { matches: GameMatch[]; challenges: Session[] } = {
  matches: [],
  challenges: [],
}

const usersSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches(state, action: PayloadAction<GameMatch[]>) {
      state.matches = action.payload
    },
    setMatch(state, action: PayloadAction<GameMatch>) {
      state.matches = [
        ...state.matches.map((match) => (match.matchId === action.payload.matchId ? action.payload : match)),
      ]
    },
    endMatch(state, action: PayloadAction<EndMatch>) {
      state.matches = state.matches.map((match) => {
        if (match.matchId === action.payload.matchId) {
          return { ...match, isOngoing: false, winner: action.payload.winner }
        }
        return match
      })
    },
    addChallenge(state, action: PayloadAction<Session>) {
      if (state.challenges.find((challenge) => challenge.userID === action.payload.userID)) return
      state.challenges.push(action.payload)
    },
    removeChallenge(state, action: PayloadAction<Session>) {
      state.challenges = state.challenges.filter((challenge) => challenge.userID !== action.payload.userID)
    },
  },
})

export const { setMatches, setMatch, endMatch, addChallenge, removeChallenge } = usersSlice.actions
export default usersSlice.reducer
