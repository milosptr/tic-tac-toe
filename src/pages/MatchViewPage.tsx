import { twMerge } from 'tailwind-merge'
import OIcon from '../assets/icons/OIcon'
import XIcon from '../assets/icons/XIcon'
import { Header } from '../components/Header'
import { Icon } from '../components/icons'
import { Page } from '../components/Page'
import { BadgeButton } from '../components/ui/BadgeButton'
import { useSocket } from '../hooks/useSocket'
import { leaveSocket } from '../services/socket'
import { useAppSelector } from '../store'
import { useNavigate, useParams } from 'react-router'
import { Button } from '../components'
import { Symbol } from '../types/socketTypes'
import { useEffect, useState } from 'react'

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const checkWinner = (boardState: (Symbol | null)[], playerSymbol: Symbol) => {
  for (const combo of winningCombinations) {
    if (
      boardState[combo[0]] === playerSymbol &&
      boardState[combo[1]] === playerSymbol &&
      boardState[combo[2]] === playerSymbol
    ) {
      return true
    }
  }

  if (!boardState.includes(null)) {
    return null
  }

  return false
}

export const MatchViewPage = () => {
  const { id } = useParams<{ id: string }>()

  const [socket, setSocket] = useSocket()
  const [symbol, setSymbol] = useState<Symbol | null>(null)
  const [turn, setTurn] = useState<Symbol>(Symbol.X)
  const [result, setResult] = useState<string | null>(null)
  const [userLeft, setUserLeft] = useState<boolean>(false)
  const [board, setBoard] = useState<(Symbol | null)[]>(Array(9).fill(null))

  const user = useAppSelector((state) => state.user)
  const users = useAppSelector((state) => state.users.users)
  const navigate = useNavigate()
  const matches = useAppSelector((state) => state.matches.matches)
  const match = matches.find((match) => match.matchId === id)

  const otherParticipant = match?.participants.find((participant) => participant.userID !== user.userID)
  const opponent = users.find((user) => user.userID === otherParticipant?.userID)

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

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  const handleAssignSymbol = (symbol: Symbol) => {
    setSymbol(symbol)
  }

  const handleMove = (position: number) => {
    if (turn !== symbol || board[position] !== null || result) {
      return
    }
    let newBoard = board
    setBoard((prev) => {
      newBoard = prev.map((_, index) => (index === position ? symbol : _))
      return newBoard
    })
    setTurn((prev) => (prev === Symbol.X ? Symbol.O : Symbol.X))

    const isGameWinningMove = checkWinner(newBoard, symbol)
    const isDraw = isGameWinningMove === null

    if (socket) {
      socket.emit('game_move', id, symbol, position, !!isGameWinningMove, isDraw)
    }
  }

  const MySymbolIcon = symbol === 'X' ? XIcon : OIcon
  const OpponentSymbolIcon = symbol === 'X' ? OIcon : XIcon

  useEffect(() => {
    if (socket) {
      socket.emit('users')
      socket.emit('matches')
      socket.emit('ready', id)
      socket.on('assign_symbol', (symbol: Symbol) => {
        handleAssignSymbol(symbol)
      })
      socket.on('game_move', (playerSymbol: Symbol, position: number) => {
        if (playerSymbol !== symbol) {
          setBoard((prev) => prev.map((_, index) => (index === position ? playerSymbol : _)))
          setTurn((prev) => (prev === Symbol.X ? Symbol.O : Symbol.X))
        }
      })
      socket.on('user_left', (userID: string) => {
        if (userID === opponent?.userID) {
          setUserLeft(true)
        }
      })
    }
    return () => {
      socket?.off('assign_symbol')
      socket?.off('game_move')
      socket?.off('user_left')
    }
  }, [socket, id, symbol])

  useEffect(() => {
    if (match && !match.isOngoing) {
      if (!match.winner) {
        setResult('draw')
      } else {
        setResult(match.winner?.userID === user.userID ? 'win' : 'lose')
      }
    }
  }, [match])

  useEffect(() => {
    if (id && board.filter(Boolean).length > 0) {
      localStorage.setItem(id, JSON.stringify({ board, turn }))
    }
  }, [id, board])

  useEffect(() => {
    if (id) {
      const board = localStorage.getItem(id)
      if (board) {
        const { board: boardState, turn: turnState } = JSON.parse(board)
        setBoard(boardState)
        setTurn(turnState)
      }
    }
  }, [id])

  return (
    <div className="container">
      <Header>
        <Header.Left>
          <BadgeButton icon={<Icon.Exit />} onClick={handleLeave}>
            Exit Game
          </BadgeButton>
        </Header.Left>
        <div className="text-lg font-bold text-center w-full">⚔️ Duel ⚔️</div>
        <Header.Right>
          <div className="flex items-center gap-3">
            <div className="text-lg font-medium cursor-pointer text-primary-400" onClick={handleGoBack}>
              Dashboard
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg">{user.username}</div>
              <Icon.Profile width={28} height={28} />
            </div>
          </div>
        </Header.Right>
      </Header>
      <Page className="flex flex-col items-center">
        {!match && (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-center">Match not found</div>
            <div className="text-gray-200 text-center">
              The match you are looking for does not exist or has has been finished.
            </div>
            <Button className="mt-5" onClick={handleGoBack}>
              Go back to dashboard
            </Button>
          </div>
        )}
        {!!match && (
          <div className="w-full flex flex-col items-center relative">
            {!!result && (
              <div className="absolute top-0 left-0 z-1 w-full h-full flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-center mt-14">
                  {result === 'win' ? 'You win!' : result === 'lose' ? 'You lose!' : 'Draw!'}
                </div>
                {userLeft && <div className="text-2xl font-bold text-center mt-2">Opponent left the game.</div>}
              </div>
            )}
            <div className={'flex items-center gap-4 mb-5'}>
              <div className="flex items-center gap-2">
                <div className={'w-3 h-3 rounded-full bg-green-500'} />
                <div className="font-medium text-lg">{user.username}</div>
                <MySymbolIcon fill="#002e4a" width={22} height={22} className="opacity-50" />
              </div>
              <div className="font-bold bg-white rounded-full px-4 text-black">vs</div>
              <div className="flex items-center gap-2">
                <OpponentSymbolIcon fill="#002e4a" width={24} height={24} className="opacity-50" />
                <div className="font-medium text-lg">{opponent?.username || 'Opponent'}</div>
                <div
                  className={twMerge(
                    'w-3 h-3 rounded-full',
                    opponent?.connected && !userLeft ? 'bg-green-500' : 'bg-red-500',
                  )}
                />
              </div>
            </div>

            <div className="text-lg font-medium text-center mb-5 animate-bounce">
              {!result && (symbol === turn ? 'Your move' : 'Waiting for opponents move...')}
            </div>

            <div className={twMerge('w-full max-w-[500px] grid grid-cols-3 grid-rows-3', !!result && 'opacity-20')}>
              {Array.from({ length: 9 }).map((_, index) => (
                <MatchCell
                  key={index}
                  disabled={turn !== symbol || !!result}
                  position={index}
                  symbol={board[index]}
                  playerSymbol={symbol}
                  onClick={() => handleMove(index)}
                />
              ))}
            </div>
          </div>
        )}
      </Page>
    </div>
  )
}

