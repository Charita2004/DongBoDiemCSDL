import { ClassRecord, LockStatus, UnlockRequestStatus } from './types';

// Reference Time (Last Sync): 22/01/2026 13:58
// Context: System Date is assumed to be roughly Jan 26, 2026 (See App.tsx)

export const MOCK_DATA: ClassRecord[] = [
  // Row 1 (Needs Sync): Lock Date (25/01) > Sync Date (22/01)
  { 
    id: '101', 
    className: '1A1', 
    grade: '1', 
    lockStatus: LockStatus.LOCKED, 
    lockDate: '25/01/2026', 
    unlockRequestStatus: UnlockRequestStatus.NONE, 
    unlockDate: '',
    lastSyncDate: '22/01/2026 13:58' 
  },
  // Row 2 (Synced - Old Date): Lock Date (15/12/25) <= Sync Date (22/01/26)
  { 
    id: '102', 
    className: '1A2', 
    grade: '1', 
    lockStatus: LockStatus.LOCKED, 
    lockDate: '15/12/2025', 
    unlockRequestStatus: UnlockRequestStatus.NONE, 
    unlockDate: '',
    lastSyncDate: '22/01/2026 13:58' 
  },
  // Row 3 (Synced - Recent): Lock Date (20/01/26) <= Sync Date (22/01/26)
  { 
    id: '104', 
    className: '1A4', 
    grade: '1', 
    lockStatus: LockStatus.LOCKED, 
    lockDate: '20/01/2026', 
    unlockRequestStatus: UnlockRequestStatus.NONE, 
    unlockDate: '',
    lastSyncDate: '22/01/2026 13:58' 
  },
  // Row 4 (Open): Status is Open because Unlock Date (30/01) >= System Date (26/01)
  { 
    id: '103', 
    className: '1A3', 
    grade: '1', 
    lockStatus: LockStatus.UNLOCKED, 
    lockDate: '15/12/2025', 
    unlockRequestStatus: UnlockRequestStatus.APPROVED, 
    unlockDate: '30/01/2026', 
    lastSyncDate: '' // Dash
  },
  // Row 5 (Never Synced): Locked, No Sync Date
  { 
    id: '201', 
    className: '2A1', 
    grade: '2', 
    lockStatus: LockStatus.LOCKED, 
    lockDate: '15/12/2025', 
    unlockRequestStatus: UnlockRequestStatus.NONE, 
    unlockDate: '',
    lastSyncDate: '' 
  },
];