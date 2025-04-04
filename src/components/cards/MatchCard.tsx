import { useAppSelector } from '../../store'
import { GameMatch } from '../../types/socketTypes'
import { Button } from '../ui/Button'
import { Card } from './Card'
import { useNavigate } from 'react-router'

export const MatchCard = ({ match }: { match: GameMatch }) => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const duelBetween = match.participants.map((p) => p.username).join(' vs ')
  const isOngoing = match.isOngoing
  const isWinner = match.winner?.userID === user.userID
  const isDraw = !match.winner && !match.isOngoing

  const handlePlay = () => {
    navigate(`/match/${match.matchId}`)
  }

  return (
    <Card>
      <div className="flex justify-between gap-3">
        <div className="font-semibold">{duelBetween} ⚔️</div>
        {isOngoing && (
          <div className="flex items-center gap-2">
            <div className={'text-center text-primary-400'}>Ongoing</div>
            <div className={'w-3 h-3 rounded-full bg-primary-400 animate-pulse'} />
          </div>
        )}
        {isOngoing && (
          <Button className="py-0 w-24" onClick={handlePlay}>
            Play
          </Button>
        )}
        {!isOngoing && (
          <>
            {isDraw && <div className={'w-24 text-right text-black'}>Draw</div>}
            {!isDraw && isWinner && <div className={'w-24 text-right text-green-500'}>Won</div>}
            {!isDraw && !isWinner && <div className={'w-24 text-right text-red-600'}>Lost</div>}
          </>
        )}
      </div>
    </Card>
  )
}
