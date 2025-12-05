import { useState } from 'react'
import JoinGame from './join-game.tsx'

function Menu() {
  const [showJoinGame, setShowJoinGame] = useState(false)

  if (showJoinGame) {
    return <JoinGame />
  }

  return (
    <>
      <button type="button" className="btn btn-primary">Host new game</button>
      <button type="button" className="btn btn-secondary" onClick={() => setShowJoinGame(true)}>
        Join game
      </button>
    </>
  )
}

export default Menu
