import { createContext, useContext, useState, type ReactNode } from 'react'
import type { GameView, Game, Player, Question, Answer } from '../types/game.ts'

interface GameContextType {
  game: Game | null
  currentView: GameView
  currentPlayerId: string | null
  createGame: (hostName: string) => string
  joinGame: (code: string, playerName: string) => boolean
  addQuestion: (questionText: string) => void
  submitAnswer: (answer: string) => void
  acceptAnswers: () => void
  awardPoint: (playerId: string) => void
  endGame: () => void
  setView: (view: GameView) => void
  nextQuestion: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const generateGameCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(null)
  const [currentView, setCurrentView] = useState<GameView>('menu')
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null)

  const createGame = (hostName: string): string => {
    const code = generateGameCode()
    const hostId = Date.now().toString()
    
    const newGame: Game = {
      code,
      hostId,
      players: [{
        id: hostId,
        name: hostName,
        score: 0,
        isHost: true
      }],
      currentQuestion: null,
      questions: [],
      status: 'waiting'
    }
    
    setGame(newGame)
    setCurrentPlayerId(hostId)
    setCurrentView('host')
    return code
  }

  const joinGame = (code: string, playerName: string): boolean => {
    // In a real app, this would validate against a server
    // For now, only allow joining if we're the host with matching code
    if (game && game.code === code) {
      const playerId = Date.now().toString()
      const newPlayer: Player = {
        id: playerId,
        name: playerName,
        score: 0,
        isHost: false
      }
      
      setGame({
        ...game,
        players: [...game.players, newPlayer]
      })
      setCurrentPlayerId(playerId)
      setCurrentView('player')
      return true
    }
    return false
  }

  const addQuestion = (questionText: string) => {
    if (!game) return
    
    const questionId = Date.now().toString()
    const newQuestion: Question = {
      id: questionId,
      text: questionText,
      answers: [],
      acceptingAnswers: true
    }
    
    setGame({
      ...game,
      currentQuestion: newQuestion,
      questions: [...game.questions, newQuestion],
      status: 'playing'
    })
  }

  const submitAnswer = (answer: string) => {
    if (!game || !game.currentQuestion || !currentPlayerId) return
    
    const player = game.players.find(p => p.id === currentPlayerId)
    if (!player) return

    const newAnswer: Answer = {
      playerId: currentPlayerId,
      playerName: player.name,
      answer,
      awarded: false
    }
    
    const updatedQuestion = {
      ...game.currentQuestion,
      answers: [...game.currentQuestion.answers, newAnswer]
    }
    
    setGame({
      ...game,
      currentQuestion: updatedQuestion,
      questions: game.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    })
  }

  const acceptAnswers = () => {
    if (!game || !game.currentQuestion) return
    
    const updatedQuestion = {
      ...game.currentQuestion,
      acceptingAnswers: false
    }
    
    setGame({
      ...game,
      currentQuestion: updatedQuestion,
      questions: game.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    })
  }

  const awardPoint = (playerId: string) => {
    if (!game || !game.currentQuestion) return
    
    // Toggle the awarded status for this player's answer
    const updatedAnswers = game.currentQuestion.answers.map(a => 
      a.playerId === playerId ? { ...a, awarded: !a.awarded } : a
    )
    
    const updatedQuestion = {
      ...game.currentQuestion,
      answers: updatedAnswers
    }
    
    // Update player scores
    const updatedPlayers = game.players.map(player => {
      const answer = updatedAnswers.find(a => a.playerId === player.id)
      if (!answer) return player
      
      const oldAnswer = game.currentQuestion!.answers.find(a => a.playerId === player.id)
      const scoreDelta = answer.awarded && !oldAnswer?.awarded ? 1 : 
                        !answer.awarded && oldAnswer?.awarded ? -1 : 0
      
      return {
        ...player,
        score: player.score + scoreDelta
      }
    })
    
    setGame({
      ...game,
      players: updatedPlayers,
      currentQuestion: updatedQuestion,
      questions: game.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    })
  }

  const nextQuestion = () => {
    if (!game) return
    
    setGame({
      ...game,
      currentQuestion: null
    })
  }

  const endGame = () => {
    if (!game) return
    
    setGame({
      ...game,
      status: 'ended'
    })
    setCurrentView('leaderboard')
  }

  const setView = (view: GameView) => {
    setCurrentView(view)
  }

  return (
    <GameContext.Provider value={{
      game,
      currentView,
      currentPlayerId,
      createGame,
      joinGame,
      addQuestion,
      submitAnswer,
      acceptAnswers,
      awardPoint,
      endGame,
      setView,
      nextQuestion
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
