import { useState } from 'react'
import { useGame } from '../context/GameContext'

function JoinGame() {
  const [code, setCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { joinGame } = useGame()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    const success = joinGame(code.toUpperCase(), playerName)
    if (!success) {
      setError('Invalid game code. Please check and try again.')
    }
  }

  return (
    <div>
      <h2>Join Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="playerName" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gameCode" className="form-label">
            Game Code
          </label>
          <input
            type="text"
            className="form-control"
            id="gameCode"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            required
          />
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Join Game
        </button>
      </form>
    </div>
  )
}

export default JoinGame
