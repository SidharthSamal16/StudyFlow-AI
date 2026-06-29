export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  category: string;
  duration?: number; // in minutes
}

export interface RecentActivity {
  id: string;
  title: string;
  type: 'note' | 'quiz' | 'focus' | 'planner' | 'general';
  timestamp: string;
  duration?: number; // in minutes
  status?: string;
}

export interface WeeklyProgress {
  day: string;
  minutes: number;
  target: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserSettings {
  userName: string;
  avatarUrl: string;
  dailyGoalMinutes: number;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  soundType: 'rain' | 'waves' | 'forest' | 'none';
  autoStartBreaks: boolean;
  autoStartSessions: boolean;
}

export interface ThemeSlice {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
}

export interface SettingsSlice {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

export interface DashboardSlice {
  streakCount: number;
  todayStudyMinutes: number;
  tasks: Task[];
  recentActivities: RecentActivity[];
  weeklyProgress: WeeklyProgress[];
  incrementStreak: () => void;
  addStudyMinutes: (minutes: number) => void;
  addTask: (title: string, category: string, duration?: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addActivity: (title: string, type: RecentActivity['type'], duration?: number, status?: string) => void;
}

export type AppState = ThemeSlice & SettingsSlice & DashboardSlice;
