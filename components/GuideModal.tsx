import React from 'react';
import { X, BookOpen, AlertCircle, CheckCircle, Clock, Lock } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Panel */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl transform transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <BookOpen className="text-blue-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Quy trình & Giải nghĩa dữ liệu</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[80vh] space-y-8">
            
            {/* Section 1: Workflow Diagram */}
            <section>
              <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">1. Quy trình vận hành chuẩn</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                  <div className="absolute top-4 right-4 text-gray-300 font-bold text-4xl opacity-20">01</div>
                  <div className="flex items-center mb-2 text-gray-700 font-bold">
                    <Lock size={18} className="mr-2" /> Khóa tự động
                  </div>
                  <p className="text-sm text-gray-600">Hệ thống tự động khóa sổ tất cả các lớp vào <strong>"Ngày khóa sổ"</strong> quy định.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                  <div className="absolute top-4 right-4 text-gray-300 font-bold text-4xl opacity-20">02</div>
                  <div className="flex items-center mb-2 text-yellow-700 font-bold">
                    <AlertCircle size={18} className="mr-2" /> Gửi yêu cầu
                  </div>
                  <p className="text-sm text-gray-600">Giáo viên cần nhập bù/sửa điểm sẽ gửi yêu cầu. Trạng thái chuyển thành <span className="text-yellow-700 font-bold">Chờ duyệt</span>.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                  <div className="absolute top-4 right-4 text-gray-300 font-bold text-4xl opacity-20">03</div>
                  <div className="flex items-center mb-2 text-blue-700 font-bold">
                    <CheckCircle size={18} className="mr-2" /> Admin xử lý
                  </div>
                  <p className="text-sm text-gray-600">Admin xem xét. Nếu <strong>Đồng ý</strong>, hệ thống yêu cầu nhập hạn mở mới (Ví dụ: +2 ngày).</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                  <div className="absolute top-4 right-4 text-gray-300 font-bold text-4xl opacity-20">04</div>
                  <div className="flex items-center mb-2 text-green-700 font-bold">
                    <Clock size={18} className="mr-2" /> Mở tạm thời
                  </div>
                  <p className="text-sm text-gray-600">Sổ chuyển trạng thái <span className="text-green-700 font-bold">Đang mở</span>. Sau ngày hạn, hệ thống tự động khóa lại.</p>
                </div>
              </div>
            </section>

            {/* Section 2: Column Definitions */}
            <section>
              <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">2. Giải nghĩa các cột dữ liệu</h4>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên cột</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá trị hiển thị</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ý nghĩa nghiệp vụ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {/* Tình trạng sổ */}
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900">Tình trạng sổ</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mr-2">Đã khóa</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Đang mở</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        Quyết định việc Giáo viên có thể nhập điểm hay không. <br/>
                        <strong>Đã khóa:</strong> Không thể chỉnh sửa. <br/>
                        <strong>Đang mở:</strong> Có thể chỉnh sửa (chỉ xảy ra khi Admin mở lại).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Common Scenarios */}
            <section>
              <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">3. Các trường hợp thường gặp</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-bold text-blue-800 mb-1">Trường hợp: Muốn đồng bộ điểm lên CSDL Ngành?</h5>
                  <p className="text-sm text-blue-900">
                    Điều kiện: Các lớp nên ở trạng thái <strong>"Đã khóa"</strong> để đảm bảo dữ liệu ổn định. <br/>
                    Hành động: Chọn nút "Đồng bộ điểm" màu xanh ở góc phải màn hình.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-100 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;