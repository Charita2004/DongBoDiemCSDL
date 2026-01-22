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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
      
      {/* Left Group: Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-start sm:items-center w-full lg:w-auto">
        
        {/* Grade Selector */}
        <div className="relative min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Chọn Khối</label>
            <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option value={GradeLevel.ALL}>Tất cả khối</option>
                <option value={GradeLevel.G1}>Khối 1</option>
                <option value={GradeLevel.G2}>Khối 2</option>
                <option value={GradeLevel.G3}>Khối 3</option>
                <option value={GradeLevel.G4}>Khối 4</option>
                <option value={GradeLevel.G5}>Khối 5</option>
            </select>
        </div>

        {/* Period Dropdown */}
        <div className="relative min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Giai đoạn</label>
            <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                {Object.values(Period).map((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
        </div>
      </div>

      {/* Right Group: Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto mt-4 lg:mt-0">
          <button 
            onClick={onSync}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
          >
            <CloudUpload size={18} className="mr-2" />
            Đồng bộ điểm lên CSDL ngành
          </button>
      </div>

    </div>
  );
};

export default FilterBar;