import { Link } from 'react-router-dom'
import { 
  Mic, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'
import { Note, Quiz } from '../types'

interface DashboardProps {
  notes: Note[]
  quizzes: Quiz[]
}

const Dashboard = ({ notes, quizzes }: DashboardProps) => {
  const recentNotes = notes.slice(0, 3)
  const recentQuizzes = quizzes.slice(0, 3)

  const quickActions = [
    {
      title: 'Record Lecture',
      description: 'Start recording a new lecture',
      icon: Mic,
      path: '/record',
      color: 'bg-blue-500'
    },
    {
      title: 'View Notes',
      description: 'Browse and edit your notes',
      icon: FileText,
      path: '/notes',
      color: 'bg-green-500'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: HelpCircle,
      path: '/quizzes',
      color: 'bg-purple-500'
    },
    {
      title: 'Study Mode',
      description: 'Interactive study sessions',
      icon: BookOpen,
      path: '/study',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Ready to make your studying more effective?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Notes</p>
              <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quizzes Created</p>
              <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Study Sessions</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
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

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="card hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Notes */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Notes</h2>
            <Link to="/notes" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {recentNotes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notes yet</p>
              <Link to="/record" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Record your first lecture
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div key={note.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{note.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {note.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Quizzes */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Quizzes</h2>
            <Link to="/quizzes" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {recentQuizzes.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No quizzes yet</p>
              <Link to="/notes" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Create your first quiz
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentQuizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                    <p className="text-sm text-gray-600">
                      {quiz.questions.length} questions • {quiz.estimatedTime} min
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      quiz.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard