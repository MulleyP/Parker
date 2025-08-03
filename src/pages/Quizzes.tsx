import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  TrendingUp,
  HelpCircle,
  Target,
  BarChart3
} from 'lucide-react'
import { Quiz } from '../types'

interface QuizzesProps {
  quizzes: Quiz[]
}

const Quizzes = ({ quizzes }: QuizzesProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === 'all' || quiz.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
        <p className="text-gray-600">Test your knowledge with AI-generated quizzes</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="input-field w-48"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
              <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">--</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Time</p>
              <p className="text-2xl font-bold text-gray-900">0h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-12">
          <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-500 mb-4">
            {quizzes.length === 0 
              ? "You haven't created any quizzes yet." 
              : "No quizzes match your search criteria."
            }
          </p>
          {quizzes.length === 0 && (
            <p className="text-sm text-gray-500">
              Create quizzes from your notes to start studying!
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map(quiz => (
            <div key={quiz.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{quiz.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {getDifficultyIcon(quiz.difficulty)} {quiz.difficulty}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {quiz.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {quiz.estimatedTime} min
                </div>
                <div className="text-sm text-gray-500">
                  {quiz.questions.length} questions
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  Created {new Date(quiz.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <button className="btn-primary flex-1 flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </button>
                  <button className="btn-secondary flex items-center">
                    <TrendingUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Study Tips */}
      {quizzes.length > 0 && (
        <div className="mt-8">
          <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Study Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📚 Spaced Repetition</h4>
                <p>Review quizzes at increasing intervals to improve retention.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎯 Focus on Weak Areas</h4>
                <p>Pay special attention to questions you get wrong consistently.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">⏰ Time Management</h4>
                <p>Use the estimated time as a guide for pacing yourself.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🔄 Review Explanations</h4>
                <p>Always read the explanations to understand why answers are correct.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quizzes