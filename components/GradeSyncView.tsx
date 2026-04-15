import React, { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import SuccessModal from './SuccessModal';
import HistoryModal from './HistoryModal';
import ConfirmSyncModal from './ConfirmSyncModal';
import { BookStatusBadge, SyncStatusBadge } from './Badge';
import { MOCK_DATA } from '../constants';
import { GradeLevel, Period, ClassRecord, LockStatus } from '../types';
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
  const [period, setPeriod] = useState<Period>(Period.CN);

  // State for Success Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [syncStats, setSyncStats] = useState({ synced: 0, total: 0 });

  // State for History Modal
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedClassRecord, setSelectedClassRecord] = useState<ClassRecord | null>(null);

  // State for Confirm Sync Modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [classToSync, setClassToSync] = useState<ClassRecord | null>(null);

  // State for Sorting
  const [sortConfig, setSortConfig] = useState<{ key: keyof ClassRecord; direction: 'asc' | 'desc' } | null>({
    key: 'className',
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
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const handleSyncAll = () => {
    const now = new Date();
    const timestamp = formatDateTime(now);
    let syncedCount = 0;
    
    const updatedRecords = records.map(record => {
      const matchesFilter = grade === GradeLevel.ALL || record.grade === grade;
      if (matchesFilter) {
        const isOpen = record.lockStatus === LockStatus.UNLOCKED;
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

  const handleSyncIndividual = () => {
    if (!classToSync) return;

    const now = new Date();
    const timestamp = formatDateTime(now);
    
    const updatedRecords = records.map(record => {
      if (record.id === classToSync.id) {
        return { ...record, lastSyncDate: timestamp };
      }
      return record;
    });

    setRecords(updatedRecords);
    setSyncStats({
      synced: 1,
      total: 1
    });
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleViewHistory = (record: ClassRecord) => {
    setSelectedClassRecord(record);
    setIsHistoryModalOpen(true);
  };

  const handleBadgeClick = (record: ClassRecord) => {
    // Only show confirm modal if it needs sync (is locked and not synced or sync is old)
    // For simplicity, we'll just check if it's locked
    if (record.lockStatus === LockStatus.LOCKED) {
      setClassToSync(record);
      setIsConfirmModalOpen(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-white min-h-0 overflow-hidden">
        <FilterBar 
          grade={grade} 
          setGrade={setGrade} 
          period={period} 
          setPeriod={setPeriod}
          onSync={handleSyncAll}
        />

        {/* Warning Box */}
        <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50/50 rounded-r-lg">
            <div className="text-red-600 text-sm font-semibold mb-1">
                * Chức năng này chỉ dành cho Sổ ghi điểm
            </div>
            <div className="text-red-600 text-sm font-semibold">
                * Hệ thống chỉ thực hiện đồng bộ với các lớp có trạng thái đã chốt sổ
            </div>
        </div>

        {/* Data Table Container */}
        <div className="flex-1 flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="flex-1 overflow-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-[#1E40AF] sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-center text-[11px] font-bold text-white uppercase border-r border-blue-400/30 w-20">LỚP</th>
                            <th className="px-4 py-3 text-center text-[11px] font-bold text-white uppercase border-r border-blue-400/30">TÌNH TRẠNG SỔ</th>
                            <th className="px-4 py-3 text-center text-[11px] font-bold text-white uppercase border-r border-blue-400/30">NGÀY ĐỒNG BỘ THÀNH CÔNG GẦN NHẤT</th>
                            <th className="px-4 py-3 text-center text-[11px] font-bold text-white uppercase border-r border-blue-400/30">TRẠNG THÁI ĐỒNG BỘ</th>
                            <th className="px-4 py-3 text-center text-[11px] font-bold text-white uppercase">LỊCH SỬ ĐỒNG BỘ</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.length > 0 ? (
                            sortedData.map((record) => {
                                const open = record.lockStatus === LockStatus.UNLOCKED;
                                return (
                                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-700 border-r border-gray-200 text-center">{record.className}</td>
                                        <td className="px-4 py-3 text-center border-r border-gray-200">
                                            <BookStatusBadge isOpen={open} />
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-500 border-r border-gray-200">
                                            {record.lastSyncDate ? record.lastSyncDate.split(' ')[0] : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-center border-r border-gray-200">
                                            <SyncStatusBadge 
                                                isOpen={open} 
                                                lockDateStr={record.lockDate} 
                                                lastSyncDateStr={record.lastSyncDate} 
                                                onClick={() => handleBadgeClick(record)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button 
                                                onClick={() => handleViewHistory(record)}
                                                className="inline-flex items-center px-3 py-1 text-[11px] font-medium text-blue-700 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
                                            >
                                                📜 Xem lịch sử
                                            </button>
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
        </div>

        {/* Render Success Modal */}
        <SuccessModal 
            isOpen={isSuccessModalOpen} 
            onClose={() => setIsSuccessModalOpen(false)}
            syncedCount={syncStats.synced}
            totalCount={syncStats.total}
        />

        {/* Render History Modal */}
        <HistoryModal 
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            className={selectedClassRecord?.className || ''}
            history={selectedClassRecord?.lastSyncDate ? [
                { id: '1', date: selectedClassRecord.lastSyncDate, status: 'Thành công' }
            ] : []}
        />

        {/* Render Confirm Sync Modal */}
        <ConfirmSyncModal 
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleSyncIndividual}
            className={classToSync?.className || ''}
        />
    </div>
  );
};

export default GradeSyncView;
