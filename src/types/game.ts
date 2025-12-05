export interface Player {
  id: string
  name: string
  score: number
  isHost: boolean
}

export interface Answer {
  playerId: string
  playerName: string
  answer: string
  awarded: boolean
}

export interface Question {
  id: string
  text: string
  answers: Answer[]
  acceptingAnswers: boolean
}

export interface Game {
  code: string
  hostId: string
  players: Player[]
  currentQuestion: Question | null
  questions: Question[]
  status: 'waiting' | 'playing' | 'ended'
}

export type GameView = 'menu' | 'join' | 'host' | 'player' | 'leaderboard'
