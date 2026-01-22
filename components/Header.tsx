import React from 'react';
import { Menu, Bell, Search, LogOut, ScanLine, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <button className="p-2 hover:bg-gray-100 rounded-md lg:hidden mr-4">
          <Menu size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Quản lý hệ thống</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
          <Search size={20} />
        </button>

        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
          <ScanLine size={20} />
        </button>

        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative mr-2">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <button className="hidden sm:flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-sm transition-colors">
           <LogOut size={16} className="mr-2" />
           Quay lại trang chủ
        </button>
        
        <div className="flex items-center space-x-2 border border-gray-200 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors ml-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Xin chào, admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;