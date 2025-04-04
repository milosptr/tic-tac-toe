import { BadgeButton, ChallengeCard, Header, MatchCard, Page, UserCard } from '../components'
import { Icon } from '../components/icons'
import { useSocket } from '../hooks/useSocket'
import { useAppSelector } from '../store'
import { leaveSocket } from '../services/socket'
import { useEffect } from 'react'

export const DashboardPage = () => {
  const [socket, setSocket] = useSocket()

  const user = useAppSelector((state) => state.user)
  const users = useAppSelector((state) => state.users.users) || []
  const matches = useAppSelector((state) => state.matches.matches) || []
  const challenges = useAppSelector((state) => state.matches.challenges) || []
  const activeMatches = matches.filter((m) => m.isOngoing)
  const historyMatches = matches.filter((m) => !m.isOngoing)
  const sortedUsers = [...users].sort((a, b) => {
    if (a.userID === user.userID) return -1
    if (b.userID === user.userID) return 1
    return 0
  })

  useEffect(() => {
    socket?.emit('users')
  }, [socket])

  const handleLeave = () => {
    const ongoingMatches = matches.filter((m) => m.isOngoing)
    for (const match of ongoingMatches) {
      if (match.participants.some((p) => p.userID === user.userID)) {
        localStorage.removeItem(match.matchId)
        socket?.emit('game_move', match.matchId, null, null, false, true)
      }
    }
    setSocket(leaveSocket(socket))
  }

  const noMatchesOrChallenges = challenges.length === 0 && matches.length === 0

  return (
    <div className="container">
      <Header>
        <Header.Left>
          <BadgeButton icon={<Icon.Exit />} onClick={handleLeave}>
            Exit Game
          </BadgeButton>
        </Header.Left>
        <div className="text-xl font-bold text-center w-full">Dashboard</div>
        <Header.Right>
          <div className="flex items-center gap-2">
            <div className="font-medium text-lg">{user.username}</div>
            <Icon.Profile width={28} height={28} />
          </div>
        </Header.Right>
      </Header>
      <Page className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
          <div>
            <div className="text-2xl font-bold text-center">Active Users</div>
            <div className="flex flex-col gap-3 mt-5">
              {sortedUsers?.map((u) => (
                <UserCard key={u.userID} user={u} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10">
            <div>
              <div className="text-2xl font-bold text-center">Active Matches / Challenges</div>
              {!!matches?.length && (
                <div className="flex flex-col gap-3 mt-5">
                  {activeMatches?.map((match, idx) => (
                    <MatchCard key={idx} match={match} />
                  ))}
                </div>
              )}
              {!!challenges.length && (
                <div className="flex flex-col gap-3 mt-5">
                  {challenges?.map((challenger, idx) => (
                    <ChallengeCard key={idx} challenger={challenger} />
                  ))}
                </div>
              )}
              {noMatchesOrChallenges && (
                <div className="text-center text-gray-200">No active matches or challenges</div>
              )}
            </div>
            <div>
              <div className="text-2xl font-bold text-center">Game History</div>
              {matches.length ? (
                <div className="flex flex-col gap-3 mt-5">
                  {historyMatches?.map((match, idx) => (
                    <MatchCard key={idx} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-200">You haven't played any games yet</div>
              )}
            </div>
          </div>
        </div>
      </Page>
    </div>
  )
}
