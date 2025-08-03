import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  HelpCircle, 
  Calendar,
  Tag,
  Eye,
  Edit,
  FileText
} from 'lucide-react'
import { Note, Quiz } from '../types'

interface NotesProps {
  notes: Note[]
  onQuizCreated: (quiz: Quiz) => void
}

const Notes = ({ notes, onQuizCreated }: NotesProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  // Filter notes based on search and tags
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => note.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const handleCreateQuiz = (note: Note) => {
    // Simulate quiz generation
    const mockQuestions = [
      {
        id: '1',
        question: `What is the main topic discussed in "${note.title}"?`,
        options: [
          'Advanced concepts',
          'Basic principles',
          'Practical applications',
          'Historical background'
        ],
        correctAnswer: 1,
        explanation: 'The lecture primarily focused on fundamental concepts and basic principles.',
        type: 'multiple-choice' as const
      },
      {
        id: '2',
        question: 'Which of the following was mentioned as a key point?',
        options: [
          note.keyPoints[0] || 'Concept A',
          note.keyPoints[1] || 'Concept B',
          note.keyPoints[2] || 'Concept C',
          'None of the above'
        ],
        correctAnswer: 0,
        explanation: 'This was one of the main points emphasized in the lecture.',
        type: 'multiple-choice' as const
      },
      {
        id: '3',
        question: 'The lecture emphasized the importance of understanding core principles.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'The instructor specifically mentioned this as crucial for success.',
        type: 'true-false' as const
      }
    ]

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: `Quiz: ${note.title}`,
      description: `Test your knowledge of ${note.title}`,
      questions: mockQuestions,
      noteId: note.id,
      createdAt: new Date(),
      estimatedTime: 5,
      difficulty: 'medium'
    }

    onQuizCreated(newQuiz)
    alert('Quiz created successfully! You can find it in the Quizzes section.')
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notes</h1>
        <p className="text-gray-600">Review and manage your lecture notes</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <Filter className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-500 mb-4">
            {notes.length === 0 
              ? "You haven't created any notes yet." 
              : "No notes match your search criteria."
            }
          </p>
          {notes.length === 0 && (
            <button className="btn-primary flex items-center mx-auto">
              <Plus className="w-5 h-5 mr-2" />
              Record Your First Lecture
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <div key={note.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{note.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedNote(note)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCreateQuiz(note)}
                    className="p-1 text-gray-400 hover:text-purple-600"
                    title="Create Quiz"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {note.summary}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
                {note.duration && (
                  <span className="text-sm text-gray-500">
                    {Math.floor(note.duration / 60)}:{(note.duration % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{note.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Points:</h4>
                <ul className="space-y-1">
                  {note.keyPoints.slice(0, 2).map((point, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                  {note.keyPoints.length > 2 && (
                    <li className="text-sm text-gray-500">
                      +{note.keyPoints.length - 2} more points
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedNote.title}</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedNote.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedNote.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {selectedNote.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Content</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedNote.content}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleCreateQuiz(selectedNote)}
                    className="btn-primary flex items-center"
                  >
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Create Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notes