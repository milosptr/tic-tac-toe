import { twMerge } from 'tailwind-merge'
import { useSocket } from '../../hooks/useSocket'
import { useAppSelector } from '../../store'
import { Session, SessionData } from '../../types/socketTypes'
import { Card } from './Card'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

export const UserCard = ({ user }: { user: Session }) => {
  const [socket] = useSocket()
  const [challenged, setChallenged] = useState(false)
  const [declined, setDeclined] = useState(false)
  const currentUser = useAppSelector((state) => state.user)

  const handleChallenge = () => {
    if (!user.connected) return
    socket?.emit('game_challenge', user.userID)
    setChallenged(true)
    setDeclined(false)
  }

  const handleChallengeDeclined = (session: SessionData) => {
    if (session.userID === user.userID) {
      setChallenged(false)
      setDeclined(true)
    }
  }

  useEffect(() => {
    socket?.on('game_challenge_declined', handleChallengeDeclined)

    return () => {
      socket?.off('game_challenge_declined', handleChallengeDeclined)
    }
  }, [socket])

  const isMe = currentUser?.userID === user.userID

  return (
    <Card>
      <div className="flex items-center gap-2">
        <div className={twMerge('w-3 h-3 rounded-full', `${user.connected ? 'bg-green-500' : 'bg-red-500'}`)} />
        <div>
          <strong>{user.username}</strong> {isMe && '(you)'}
        </div>
        <div className="ml-auto flex items-center justify-end gap-2">
          {challenged && (
            <div className="ml-auto flex items-center gap-1 text-green-500 px-2 py-1">
              <div>Challenge sent</div>
              <CheckIcon className="w-4 h-4" />
            </div>
          )}
          {declined && (
            <div className="flex items-center gap-1 text-red-500 px-2 py-1">
              <div>{user.username} declined</div>
            </div>
          )}
          {!isMe && !challenged && (
            <div
              className={twMerge(
                'bg-purple-500 hover:bg-purple-600 ease-in-out duration-300 px-2 py-1 rounded-md text-white cursor-pointer select-none',
                !user.connected && 'opacity-50 hover:bg-purple-500 cursor-not-allowed',
              )}
              onClick={handleChallenge}
            >
              Challenge
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
