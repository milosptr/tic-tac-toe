import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { reconnectSocket } from '../services/socket'
import { useLocation, useNavigate } from 'react-router'
import { getStoredSession, storeSession } from '../services/session'
import { Challenge, GameMatch, Participant, Session, SessionData } from '../types/socketTypes'
import { useAppDispatch } from '../store'
import { setUser } from '../store/userReducer'
import { connectedUser, disconnectedUser, removeUser, setUsers } from '../store/usersReducer'
import { addChallenge, endMatch, removeChallenge, setMatch, setMatches } from '../store/matchReducer'

const SocketContext = createContext<[Socket | null, Dispatch<SetStateAction<Socket | null>>]>([null, () => {}])

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const session = getStoredSession()
    if (!session && pathname !== '/') {
      setSocket(null)
      navigate('/')
    } else if (session && pathname === '/') {
      setSocket(reconnectSocket())
      navigate('/dashboard')
    } else if (session) {
      setSocket(reconnectSocket())
    }
  }, [])

  if (socket) {
    socket.emit('matches')

    socket.on('session', (session: SessionData) => {
      dispatch(setUser(session))
      storeSession(session)
    })

    socket.on('users', (users: Session[]) => {
      dispatch(setUsers(users))
    })

    socket.on('connected_user', (user: Session) => {
      dispatch(connectedUser(user))
    })

    socket.on('disconnected_user', (userID: string) => {
      dispatch(disconnectedUser(userID))
    })

    socket.on('user_left', (userID: string) => {
      dispatch(removeUser(userID))
    })

    socket.on('matches', (matches: GameMatch[]) => {
      const userID = getStoredSession()?.userID
      dispatch(setMatches(matches.filter((m) => m.participants.some((p) => p.userID === userID))))
    })

    socket.on('new_match', (match: GameMatch) => {
      socket.emit('matches')
      const userID = getStoredSession()?.userID
      if (userID && match.participants.some((p) => p.userID === userID)) {
        dispatch(setMatch(match))
      }
    })

    socket.on('match_ended', (matchId: string, winner: Participant | null) => {
      socket.emit('matches')
      dispatch(endMatch({ matchId, winner }))
      localStorage.removeItem(matchId)
    })

    socket?.on('game_challenge', (challenge: Challenge) => {
      dispatch(addChallenge(challenge.challenger))
    })

    socket?.on('game_challenge_accepted', (_: string, challenger: Session) => {
      socket.emit('matches')
      dispatch(removeChallenge(challenger))
    })
  }

  return <SocketContext.Provider value={[socket, setSocket]}>{children}</SocketContext.Provider>
}

export default SocketContext
