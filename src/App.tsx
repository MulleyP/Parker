import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Recording from './pages/Recording'
import Notes from './pages/Notes'
import Quizzes from './pages/Quizzes'
import Study from './pages/Study'
import { Note, Quiz } from './types'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const addNote = (note: Note) => {
    setNotes(prev => [...prev, note])
  }

  const addQuiz = (quiz: Quiz) => {
    setQuizzes(prev => [...prev, quiz])
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard notes={notes} quizzes={quizzes} />} />
          <Route path="/record" element={<Recording onNoteCreated={addNote} />} />
          <Route path="/notes" element={<Notes notes={notes} onQuizCreated={addQuiz} />} />
          <Route path="/quizzes" element={<Quizzes quizzes={quizzes} />} />
          <Route path="/study" element={<Study quizzes={quizzes} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App