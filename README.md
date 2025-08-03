# Study Notes Helper 🎓

A comprehensive note-taking app designed to make college studying easier and more effective. Record lectures, generate smart notes, and create quizzes automatically using AI-powered features.

## ✨ Features

### 🎤 **Lecture Recording**
- High-quality audio recording with pause/resume functionality
- Real-time recording timer and visualization
- Automatic audio download capability
- Browser-based recording (no external software needed)

### 📝 **Smart Note Generation**
- AI-powered transcription from audio recordings
- Automatic summary generation
- Key points extraction
- Tag-based organization system
- Full-text search and filtering

### 🧠 **Quiz Creation**
- Automatic quiz generation from notes
- Multiple question types (multiple choice, true/false)
- Difficulty level assessment
- Estimated completion time
- Detailed explanations for each answer

### 📚 **Study Mode**
- Interactive quiz taking experience
- Real-time progress tracking
- Detailed results with explanations
- Performance analytics
- Retake functionality

### 🎯 **Dashboard & Analytics**
- Overview of all notes and quizzes
- Study statistics and progress tracking
- Quick access to all features
- Recent activity monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser with microphone access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd study-notes-helper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 How to Use

### 1. Recording a Lecture
1. Navigate to the "Record Lecture" section
2. Click "Start Recording" and allow microphone access
3. Speak clearly during your lecture
4. Use pause/resume as needed
5. Click "Stop" when finished
6. Add a title and tags for organization
7. Review the AI-generated transcription and notes
8. Save your note

### 2. Managing Notes
1. View all your notes in the "My Notes" section
2. Use search and tag filters to find specific notes
3. Click on any note to view full details
4. Create quizzes directly from your notes
5. Edit or organize your notes as needed

### 3. Creating Quizzes
1. From any note, click the quiz icon
2. The app will automatically generate relevant questions
3. Review the generated quiz
4. Start studying immediately or save for later

### 4. Studying with Quizzes
1. Go to "Study Mode" or "Quizzes" section
2. Select a quiz to start
3. Answer questions and track your progress
4. Review detailed results and explanations
5. Retake quizzes to improve your score

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Audio Recording**: Web Audio API
- **AI Features**: Simulated (ready for integration with OpenAI, Google Speech-to-Text, etc.)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for API integrations:

```env
# For OpenAI integration (future feature)
OPENAI_API_KEY=your_openai_api_key

# For Google Speech-to-Text (future feature)
GOOGLE_CLOUD_API_KEY=your_google_api_key
```

### Customization
- Modify colors in `tailwind.config.js`
- Update styling in `src/index.css`
- Add new features in the respective component files

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist folder to Netlify
```

## 🔮 Future Enhancements

- [ ] **Real AI Integration**: Connect to OpenAI Whisper for transcription
- [ ] **Cloud Storage**: Save notes and recordings to cloud storage
- [ ] **Collaboration**: Share notes and quizzes with classmates
- [ ] **Mobile App**: React Native version for mobile devices
- [ ] **Offline Support**: Work without internet connection
- [ ] **Export Features**: PDF export for notes and quiz results
- [ ] **Voice Commands**: Control the app with voice commands
- [ ] **Advanced Analytics**: Detailed study patterns and recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include browser version and error messages

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Inspired by the need for better study tools in higher education
- Icons provided by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for students everywhere**

*Transform your study habits and ace your exams with Study Notes Helper!* 
