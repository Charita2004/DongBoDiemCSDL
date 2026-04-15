import React from 'react';
import { UnlockRequestStatus } from '../types';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface BookStatusBadgeProps {
  isOpen: boolean;
}

export const BookStatusBadge: React.FC<BookStatusBadgeProps> = ({ isOpen }) => {
  if (isOpen) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
        Chưa chốt sổ
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-800 border border-red-100">
       <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5"></span>
      Đã chốt sổ
    </span>
  );
};

interface RequestBadgeProps {
  status: UnlockRequestStatus;
}

export const RequestBadge: React.FC<RequestBadgeProps> = ({ status }) => {
  switch (status) {
    case UnlockRequestStatus.PENDING:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          Chờ duyệt
        </span>
      );
    case UnlockRequestStatus.APPROVED:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          Đã chấp nhận
        </span>
      );
    case UnlockRequestStatus.REJECTED:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          Đã từ chối
        </span>
      );
    case UnlockRequestStatus.NONE:
    default:
      return <span className="text-gray-400 text-sm font-medium">-</span>;
  }
};

// --- NEW SYNC STATUS BADGE ---

interface SyncStatusBadgeProps {
  isOpen: boolean;
  lockDateStr?: string; // dd/mm/yyyy
  lastSyncDateStr?: string; // dd/mm/yyyy HH:mm
  onClick?: () => void;
}

const parseDateOnly = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('/').map(Number);
  // Returns date at 00:00:00
  return new Date(year, month - 1, day);
};

const parseDateTime = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hour, minute] = timePart ? timePart.split(':').map(Number) : [0, 0];
  return new Date(year, month - 1, day, hour, minute);
};

export const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({ isOpen, lockDateStr, lastSyncDateStr, onClick }) => {
  // Scenario C: Not Ready (Open)
  if (isOpen) {
    return <span className="text-gray-400 text-sm">-</span>;
  }

  // Determine Sync Status for Locked Books
  let isSynced = false;
  
  if (lockDateStr && lastSyncDateStr) {
    const lockDate = parseDateOnly(lockDateStr);
    const syncDate = parseDateTime(lastSyncDateStr);

    if (lockDate && syncDate) {
      // Logic: Synced if Sync Date >= Lock Date
      // (Using getTime() for accurate comparison)
      isSynced = syncDate.getTime() >= lockDate.getTime();
    }
  } else if (!lastSyncDateStr) {
    // Locked but never synced
    isSynced = false;
  }

  // Visuals
  if (isSynced) {
    // Scenario B: Synced
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        <CheckCircle2 size={12} className="mr-1.5" />
        Đã đồng bộ
      </span>
    );
  } else {
    // Scenario A: Needs Sync
    return (
      <span 
        onClick={onClick}
        className="inline-flex items-center px-3 py-1 rounded text-[11px] font-bold bg-[#FFF7ED] text-[#9A3412] border border-[#FFEDD5] cursor-pointer hover:bg-[#FFEDD5] transition-colors"
      >
        <AlertTriangle size={12} className="mr-1 text-[#EA580C]" />
        Cần đồng bộ
      </span>
    );
  }
};
