import { Button, Header, Page, TextInput } from '../components'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSocket } from '../hooks/useSocket'
import { connectSocket } from '../services/socket'

export const WelcomePage = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [, setSocket] = useSocket()
  const [isError, setIsError] = useState('')

  const handleUsernameChange = (e: string) => {
    setUsername(e)
  }

  const handleStartGame = () => {
    if (username.trim()) {
      const socket = connectSocket(username)
      setSocket(socket)
      socket?.on('connect_error', (error) => {
        setIsError(error.message)
      })
      socket?.on('connect', () => {
        navigate('/dashboard')
      })
    }
  }

  const isDisabled = username.length < 3

  return (
    <div className="container">
      <Header>
        <div className="col-span-3 text-xl font-bold text-center w-full">Tic Tackity Toe</div>
      </Header>
      <Page className="flex flex-col justify-center items-center">
        <div className="text-3xl font-bold text-center">Welcome to the Game</div>
        <div className="w-full flex flex-col gap-2 items-center mt-10">
          <div>Choose your nickname</div>
          <TextInput
            placeholder="Enter your username"
            onChange={handleUsernameChange}
            onKeyDown={() => setIsError('')}
            className="w-full sm:w-1/2 text-black text-center"
          />
          <Button className="w-full sm:w-1/2" onClick={handleStartGame} disabled={isDisabled}>
            Start the Game
          </Button>
          <div className="text-red-500 h-8 w-full sm:w-1/2">
            {isError && (
              <div className="h-full capitalize flex items-center justify-center px-4 rounded-md border-1 border-red-500 bg-red-500/40 text-white">
                {isError}
              </div>
            )}
          </div>
        </div>
      </Page>
    </div>
  )
}
