import { ClassRecord, LockStatus, UnlockRequestStatus } from './types';

// Reference Time (Last Sync): 22/01/2026 13:58
// Context: System Date is assumed to be roughly Jan 26, 2026 (See App.tsx)

export const MOCK_DATA: ClassRecord[] = [
  // Khối 6
  { id: '601', className: '6.1', grade: '6', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '602', className: '6.2', grade: '6', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '603', className: '6.3', grade: '6', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '604', className: '6.4', grade: '6', lockStatus: LockStatus.LOCKED, lockDate: '20/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '605', className: '6.5', grade: '6', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '606', className: '6.6', grade: '6', lockStatus: LockStatus.LOCKED, lockDate: '21/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '607', className: '6.7', grade: '6', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '608', className: '6.8', grade: '6', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  
  // Khối 7
  { id: '701', className: '7.1', grade: '7', lockStatus: LockStatus.LOCKED, lockDate: '22/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '23/05/2025 08:30' },
  { id: '702', className: '7.2', grade: '7', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '703', className: '7.3', grade: '7', lockStatus: LockStatus.LOCKED, lockDate: '21/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '704', className: '7.4', grade: '7', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '705', className: '7.5', grade: '7', lockStatus: LockStatus.LOCKED, lockDate: '22/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '23/05/2025 09:00' },
  { id: '706', className: '7.6', grade: '7', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },

  // Khối 8
  { id: '801', className: '8.1', grade: '8', lockStatus: LockStatus.LOCKED, lockDate: '22/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '23/05/2025 09:15' },
  { id: '802', className: '8.2', grade: '8', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '803', className: '8.3', grade: '8', lockStatus: LockStatus.LOCKED, lockDate: '20/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '804', className: '8.4', grade: '8', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '805', className: '8.5', grade: '8', lockStatus: LockStatus.LOCKED, lockDate: '21/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '22/05/2025 14:20' },
  { id: '806', className: '8.6', grade: '8', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },

  // Khối 9
  { id: '901', className: '9.1', grade: '9', lockStatus: LockStatus.LOCKED, lockDate: '22/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '23/05/2025 10:00' },
  { id: '902', className: '9.2', grade: '9', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '903', className: '9.3', grade: '9', lockStatus: LockStatus.LOCKED, lockDate: '19/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '904', className: '9.4', grade: '9', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
  { id: '905', className: '9.5', grade: '9', lockStatus: LockStatus.LOCKED, lockDate: '20/05/2025', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '21/05/2025 11:45' },
  { id: '906', className: '9.6', grade: '9', lockStatus: LockStatus.UNLOCKED, lockDate: '', unlockRequestStatus: UnlockRequestStatus.NONE, lastSyncDate: '' },
];
