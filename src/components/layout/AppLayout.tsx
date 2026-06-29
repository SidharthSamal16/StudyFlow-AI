import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Calendar, 
  Compass, 
  BarChart3, 
  Settings as SettingsIcon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Sun,
  Moon,
  Laptop,
  LogOut,
  User,
  Activity
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';
import { Dropdown } from '../ui/Dropdown';
import { showToast } from '../ui/Toast';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Notes', path: '/notes', icon: BookOpen },
  { name: 'Flashcards', path: '/flashcards', icon: Layers },
  { name: 'Quiz', path: '/quiz', icon: HelpCircle },
  { name: 'Planner', path: '/planner', icon: Calendar },
  { name: 'Focus Mode', path: '/focus', icon: Compass },
  { name: 'Progress', path: '/progress', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export const AppLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, settings } = useAppStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
      settings: state.settings,
    }))
  );

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle search overlay / placeholder action
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}" (Search feature coming in Phase 2!)`, 'info');
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    showToast('Logged out successfully!', 'success');
    navigate('/');
  };

  const currentThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-[18px] w-[18px]" />;
      case 'dark': return <Moon className="h-[18px] w-[18px]" />;
      default: return <Laptop className="h-[18px] w-[18px]" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR                                          */}
      {/* ======================================================== */}
      <motion.aside
        aria-label="Desktop Navigation"
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 z-20 overflow-hidden"
      >
        {/* Sidebar Header / Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/60 justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 select-none">
            <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-primary-500/20">
              ⚡
            </div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="font-extrabold text-lg bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"
              >
                StudyFlow
              </motion.span>
            )}
          </Link>
          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus-ring"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative flex items-center h-11 px-3.5 rounded-lg font-medium text-sm transition-all focus-ring
                  ${isActive 
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50/70 dark:bg-primary-950/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r bg-primary-500"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <IconComponent className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'}`} />
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-3 truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (Collapse button when collapsed) */}
        {isSidebarCollapsed && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-center">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus-ring border border-slate-200 dark:border-slate-800"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.aside>

      {/* ======================================================== */}
      {/* MOBILE DRAWER NAV                                        */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 h-full flex flex-col p-6 z-10"
            >
              {/* Drawer Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus-ring"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Drawer Brand */}
              <div className="flex items-center gap-3 select-none mb-8 mt-1">
                <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                  ⚡
                </div>
                <span className="font-extrabold text-lg bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  StudyFlow
                </span>
              </div>

              {/* Drawer Menu */}
              <nav className="flex-1 space-y-1.5 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center h-12 px-4 rounded-lg font-medium text-sm transition-all focus-ring
                        ${isActive 
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20 font-semibold' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'}
                      `}
                    >
                      <IconComponent className={`h-[18px] w-[18px] mr-3 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={settings.avatarUrl}
                    alt={settings.userName}
                    className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{settings.userName}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Premium Scholar</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-950/20 transition-all focus-ring"
                  aria-label="Logout"
                >
                  <LogOut className="h-[18px] w-[18px]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* MAIN CONTENT WRAPPER WITH NAVBAR                         */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        
        {/* NAVBAR */}
        <header className="h-16 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between px-4 sm:px-6 md:px-8 z-10 transition-colors">
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring mr-1"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Quick Logo on mobile only */}
            <div className="md:hidden h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-extrabold text-sm mr-2 flex-shrink-0 shadow-sm">
              ⚡
            </div>

            {/* Search Placeholder Input */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center max-w-sm w-full relative">
              <Search className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search notes, flashcards, quizzes... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800/70 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg pl-9 pr-3.5 py-2.5 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/10 transition-all font-medium"
              />
            </form>
          </div>

          {/* Nav Actions (Right) */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Search icon for mobile only */}
            <button
              onClick={() => {
                const query = prompt("What are you looking for?");
                if (query) showToast(`Searching for "${query}" (Coming in Phase 2!)`, 'info');
              }}
              className="sm:hidden p-2.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Theme Toggle Dropdown */}
            <Dropdown
              align="right"
              trigger={
                <button
                  className="p-2.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                  aria-label="Change theme"
                >
                  {currentThemeIcon()}
                </button>
              }
              items={[
                { id: 'light', label: 'Light Mode', icon: <Sun className="h-4 w-4 text-warning-500" />, onClick: () => setTheme('light') },
                { id: 'dark', label: 'Dark Mode', icon: <Moon className="h-4 w-4 text-primary-400" />, onClick: () => setTheme('dark') },
                { id: 'system', label: 'System Theme', icon: <Laptop className="h-4 w-4 text-slate-400" />, onClick: () => setTheme('system') }
              ]}
            />

            {/* Notification Bell */}
            <Dropdown
              align="right"
              trigger={
                <button
                  className="p-2.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                  aria-label="View notifications"
                >
                  <Bell className="h-[18px] w-[18px]" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-slate-900" />
                </button>
              }
              items={[
                { id: 'n1', label: '🔥 You have a 5-day Study Streak!', icon: <Activity className="h-4 w-4 text-success-500" />, onClick: () => showToast('Keep it up!', 'success') },
                { id: 'n2', label: '📅 Quiz "Calculus III" is due in 3 hours', icon: <Calendar className="h-4 w-4 text-warning-500" />, onClick: () => navigate('/quiz') },
                { id: 'n3', label: '⚡ Welcome to StudyFlow AI!', icon: <BookOpen className="h-4 w-4 text-primary-500" />, onClick: () => showToast('Explore features!', 'info') }
              ]}
            />

            {/* User Profile Dropdown */}
            <div className="h-7 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

            <Dropdown
              align="right"
              trigger={
                <button
                  className="flex items-center gap-2.5 pl-1.5 pr-1 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all focus-ring group"
                  aria-label="User profile menu"
                >
                  <img
                    src={settings.avatarUrl}
                    alt={settings.userName}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary-500/20 transition-all border border-slate-200 dark:border-slate-800"
                  />
                  <span className="hidden lg:block text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mr-1">
                    {settings.userName}
                  </span>
                </button>
              }
              items={[
                { id: 'p1', label: 'My Settings', icon: <User className="h-4 w-4" />, onClick: () => navigate('/settings') },
                { id: 'p2', label: 'Progress Board', icon: <BarChart3 className="h-4 w-4" />, onClick: () => navigate('/progress') },
                { id: 'p3', label: 'Logout', icon: <LogOut className="h-4 w-4 text-error-500" />, onClick: handleLogout }
              ]}
            />
          </div>
        </header>

        {/* MAIN PAGE AREA */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 max-w-7xl w-full mx-auto pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
