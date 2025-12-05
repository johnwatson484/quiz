import { useState } from 'react'
import { useGame } from '../context/GameContext'

function HostGame() {
  const [hostName, setHostName] = useState('')
  const [gameCode, setGameCode] = useState<string | null>(null)
  const { createGame } = useGame()

  const handleCreateGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const code = createGame(hostName)
    setGameCode(code)
  }

  return (
    <div>
      <h2>Host New Game</h2>
      {!gameCode ? (
        <form onSubmit={handleCreateGame}>
          <div className="mb-3">
            <label htmlFor="hostName" className="form-label">
              Enter Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="hostName"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Game
          </button>
        </form>
      ) : (
        <div className="alert alert-success">
          <h3>Game Created!</h3>
          <p className="fs-4">Game Code: <strong>{gameCode}</strong></p>
          <p>Share this code with players so they can join.</p>
        </div>
      )}
    </div>
  )
}

export default HostGame
