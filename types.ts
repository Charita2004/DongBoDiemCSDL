import React from 'react';

export enum GradeLevel {
  ALL = 'ALL',
  G6 = '6',
  G7 = '7',
  G8 = '8',
  G9 = '9'
}

export enum Period {
  HK1 = 'Học kỳ 1',
  HK2 = 'Học kỳ 2',
  CN = 'Cuối năm'
}

export enum LockStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED'
}

export enum UnlockRequestStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',   // Chờ duyệt (Giáo viên đã gửi, Admin chưa xử lý)
  APPROVED = 'APPROVED', // Đã chấp nhận (Admin đã đồng ý)
  REJECTED = 'REJECTED'  // Đã từ chối (Admin từ chối)
}

export interface ClassRecord {
  id: string;
  className: string;
  grade: string; // 1, 2, 3, 4, 5
  lockStatus: LockStatus;
  lockDate?: string;
  unlockRequestStatus: UnlockRequestStatus;
  unlockDate?: string; // Hạn mở khóa (dd/mm/yyyy)
  lastSyncDate?: string; // Ngày đồng bộ lần cuối (dd/mm/yyyy HH:mm)
}

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
}
