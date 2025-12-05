import { useGame } from './context/GameContext'
import Menu from './components/menu.tsx'
import JoinGame from './components/join-game.tsx'
import HostGame from './components/host-game.tsx'
import HostDashboard from './components/host-dashboard.tsx'
import PlayerView from './components/player-view.tsx'
import Leaderboard from './components/leaderboard.tsx'

function App() {
  const { currentView, game, currentPlayerId } = useGame()

  const renderView = () => {
    switch (currentView) {
      case 'menu':
        return <Menu />
      case 'join':
        return <JoinGame />
      case 'host':
        // Show HostGame for initial setup, then HostDashboard once game is created
        return game && currentPlayerId === game.hostId ? <HostDashboard /> : <HostGame />
      case 'player':
        return <PlayerView />
      case 'leaderboard':
        return <Leaderboard />
      default:
        return <Menu />
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4">Quiz Game</h1>
        {renderView()}
      </div>
    </div>
  )
}

export default App
