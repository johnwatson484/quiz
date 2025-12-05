import { useGame } from '../context/GameContext'

function Menu() {
  const { setView } = useGame()

  return (
    <>
      <button 
        type="button" 
        className="btn btn-primary me-2"
        onClick={() => setView('host')}
      >
        Host new game
      </button>
      <button 
        type="button" 
        className="btn btn-secondary"
        onClick={() => setView('join')}
      >
        Join game
      </button>
    </>
  )
}

export default Menu
