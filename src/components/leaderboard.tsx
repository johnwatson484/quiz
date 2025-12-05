import { useGame } from '../context/GameContext'

function Leaderboard() {
  const { game, setView } = useGame()

  if (!game) return null

  // Sort players by score in descending order
  const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score)

  return (
    <div>
      <div className="mb-4 text-center">
        <h2>🏆 Final Leaderboard 🏆</h2>
        <p>Game Code: {game.code}</p>
      </div>

      <div className="mb-4">
        <div className="list-group">
          {sortedPlayers.map((player, index) => (
            <div 
              key={player.id}
              className={`list-group-item ${index === 0 ? 'list-group-item-warning' : ''}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fs-4 me-3">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `${index + 1}.`}
                  </span>
                  <strong className="fs-5">{player.name}</strong>
                  {player.isHost && <span className="badge bg-primary ms-2">Host</span>}
                </div>
                <span className="badge bg-success fs-5">{player.score} points</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button 
          className="btn btn-primary"
          onClick={() => setView('menu')}
        >
          Back to Menu
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
