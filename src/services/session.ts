import { SessionData } from '../types/socketTypes'

const SESSION_KEY = '@session'

export const getStoredSession = (): SessionData | null => {
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? (JSON.parse(session) as SessionData) : null
  } catch (error) {
    console.error('Failed to parse session from localStorage:', error)
    removeSession()
    return null
  }
}

export const storeSession = (session: SessionData): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch (error) {
    console.error('Failed to store session:', error)
  }
}

export const removeSession = (): void => {
  localStorage.removeItem(SESSION_KEY)
}
