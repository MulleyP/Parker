import { useState } from 'react'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Clock,
  Target,
  BarChart3,
  BookOpen,
  Play
} from 'lucide-react'
import { Quiz, Question } from '../types'

interface StudyProps {
  quizzes: Quiz[]
}

const Study = ({ quizzes }: StudyProps) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isQuizActive, setIsQuizActive] = useState(false)

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeSpent(0)
    setIsQuizActive(true)
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const finishQuiz = () => {
    setShowResults(true)
    setIsQuizActive(false)
  }

  const calculateScore = () => {
    if (!selectedQuiz) return 0
    
    let correctAnswers = 0
    selectedQuiz.questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id]
      if (selectedAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    return Math.round((correctAnswers / selectedQuiz.questions.length) * 100)
  }

  const getCurrentQuestion = (): Question | null => {
    if (!selectedQuiz) return null
    return selectedQuiz.questions[currentQuestionIndex]
  }

  const currentQuestion = getCurrentQuestion()

  if (selectedQuiz && !showResults) {
    return (
      <div className="p-6">
        {/* Quiz Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedQuiz.title}</h1>
              <p className="text-gray-600">{selectedQuiz.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {timeSpent}s
              </div>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="card mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestion.id] === index
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                        selectedAnswers[currentQuestion.id] === index
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion.id] === index && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-2">
                {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    disabled={selectedAnswers[currentQuestion.id] === undefined}
                    className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={finishQuiz}
                    disabled={selectedAnswers[currentQuestion.id] === undefined}
                    className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Finish Quiz
                    <Check className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (showResults && selectedQuiz) {
    const score = calculateScore()
    const correctAnswers = selectedQuiz.questions.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
          <p className="text-gray-600">{selectedQuiz.title}</p>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{score}%</div>
            <p className="text-gray-600">Score</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{correctAnswers}</div>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">{timeSpent}s</div>
            <p className="text-gray-600">Time Spent</p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h2>
          <div className="space-y-6">
            {selectedQuiz.questions.map((question, index) => {
              const isCorrect = selectedAnswers[question.id] === question.correctAnswer
              const selectedAnswer = selectedAnswers[question.id]
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isCorrect ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-50 border border-green-200'
                                : optionIndex === selectedAnswer && !isCorrect
                                ? 'bg-red-50 border border-red-200'
                                : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className={`w-4 h-4 rounded-full mr-2 ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-500'
                                  : optionIndex === selectedAnswer && !isCorrect
                                  ? 'bg-red-500'
                                  : 'bg-gray-300'
                              }`}></span>
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <Check className="w-4 h-4 text-green-600 ml-2" />
                              )}
                              {optionIndex === selectedAnswer && !isCorrect && (
                                <X className="w-4 h-4 text-red-600 ml-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <p className="text-sm text-gray-700">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => {
              setSelectedQuiz(null)
              setShowResults(false)
            }}
            className="btn-secondary flex items-center"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Back to Quizzes
          </button>
          <button
            onClick={() => startQuiz(selectedQuiz)}
            className="btn-primary flex items-center"
          >
            <Target className="w-4 h-4 mr-2" />
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // Quiz Selection
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Mode</h1>
        <p className="text-gray-600">Choose a quiz to start studying</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes available</h3>
          <p className="text-gray-500 mb-4">Create quizzes from your notes to start studying!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{quiz.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  quiz.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {quiz.estimatedTime} min
                </div>
                <div className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </div>
              </div>

              <button
                onClick={() => startQuiz(quiz)}
                className="btn-primary w-full flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Studying
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Study