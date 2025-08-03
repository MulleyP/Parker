export interface Note {
  id: string
  title: string
  content: string
  summary: string
  keyPoints: string[]
  createdAt: Date
  audioUrl?: string
  duration?: number
  tags: string[]
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank'
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  noteId?: string
  createdAt: Date
  estimatedTime: number // in minutes
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface RecordingState {
  isRecording: boolean
  isPaused: boolean
  duration: number
  audioBlob: Blob | null
  audioUrl: string | null
}

export interface StudySession {
  id: string
  quizId: string
  answers: { questionId: string; selectedAnswer: number }[]
  score: number
  completedAt: Date
  timeSpent: number // in seconds
}