import { useState } from 'react'

function JoinGame() {
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Game code:', code)
  }

  return (
    <div>
      <h2>Join Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="gameCode" className="form-label">
            Enter Game Code
          </label>
          <input
            type="text"
            className="form-control"
            id="gameCode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default JoinGame
