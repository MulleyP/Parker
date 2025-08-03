import { useState, useRef, useEffect } from 'react'
import { Mic, Square, Pause, Play, Download } from 'lucide-react'
import { RecordingState } from '../types'

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob, duration: number) => void
}

const AudioRecorder = ({ onRecordingComplete }: AudioRecorderProps) => {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioBlob: null,
    audioUrl: null
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        
        setRecordingState(prev => ({
          ...prev,
          audioBlob,
          audioUrl,
          isRecording: false,
          isPaused: false
        }))

        onRecordingComplete(audioBlob, recordingState.duration)
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setRecordingState(prev => ({ ...prev, isRecording: true, duration: 0 }))

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingState(prev => ({ ...prev, duration: prev.duration + 1 }))
      }, 1000)

    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Unable to access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.pause()
      setRecordingState(prev => ({ ...prev, isPaused: true }))
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState.isPaused) {
      mediaRecorderRef.current.resume()
      setRecordingState(prev => ({ ...prev, isPaused: false }))
      intervalRef.current = setInterval(() => {
        setRecordingState(prev => ({ ...prev, duration: prev.duration + 1 }))
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const downloadAudio = () => {
    if (recordingState.audioBlob) {
      const url = URL.createObjectURL(recordingState.audioBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `lecture-${new Date().toISOString().slice(0, 19)}.wav`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Lecture Recorder</h3>
        <p className="text-gray-600">Record your lectures and automatically generate notes</p>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-mono text-primary-600 mb-4">
          {formatTime(recordingState.duration)}
        </div>
        
        {recordingState.isRecording && (
          <div className="flex justify-center mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse-slow"></div>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {!recordingState.isRecording && !recordingState.audioUrl && (
          <button
            onClick={startRecording}
            className="btn-primary flex items-center"
          >
            <Mic className="w-5 h-5 mr-2" />
            Start Recording
          </button>
        )}

        {recordingState.isRecording && !recordingState.isPaused && (
          <>
            <button
              onClick={pauseRecording}
              className="btn-secondary flex items-center"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </button>
            <button
              onClick={stopRecording}
              className="btn-primary flex items-center bg-red-600 hover:bg-red-700"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </button>
          </>
        )}

        {recordingState.isPaused && (
          <>
            <button
              onClick={resumeRecording}
              className="btn-primary flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Resume
            </button>
            <button
              onClick={stopRecording}
              className="btn-secondary flex items-center"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </button>
          </>
        )}

        {recordingState.audioUrl && (
          <button
            onClick={downloadAudio}
            className="btn-secondary flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </button>
        )}
      </div>

      {recordingState.audioUrl && (
        <div className="mt-4">
          <audio controls className="w-full" src={recordingState.audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}

export default AudioRecorder