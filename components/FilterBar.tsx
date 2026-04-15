import React from 'react';
import { CloudUpload } from 'lucide-react';
import { GradeLevel, Period } from '../types';

interface FilterBarProps {
  grade: GradeLevel | string;
  setGrade: (grade: string) => void;
  period: Period;
  setPeriod: (period: Period) => void;
  onSync: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  grade, 
  setGrade, 
  period, 
  setPeriod,
  onSync
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex flex-wrap items-end gap-4">
        {/* Academic Year Selector */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1.5">Năm học</label>
          <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5">
            <option>2025-20...</option>
            <option>2024-2025</option>
          </select>
        </div>

        {/* Grade Selector */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1.5">Chọn Khối</label>
          <select 
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
          >
            <option value={GradeLevel.ALL}>Tất cả</option>
            <option value={GradeLevel.G6}>Khối 6</option>
            <option value={GradeLevel.G7}>Khối 7</option>
            <option value={GradeLevel.G8}>Khối 8</option>
            <option value={GradeLevel.G9}>Khối 9</option>
          </select>
        </div>

        {/* Period Selector */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1.5">Giai đoạn</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
          >
            <option value={Period.HK1}>Học kỳ 1</option>
            <option value={Period.HK2}>Học kỳ 2</option>
            <option value={Period.CN}>Cuối năm</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onSync}
          className="inline-flex items-center px-6 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <CloudUpload size={18} className="mr-2" />
          Đồng bộ điểm lên CSDL ngành
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