const MatchCell = ({
  position,
  disabled = false,
  playerSymbol = 'X',
  symbol = null,
  onClick,
}: {
  position: number
  disabled?: boolean
  playerSymbol?: 'X' | 'O' | null
  symbol?: 'X' | 'O' | null
  onClick: (position: number) => void
}) => {
  const getBorderClasses = (pos: number): string => {
    let classes = ''

    if (pos % 3 < 2) {
      classes += 'border-r-4 border-white '
    }

    if (pos < 6) {
      classes += 'border-b-4 border-white '
    }

    return classes
  }

  const PlaceholderIcon = playerSymbol === 'X' ? XIcon : OIcon

  const handleClick = () => {
    if (symbol) return
    onClick(position)
  }

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `group aspect-square flex items-center justify-center ${getBorderClasses(position)}`,
        !disabled && !symbol && 'cursor-pointer',
      )}
    >
      <div className="w-full sm:w-1/2">
        {!!symbol && (
          <>
            {symbol === 'X' && <XIcon width={'100%'} height={'100%'} />}
            {symbol === 'O' && <OIcon width={'100%'} height={'100%'} />}
          </>
        )}
        {!symbol && !disabled && (
          <div className={'opacity-0 group-hover:opacity-30 transition duration-500'}>
            <PlaceholderIcon width={'100%'} height={'100%'} />
          </div>
        )}
      </div>
    </div>
  )
}
