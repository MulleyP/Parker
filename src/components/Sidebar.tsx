import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Mic, 
  FileText, 
  HelpCircle, 
  BookOpen,
  Settings
} from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/record', icon: Mic, label: 'Record Lecture' },
    { path: '/notes', icon: FileText, label: 'My Notes' },
    { path: '/quizzes', icon: HelpCircle, label: 'Quizzes' },
    { path: '/study', icon: BookOpen, label: 'Study Mode' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600">Study Notes Helper</h1>
        <p className="text-sm text-gray-500 mt-1">Smart learning made easy</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 w-full">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </div>
  )
}

export default Sidebar