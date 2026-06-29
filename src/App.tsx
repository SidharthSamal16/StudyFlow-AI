import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { NotesPage } from './pages/NotesPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { PlannerPage } from './pages/PlannerPage';
import { FocusPage } from './pages/FocusPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { ToastContainer } from './components/ui/Toast';
import { useAppStore } from './store/useAppStore';

import { useShallow } from 'zustand/react/shallow';

export const App: React.FC = () => {
  const { theme, setTheme } = useAppStore(
    useShallow((state) => ({ theme: state.theme, setTheme: state.setTheme }))
  );

  // Initialize theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth / Workspace Private Pages (Wrapped in AppLayout) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Application Toast Layer */}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
