import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, ThemeMode, UserSettings, Task, RecentActivity, WeeklyProgress } from '../types';

const defaultSettings: UserSettings = {
  userName: 'Alex Mercer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  dailyGoalMinutes: 60,
  notificationsEnabled: true,
  soundEnabled: true,
  soundType: 'rain',
  autoStartBreaks: false,
  autoStartSessions: true,
};

const initialWeeklyProgress: WeeklyProgress[] = [
  { day: 'Mon', minutes: 45, target: 60 },
  { day: 'Tue', minutes: 75, target: 60 },
  { day: 'Wed', minutes: 30, target: 60 },
  { day: 'Thu', minutes: 90, target: 60 },
  { day: 'Fri', minutes: 60, target: 60 },
  { day: 'Sat', minutes: 15, target: 60 },
  { day: 'Sun', minutes: 0, target: 60 },
];

const initialTasks: Task[] = [
  { id: 't1', title: 'Complete Calculus III Assignment', completed: false, dueDate: 'Today, 5:00 PM', category: 'Mathematics', duration: 45 },
  { id: 't2', title: 'Review Active Recall cards on Neural Networks', completed: true, dueDate: 'Today, 11:30 AM', category: 'AI & ML', duration: 20 },
  { id: 't3', title: 'Read Chapter 4 of Systems Programming', completed: false, dueDate: 'Tomorrow, 2:00 PM', category: 'Computer Science', duration: 60 },
];

const initialActivities: RecentActivity[] = [
  { id: 'a1', title: 'Completed Deep Focus Session', type: 'focus', timestamp: '2 hours ago', duration: 25, status: 'Completed' },
  { id: 'a2', title: 'Calculus Mock Quiz - Set A', type: 'quiz', timestamp: 'Yesterday', duration: 15, status: 'Score: 92%' },
  { id: 'a3', title: 'Created Study Planner for Final Exams', type: 'planner', timestamp: '3 days ago', status: 'Scheduled' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme Slice
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: (theme: ThemeMode) => {
        let resolvedTheme: 'light' | 'dark' = 'light';
        if (theme === 'system') {
          resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
          resolvedTheme = theme;
        }

        // Apply theme HTML class
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);

        set({ theme, resolvedTheme });
      },

      // Settings Slice
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: defaultSettings }),

      // Dashboard Slice
      streakCount: 5,
      todayStudyMinutes: 45,
      tasks: initialTasks,
      recentActivities: initialActivities,
      weeklyProgress: initialWeeklyProgress,

      incrementStreak: () => set((state) => ({ streakCount: state.streakCount + 1 })),
      
      addStudyMinutes: (minutes) =>
        set((state) => {
          const updatedTodayMinutes = state.todayStudyMinutes + minutes;
          
          // Update weekly progress for current day (assume Sunday for Sun, etc., let's find today's day)
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const todayName = days[new Date().getDay()];
          const updatedWeekly = state.weeklyProgress.map((wp) => {
            if (wp.day === todayName) {
              return { ...wp, minutes: wp.minutes + minutes };
            }
            return wp;
          });

          return {
            todayStudyMinutes: updatedTodayMinutes,
            weeklyProgress: updatedWeekly,
          };
        }),

      addTask: (title, category, duration = 30) =>
        set((state) => {
          const newTask: Task = {
            id: `t_${Date.now()}`,
            title,
            completed: false,
            dueDate: 'Today, 8:00 PM',
            category,
            duration,
          };
          return { tasks: [newTask, ...state.tasks] };
        }),

      toggleTask: (id) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === id) {
              const nextCompleted = !task.completed;
              // Add activity if task completed
              if (nextCompleted) {
                const activityTitle = `Finished task: ${task.title}`;
                setTimeout(() => {
                  get().addActivity(activityTitle, 'planner', task.duration || 30, 'Completed');
                }, 0);
              }
              return { ...task, completed: nextCompleted };
            }
            return task;
          });
          return { tasks: updatedTasks };
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      addActivity: (title, type, duration, status) =>
        set((state) => {
          const newActivity: RecentActivity = {
            id: `a_${Date.now()}`,
            title,
            type,
            timestamp: 'Just now',
            duration,
            status,
          };
          return {
            recentActivities: [newActivity, ...state.recentActivities.slice(0, 9)], // limit to 10 activities
          };
        }),
    }),
    {
      name: 'studyflow-app-state',
      storage: createJSONStorage(() => localStorage),
      // Only persist theme and settings to keep state lightweight, but dashboard state persistence makes user actions persistent, which is amazing for demo fidelity.
      // Let's persist everything since it's an offline-capable PWA! It will feel like a real native app.
    }
  )
);

// Theme initialization side-effect
if (typeof window !== 'undefined') {
  // Setup system listener for color preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentTheme = useAppStore.getState().theme;
    if (currentTheme === 'system') {
      useAppStore.getState().setTheme('system');
    }
  });
}
