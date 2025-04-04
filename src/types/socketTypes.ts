export interface GameMatch {
  matchId: string
  participants: Participant[]
  isOngoing: boolean
  winner: Participant | null
}

export interface EndMatch {
  matchId: string
  winner: Participant | null
}

export interface Matches {
  [key: string]: GameMatch
}

export interface Participant extends Session {
  symbol: Symbol
}

export interface SessionData {
  sessionID: string
  userID: string
  username: string
}

export interface Session {
  userID: string
  username: string
  connected: boolean
}

export interface SocketData {
  sessionID: string
  userID: string
  username: string
}

export enum Symbol {
  'X' = 'X',
  'O' = 'O',
}

export interface Challenge {
  challenger: Session
}

export interface GameMove {
  symbol: Symbol
  position: number
}
