import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Sparkles, FileText, Tag } from 'lucide-react'
import AudioRecorder from '../components/AudioRecorder'
import { Note } from '../types'

interface RecordingProps {
  onNoteCreated: (note: Note) => void
}

const Recording = ({ onNoteCreated }: RecordingProps) => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteTags, setNoteTags] = useState('')
  const [transcription, setTranscription] = useState('')
  const [summary, setSummary] = useState('')
  const [keyPoints, setKeyPoints] = useState<string[]>([])

  const handleRecordingComplete = async (audioBlob: Blob, duration: number) => {
    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock transcription and note generation
      const mockTranscription = `This is a simulated transcription of your lecture recording. In a real implementation, this would be generated using speech-to-text AI services like OpenAI's Whisper or Google's Speech-to-Text API.

The lecture covered important topics including:
- Introduction to the subject matter
- Key concepts and definitions
- Practical applications and examples
- Common challenges and solutions
- Summary and next steps

This transcription would be much longer and more detailed based on the actual content of your recording.`

      const mockSummary = `This lecture provided a comprehensive overview of the subject, covering fundamental concepts, practical applications, and advanced topics. The instructor emphasized the importance of understanding core principles before moving to complex applications.`

      const mockKeyPoints = [
        'Fundamental concepts and definitions',
        'Practical applications and real-world examples',
        'Common challenges and their solutions',
        'Best practices and recommendations',
        'Next steps and further learning resources'
      ]

      setTranscription(mockTranscription)
      setSummary(mockSummary)
      setKeyPoints(mockKeyPoints)
      setIsProcessing(false)
    }, 3000)
  }

  const handleSaveNote = () => {
    if (!noteTitle.trim()) {
      alert('Please enter a title for your note')
      return
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: noteTitle,
      content: transcription,
      summary,
      keyPoints,
      createdAt: new Date(),
      tags: noteTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      duration: 0 // Would be set from actual recording
    }

    onNoteCreated(newNote)
    navigate('/notes')
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Record Lecture</h1>
        <p className="text-gray-600">Record your lecture and automatically generate smart notes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recording Section */}
        <div>
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        </div>

        {/* Note Generation Section */}
        <div className="space-y-6">
          {/* Note Details */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Note Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Enter lecture title..."
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  placeholder="e.g., biology, chapter 5, exam prep"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* AI Processing Status */}
          {isProcessing && (
            <div className="card">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Recording</h3>
                  <p className="text-gray-600">Generating transcription and smart notes...</p>
                </div>
              </div>
            </div>
          )}

          {/* Generated Content */}
          {transcription && !isProcessing && (
            <>
              {/* Summary */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Key Points */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transcription Preview */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcription Preview</h3>
                <div className="max-h-40 overflow-y-auto">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {transcription.length > 300 
                      ? `${transcription.substring(0, 300)}...` 
                      : transcription
                    }
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="btn-primary flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Note
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recording