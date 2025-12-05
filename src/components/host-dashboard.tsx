import { useState } from 'react'
import { useGame } from '../context/GameContext'

function HostDashboard() {
  const [questionText, setQuestionText] = useState('')
  const { game, addQuestion, acceptAnswers, awardPoint, endGame, nextQuestion } = useGame()

  if (!game) return null

  const handleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addQuestion(questionText)
    setQuestionText('')
  }

  const handleNextQuestion = () => {
    nextQuestion()
  }

  return (
    <div>
      <div className="mb-4">
        <h2>Host Dashboard</h2>
        <p><strong>Game Code:</strong> {game.code}</p>
        <p><strong>Status:</strong> {game.status}</p>
      </div>

      <div className="mb-4">
        <h3>Players ({game.players.length})</h3>
        <ul className="list-group">
          {game.players.map(player => (
            <li key={player.id} className="list-group-item d-flex justify-content-between align-items-center">
              {player.name} {player.isHost && <span className="badge bg-primary">Host</span>}
              <span className="badge bg-secondary">{player.score} points</span>
            </li>
          ))}
        </ul>
      </div>

      {!game.currentQuestion ? (
        <div className="mb-4">
          <h3>Ask a Question</h3>
          <form onSubmit={handleSubmitQuestion}>
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question
              </label>
              <input
                type="text"
                className="form-control"
                id="question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Question
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-4">
          <h3>Current Question</h3>
          <p className="fs-5">{game.currentQuestion.text}</p>
          
          {game.currentQuestion.acceptingAnswers ? (
            <div>
              <p>Waiting for answers... ({game.currentQuestion.answers.length} received)</p>
              <button 
                className="btn btn-warning"
                onClick={acceptAnswers}
                disabled={game.currentQuestion.answers.length === 0}
              >
                Accept Answers
              </button>
            </div>
          ) : (
            <div>
              <h4>Review Answers</h4>
              {game.currentQuestion.answers.length === 0 ? (
                <p>No answers submitted.</p>
              ) : (
                <div className="list-group mb-3">
                  {game.currentQuestion.answers.map((answer) => (
                    <div 
                      key={answer.playerId}
                      className={`list-group-item ${answer.awarded ? 'list-group-item-success' : ''}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{answer.playerName}:</strong> {answer.answer}
                        </div>
                        <button
                          className={`btn btn-sm ${answer.awarded ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => awardPoint(answer.playerId)}
                        >
                          {answer.awarded ? '✓ Point Awarded' : 'Award Point'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button 
                className="btn btn-primary me-2"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
              <button 
                className="btn btn-danger"
                onClick={endGame}
              >
                End Game
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HostDashboard
