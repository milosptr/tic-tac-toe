import { Session } from '../../types/socketTypes'
import { Card } from './Card'
import { Button } from '../ui/Button'
import { useSocket } from '../../hooks/useSocket'
import { uuidv7 } from 'uuidv7'
import { useAppDispatch } from '../../store'
import { removeChallenge } from '../../store/matchReducer'
import { useNavigate } from 'react-router'

type Props = {
  challenger: Session
}

export const ChallengeCard = ({ challenger }: Props) => {
  const [socket] = useSocket()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAcceptChallenge = () => {
    const matchID = uuidv7()
    socket?.emit('game_challenge_accepted', matchID, challenger.userID)
    dispatch(removeChallenge(challenger))
    socket?.emit('matches')
    navigate(`/match/${matchID}`)
  }

  const handleDeclineChallenge = () => {
    socket?.emit('game_challenge_declined', challenger.userID)
    dispatch(removeChallenge(challenger))
  }

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold">{challenger.username}</span> challenged you to a duel ⚔️
        </div>
        <div className="flex gap-2">
          <Button className="py-0 text-white" onClick={handleAcceptChallenge}>
            Accept
          </Button>
          <Button className="py-0 bg-red-400 hover:bg-red-500 text-white" onClick={handleDeclineChallenge}>
            Decline
          </Button>
        </div>
      </div>
    </Card>
  )
}
