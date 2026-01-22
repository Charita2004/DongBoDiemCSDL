import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import SuccessModal from './SuccessModal';
import { BookStatusBadge, SyncStatusBadge } from './Badge';
import { MOCK_DATA } from '../constants';
import { GradeLevel, Period, ClassRecord } from '../types';
import { ArrowUpDown } from 'lucide-react';

// Helper to parse DD/MM/YYYY
const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Fixed System Date for Demo purposes: Jan 26, 2026
const SIMULATED_TODAY = new Date(2026, 0, 26); 

const isBookOpen = (unlockDateStr?: string): boolean => {
  if (!unlockDateStr) return false;
  const unlockDeadline = parseDate(unlockDateStr);
  if (!unlockDeadline) return false;
  return SIMULATED_TODAY <= unlockDeadline;
};

const formatDateTime = (date: Date): string => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${d}/${m}/${y} ${hours}:${minutes}`;
};

const GradeSyncView: React.FC = () => {
  // State for Data
  const [records, setRecords] = useState<ClassRecord[]>(MOCK_DATA);

  // State for Filters
  const [grade, setGrade] = useState<string>(GradeLevel.ALL);
  const [period, setPeriod] = useState<Period>(Period.GK1);

  // State for Success Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [syncStats, setSyncStats] = useState({ synced: 0, total: 0 });

  // State for Sorting
  const [sortConfig, setSortConfig] = useState<{ key: keyof ClassRecord; direction: 'asc' | 'desc' } | null>({
    key: 'grade',
    direction: 'asc'
  });

  // Filter Data Logic
  const filteredData = useMemo(() => {
    let data = [...records];
    if (grade !== GradeLevel.ALL) {
      data = data.filter(item => item.grade === grade);
    }
    return data;
  }, [records, grade, period]);

  // Sort Data Logic
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any = a[sortConfig.key];
        let bValue: any = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        
        if (a.grade !== b.grade) {
            return a.grade.localeCompare(b.grade);
        }
        return a.className.localeCompare(b.className);
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key: keyof ClassRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSync = () => {
    const now = new Date();
    now.setFullYear(2026); 
    
    const timestamp = formatDateTime(now);
    let syncedCount = 0;
    
    const updatedRecords = records.map(record => {
      const matchesFilter = grade === GradeLevel.ALL || record.grade === grade;
      if (matchesFilter) {
        const isOpen = isBookOpen(record.unlockDate);
        if (!isOpen) {
          syncedCount++;
          return { ...record, lastSyncDate: timestamp };
        }
      }
      return record;
    });

    setRecords(updatedRecords);
    setSyncStats({
      synced: syncedCount,
      total: filteredData.length
    });
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-0 overflow-hidden">
        <FilterBar 
        grade={grade} 
        setGrade={setGrade} 
        period={period} 
        setPeriod={setPeriod}
        onSync={handleSync}
        />

        <div className="mb-3 text-red-600 text-sm font-medium italic">
            * Hệ thống chỉ thực hiện đồng bộ đối với các lớp có trạng thái Đã chốt sổ
        </div>

        {/* Data Table Card */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 min-h-0 overflow-hidden">
        
        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-blue-600 sticky top-0 z-10 shadow-sm">
                <tr>
                <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-blue-700 group transition-colors"
                    onClick={() => requestSort('grade')}
                >
                    <div className="flex items-center">
                    Lớp
                    <ArrowUpDown size={14} className="ml-1 text-blue-200 group-hover:text-white" />
                    </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Tình trạng sổ
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Ngày khóa sổ lần cuối
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Ngày đồng bộ lần cuối
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Trạng thái đồng bộ
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.length > 0 ? (
                sortedData.map((record) => {
                    const open = isBookOpen(record.unlockDate);
                    return (
                    <tr key={record.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{record.className}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <BookStatusBadge isOpen={open} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.lockDate || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {open ? '-' : (record.lastSyncDate || '-')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <SyncStatusBadge 
                            isOpen={open} 
                            lockDateStr={record.lockDate} 
                            lastSyncDateStr={record.lastSyncDate} 
                        />
                        </td>
                    </tr>
                    );
                })
                ) : (
                <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Không tìm thấy dữ liệu phù hợp.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex-shrink-0 bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between z-20">
            <div className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{sortedData.length}</span> của <span className="font-medium">{records.length}</span> kết quả
            </div>
            <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 disabled:opacity-50" disabled>Trước</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">Sau</button>
            </div>
        </div>
        </div>

        {/* Render Success Modal */}
        <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        syncedCount={syncStats.synced}
        totalCount={syncStats.total}
        />
    </div>
  );
};

export default GradeSyncView;