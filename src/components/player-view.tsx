import { useState } from 'react'
import { useGame } from '../context/GameContext'

function PlayerView() {
  const [answer, setAnswer] = useState('')
  const { game, currentPlayerId, submitAnswer } = useGame()

  if (!game || !currentPlayerId) return null

  const currentPlayer = game.players.find(p => p.id === currentPlayerId)
  const hasSubmittedAnswer = game.currentQuestion?.answers.some(a => a.playerId === currentPlayerId)

  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitAnswer(answer)
    setAnswer('')
  }

  return (
    <div>
      <div className="mb-4">
        <h2>Quiz Game</h2>
        <p><strong>Player:</strong> {currentPlayer?.name}</p>
        <p><strong>Score:</strong> {currentPlayer?.score} points</p>
        <p><strong>Game Code:</strong> {game.code}</p>
      </div>

      <div className="mb-4">
        <h3>Players in Game ({game.players.length})</h3>
        <ul className="list-group">
          {game.players.map(player => (
            <li key={player.id} className="list-group-item d-flex justify-content-between align-items-center">
              {player.name}
              <span className="badge bg-secondary">{player.score} points</span>
            </li>
          ))}
        </ul>
      </div>

      {game.status === 'waiting' && (
        <div className="alert alert-info">
          Waiting for the host to start the game...
        </div>
      )}

      {game.status === 'playing' && game.currentQuestion && (
        <div className="mb-4">
          <h3>Question</h3>
          <p className="fs-5">{game.currentQuestion.text}</p>

          {game.currentQuestion.acceptingAnswers ? (
            hasSubmittedAnswer ? (
              <div className="alert alert-success">
                Your answer has been submitted! Waiting for other players...
              </div>
            ) : (
              <form onSubmit={handleSubmitAnswer}>
                <div className="mb-3">
                  <label htmlFor="answer" className="form-label">
                    Your Answer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Answer
                </button>
              </form>
            )
          ) : (
            <div className="alert alert-warning">
              Answers are no longer being accepted. Waiting for host to review...
            </div>
          )}
        </div>
      )}

      {!game.currentQuestion && game.status === 'playing' && (
        <div className="alert alert-info">
          Waiting for the next question...
        </div>
      )}
    </div>
  )
}

export default PlayerView
