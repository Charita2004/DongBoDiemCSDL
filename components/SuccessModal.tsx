import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncedCount: number;
  totalCount: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, syncedCount, totalCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center transform transition-all scale-100">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Đồng bộ thành công!</h3>
        
        <p className="text-gray-600 mb-6">
          Hệ thống đã cập nhật dữ liệu cho <strong className="text-gray-900">{syncedCount}/{totalCount}</strong> lớp đã khóa sổ. 
          Các lớp đang mở chưa được đồng bộ.
        </p>

        <button
          onClick={onClose}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;