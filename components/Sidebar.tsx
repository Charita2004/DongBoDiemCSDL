import React from 'react';
import { 
  Cloud, 
  Database
} from 'lucide-react';

interface SidebarProps {
  currentView: 'data-linking' | 'grade-sync';
  onNavigate: (view: 'data-linking' | 'grade-sync') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="w-64 bg-[#111827] text-gray-300 flex flex-col h-screen fixed left-0 top-0 z-20 transition-all duration-300">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-700 bg-[#111827]">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-lg">
          VN
        </div>
        <span className="text-white font-semibold text-lg">VIET NAM EDU</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {/* Item 1: Liên kết dữ liệu */}
          <li>
            <button 
              onClick={() => onNavigate('data-linking')}
              className={`w-full flex items-center px-6 py-3 transition-colors duration-200 ${
                currentView === 'data-linking' 
                  ? 'bg-gray-800 border-l-4 border-blue-500 text-white' 
                  : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <Database size={20} className={`mr-3 ${currentView === 'data-linking' ? 'text-blue-400' : 'text-gray-400'}`} />
              <span className="font-medium">Liên kết dữ liệu</span>
            </button>
          </li>

          {/* Item 2: Đồng bộ điểm lên CSDL ngành */}
          <li>
            <button 
              onClick={() => onNavigate('grade-sync')}
              className={`w-full flex items-center px-6 py-3 transition-colors duration-200 ${
                currentView === 'grade-sync' 
                  ? 'bg-gray-800 border-l-4 border-blue-500 text-white' 
                  : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <Cloud size={20} className={`mr-3 ${currentView === 'grade-sync' ? 'text-blue-400' : 'text-gray-400'}`} />
              <span className="font-medium">Đồng bộ điểm lên CSDL ngành</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer / User minimal info */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 border-2 border-gray-500"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin System</p>
            <p className="text-xs text-gray-400">admin@school.edu.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;