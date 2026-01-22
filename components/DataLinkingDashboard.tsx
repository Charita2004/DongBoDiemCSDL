import React from 'react';
import { Folder, BookOpen, User, GraduationCap } from 'lucide-react';

export const DataLinkingDashboard: React.FC = () => {
  const cards = [
    {
      title: 'Liên kết Danh mục từ CSDL ngành',
      desc: 'Liên kết các danh mục chung từ CSDL ngành.',
      lastSync: '23 giờ trước',
      icon: Folder
    },
    {
      title: 'Liên kết Lớp học từ CSDL ngành',
      desc: 'Liên kết danh sách thông tin các lớp học trong trường từ CSDL ngành.',
      lastSync: '6 ngày trước',
      icon: BookOpen
    },
    {
      title: 'Liên kết Giáo viên từ CSDL ngành',
      desc: 'Liên kết danh sách giáo viên, phân công giảng dạy từ CSDL ngành.',
      lastSync: '23 giờ trước',
      icon: User
    },
    {
      title: 'Liên kết Học sinh từ CSDL ngành',
      desc: 'Liên kết danh sách và thông tin học sinh từ CSDL ngành.',
      lastSync: '8 ngày trước',
      icon: GraduationCap
    }
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bảng điều khiển Liên kết với CSDL Ngành</h2>
        <p className="text-gray-500 mt-2">Liên kết và cập nhật thông tin từ trường lên CSDL ngành một cách dễ dàng.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-48">
            <div className="flex items-start">
               <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-md">
                  <card.icon size={24} />
               </div>
               <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
               </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-4">
               <span className="text-xs text-gray-400 font-medium">Lần cuối {card.lastSync}</span>
               <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                 Đồng bộ ngay
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataLinkingDashboard;