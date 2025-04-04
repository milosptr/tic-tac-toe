import { io, Socket } from 'socket.io-client'
import { getStoredSession, removeSession } from './session'

const socket = io('http://localhost:8080', {
  autoConnect: false,
})

export const connectSocket = (username: string) => {
  socket.auth = { username }
  socket.connect()

  return socket
}

export const reconnectSocket = () => {
  const storedSession = getStoredSession()

  if (storedSession) {
    socket.auth = storedSession
    socket.connect()
    return socket
  }

  return null
}

export const leaveSocket = (socket: Socket | null) => {
  socket?.emit('leave')
  removeSession()
  window.location.href = '/'

  return null
}
