import React, { useState } from 'react';
import { 
  Plus, 
  Flame, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  Brain, 
  Calendar, 
  Sparkles, 
  Clock, 
  Quote, 
  ArrowRight, 
  Trash2, 
  CheckCircle, 
  TrendingUp,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';
import { showToast } from '../components/ui/Toast';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Dialog } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';

const motivationalQuotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Productivity is being able to do things that you were never able to do before.", author: "Franz Kafka" },
  { text: "It is not that I am so smart, it is just that I stay with problems longer.", author: "Albert Einstein" },
  { text: "Deep work is the superpower of the 21st century.", author: "Cal Newport" }
];

export const Dashboard: React.FC = () => {
  const { 
    settings, 
    streakCount, 
    todayStudyMinutes, 
    tasks, 
    recentActivities, 
    weeklyProgress,
    addStudyMinutes,
    addTask,
    toggleTask,
    deleteTask,
    addActivity,
    incrementStreak
  } = useAppStore(
    useShallow((state) => ({
      settings: state.settings,
      streakCount: state.streakCount,
      todayStudyMinutes: state.todayStudyMinutes,
      tasks: state.tasks,
      recentActivities: state.recentActivities,
      weeklyProgress: state.weeklyProgress,
      addStudyMinutes: state.addStudyMinutes,
      addTask: state.addTask,
      toggleTask: state.toggleTask,
      deleteTask: state.deleteTask,
      addActivity: state.addActivity,
      incrementStreak: state.incrementStreak,
    }))
  );

  // Local state for modals/actions
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Computer Science');
  const [newTaskDuration, setNewTaskDuration] = useState('30');

  const [isStudyMinutesOpen, setIsStudyMinutesOpen] = useState(false);
  const [minutesToAdd, setMinutesToAdd] = useState('15');

  // Random quote of the day
  const [currentQuote] = useState(() => {
    const day = new Date().getDate();
    return motivationalQuotes[day % motivationalQuotes.length];
  });

  // Goal percentage calculation
  const goalPercentage = Math.min(100, Math.round((todayStudyMinutes / settings.dailyGoalMinutes) * 100));

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      showToast('Task title cannot be empty!', 'error');
      return;
    }
    addTask(newTaskTitle, newTaskCategory, parseInt(newTaskDuration, 10));
    showToast(`Task "${newTaskTitle}" created successfully!`, 'success');
    setNewTaskTitle('');
    setIsAddTaskOpen(false);
  };

  const handleAddMinutesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(minutesToAdd, 10);
    if (isNaN(mins) || mins <= 0) {
      showToast('Please enter a valid duration!', 'error');
      return;
    }
    addStudyMinutes(mins);
    addActivity(`Studied for ${mins} minutes`, 'focus', mins, 'Logged');
    showToast(`Logged ${mins} study minutes. Great job!`, 'success');
    setIsStudyMinutesOpen(false);
  };

  const triggerQuickAction = (actionType: 'note' | 'quiz' | 'focus' | 'summary' | 'planner') => {
    switch (actionType) {
      case 'note':
        showToast('Create Note workspace loaded. (Coming in Phase 2!)', 'info');
        break;
      case 'quiz':
        showToast('Loading AI Quiz Generator. (Coming in Phase 2!)', 'info');
        break;
      case 'focus':
        setIsStudyMinutesOpen(true);
        break;
      case 'summary':
        showToast('Upload workspace for AI Summaries. (Coming in Phase 2!)', 'info');
        break;
      case 'planner':
        setIsAddTaskOpen(true);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      
      {/* ======================================================== */}
      {/* 1. GREETING & GENERAL STATS                              */}
      {/* ======================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 dark:border-slate-900 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Welcome back, <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">{settings.userName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
            Learn Smarter. Study Better. Achieve More. Here is your overview for today.
          </p>
        </div>

        {/* Action Widgets (Streak & Log) */}
        <div className="flex items-center gap-3">
          {/* Streak Card */}
          <Card className="border border-warning-500/15 bg-warning-50/20 dark:bg-warning-950/10" onClick={incrementStreak}>
            <CardBody className="py-2.5 px-4 flex items-center gap-3 cursor-pointer">
              <div className="h-9 w-9 rounded-lg bg-warning-500 flex items-center justify-center text-white shadow-sm">
                <Flame className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-warning-700 dark:text-warning-500 leading-tight">Streak</p>
                <p className="text-sm font-black text-slate-800 dark:text-slate-200">{streakCount} Days</p>
              </div>
            </CardBody>
          </Card>

          {/* Quick Study Logs */}
          <Button 
            variant="primary" 
            size="md" 
            leftIcon={<Clock className="h-4 w-4" />}
            onClick={() => setIsStudyMinutesOpen(true)}
          >
            Log Study Time
          </Button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TODAY'S PROGRESS BAR                                 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Today's Goal Card */}
        <Card className="md:col-span-8 border border-primary-500/10">
          <CardBody className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">Today's Study Goal</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Active focus goal target</p>
                </div>
              </div>
              <Badge color={goalPercentage >= 100 ? 'success' : 'primary'} variant="subtle">
                {goalPercentage}% Met
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{todayStudyMinutes} mins completed</span>
                <span>Goal: {settings.dailyGoalMinutes} mins</span>
              </div>
              <ProgressBar value={todayStudyMinutes} max={settings.dailyGoalMinutes} color="primary" height="lg" />
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                {goalPercentage >= 100 
                  ? "🎉 Daily Target Achieved! Excellent concentration today." 
                  : `Keep going! You are ${settings.dailyGoalMinutes - todayStudyMinutes} focus minutes away from hitting your daily goal.`}
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Motivational Quote Widget */}
        <Card className="md:col-span-4 bg-gradient-to-br from-primary-600 to-accent-600 text-white relative border-none">
          {/* Mesh backdrop style */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,0,0,0.1),transparent_40%)]" />
          <CardBody className="p-6 flex flex-col justify-between h-full relative z-10">
            <div className="h-8 w-8 rounded-full bg-white/25 flex items-center justify-center text-white/90">
              <Quote className="h-4 w-4" />
            </div>
            
            <div className="my-5">
              <p className="text-sm font-semibold italic leading-relaxed text-white/90">
                "{currentQuote.text}"
              </p>
              <p className="text-[11px] font-black tracking-wider uppercase text-white/70 mt-3">
                &mdash; {currentQuote.author}
              </p>
            </div>

            <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
              StudyFlow Focus Reminders
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ======================================================== */}
      {/* 3. QUICK ACTIONS GRID                                   */}
      {/* ======================================================== */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <Card 
            hoverEffect 
            className="cursor-pointer border border-slate-200/50 dark:border-slate-800"
            onClick={() => triggerQuickAction('note')}
          >
            <CardBody className="p-4 flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">New Note</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-none">Create a layout</p>
              </div>
            </CardBody>
          </Card>

          <Card 
            hoverEffect 
            className="cursor-pointer border border-slate-200/50 dark:border-slate-800"
            onClick={() => triggerQuickAction('quiz')}
          >
            <CardBody className="p-4 flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-100 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 flex items-center justify-center shadow-sm">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Generate Quiz</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-none">Test parameters</p>
              </div>
            </CardBody>
          </Card>

          <Card 
            hoverEffect 
            className="cursor-pointer border border-slate-200/50 dark:border-slate-800"
            onClick={() => triggerQuickAction('focus')}
          >
            <CardBody className="p-4 flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success-100 dark:bg-success-950/40 text-success-600 dark:text-success-400 flex items-center justify-center shadow-sm">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Focus Session</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-none">Log ambient run</p>
              </div>
            </CardBody>
          </Card>

          <Card 
            hoverEffect 
            className="cursor-pointer border border-slate-200/50 dark:border-slate-800"
            onClick={() => triggerQuickAction('summary')}
          >
            <CardBody className="p-4 flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning-100 dark:bg-warning-950/40 text-warning-600 dark:text-warning-400 flex items-center justify-center shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">AI Summary</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-none">Summarize slides</p>
              </div>
            </CardBody>
          </Card>

          <Card 
            hoverEffect 
            className="cursor-pointer border border-slate-200/50 dark:border-slate-800 col-span-2 sm:col-span-1"
            onClick={() => triggerQuickAction('planner')}
          >
            <CardBody className="p-4 flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-sm">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Planner</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-none">Add scheduled task</p>
              </div>
            </CardBody>
          </Card>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN ANALYTICS AND INTERACTION PANELS                 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column (Weekly Progress Chart) */}
        <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
          
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex justify-between items-center py-4">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-50">Weekly Study Minutes</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">Comparing actual focus minutes vs. goal minutes</p>
              </div>
              <div className="flex gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-primary-500">
                  <span className="h-2 w-2 rounded-full bg-primary-500" />
                  <span>Actual</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 dark:text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span>Target</span>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-4 pt-6 h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '8px 12px'
                    }}
                    itemStyle={{ color: '#ffffff' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
                  />
                  <Bar dataKey="minutes" radius={[4, 4, 0, 0]} barSize={14}>
                    {weeklyProgress.map((entry, index) => {
                      const isComplete = entry.minutes >= entry.target;
                      return <Cell key={`cell-${index}`} fill={isComplete ? '#4f46e5' : '#818cf8'} />;
                    })}
                  </Bar>
                  <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={14} className="opacity-40 dark:opacity-10" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* AI Copilot Teaser Card */}
          <Card className="bg-gradient-to-r from-indigo-950/20 to-cyan-950/10 border border-primary-500/25 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-primary-500/10 -z-10">
              <Brain className="h-32 w-32" />
            </div>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-black tracking-widest text-primary-600 dark:text-primary-400 uppercase">AI Copilot Engine</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">Unlock Premium Active Learning</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-xl">
                Phase 1 complete! Soon you'll be able to drop PDFs or web links and generate active recall revision flashcards, customizable mock quizzes, and cognitive mapping plans with our intelligent model pipelines.
              </p>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => showToast('AI Assistant features will unlock in Phase 2!', 'info')}
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Join Phase 2 Beta
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column (Upcoming Tasks & Activities) */}
        <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
          
          {/* Upcoming Tasks Checklist */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex justify-between items-center py-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50">Daily Objectives</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{tasks.filter(t => !t.completed).length} items remaining</p>
              </div>
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 transition-colors focus-ring"
                aria-label="Add new objective"
              >
                <Plus className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardBody className="p-4 flex flex-col gap-3 max-h-[340px] overflow-y-auto">
              {tasks.length === 0 ? (
                <div className="py-8 text-center text-slate-400 dark:text-slate-500 font-semibold flex flex-col items-center gap-2">
                  <CheckCircle className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                  <p className="text-xs">All objectives completed!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-800/60 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center transition-all ${
                          task.completed 
                            ? 'bg-primary-600 border-primary-600 text-white' 
                            : 'border-slate-300 dark:border-slate-700 hover:border-primary-500'
                        }`}
                      >
                        {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                      </button>
                      <div className="min-w-0">
                        <p className={`text-xs font-semibold leading-normal truncate ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500">
                            {task.category}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 flex items-center gap-0.5">
                            <Clock className="h-2 w-2" /> {task.duration || 30}m
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        deleteTask(task.id);
                        showToast('Task removed', 'warning');
                      }}
                      className="p-1.5 text-slate-400 hover:text-error-500 opacity-0 group-hover:opacity-100 transition-all focus-ring rounded"
                      aria-label="Delete objective"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </CardBody>
          </Card>

          {/* Recent Activity Log */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="py-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50">Recent Activities</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">Your learning logs</p>
            </CardHeader>
            <CardBody className="p-4 flex flex-col gap-4 max-h-[300px] overflow-y-auto">
              {recentActivities.length === 0 ? (
                <p className="text-xs text-center text-slate-400 dark:text-slate-500 py-8">No recent logs found.</p>
              ) : (
                recentActivities.map((act) => {
                  const badgeColors: Record<string, string> = {
                    note: 'bg-primary-500/10 text-primary-600',
                    quiz: 'bg-accent-500/10 text-accent-600',
                    focus: 'bg-success-500/10 text-success-600',
                    planner: 'bg-slate-500/10 text-slate-600',
                    general: 'bg-warning-500/10 text-warning-600',
                  };

                  const colorClass = badgeColors[act.type] || badgeColors.general;

                  return (
                    <div key={act.id} className="flex gap-3">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${colorClass}`}>
                          {act.type === 'focus' && <Compass className="h-4 w-4" />}
                          {act.type === 'quiz' && <HelpCircle className="h-4 w-4" />}
                          {act.type === 'note' && <BookOpen className="h-4 w-4" />}
                          {act.type === 'planner' && <Calendar className="h-4 w-4" />}
                          {act.type === 'general' && <Sparkles className="h-4 w-4" />}
                        </div>
                        <div className="w-[1.5px] bg-slate-100 dark:bg-slate-800 flex-1 min-h-[16px] mt-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-snug">
                          {act.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500">{act.timestamp}</span>
                          {act.status && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                              <span className="text-[9px] font-bold uppercase text-primary-500 dark:text-primary-400">{act.status}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardBody>
          </Card>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. MODALS & FORMS (TASK ADDITION & TIME LOG)              */}
      {/* ======================================================== */}
      
      {/* Add Task Dialog */}
      <Dialog
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title="Create Scheduled Objective"
        description="Add a task to your daily study list to keep accountability high."
        size="sm"
      >
        <form onSubmit={handleAddTaskSubmit} className="flex flex-col gap-4">
          <Input
            label="Objective Title"
            placeholder="e.g. Complete Calculus Worksheet A"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
            autoFocus
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</label>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-primary-500 text-slate-800 dark:text-slate-100"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Medicine">Medicine</option>
                <option value="Chemistry">Chemistry</option>
                <option value="General Studies">General Studies</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duration (Mins)</label>
              <input
                type="number"
                min="5"
                max="300"
                value={newTaskDuration}
                onChange={(e) => setNewTaskDuration(e.target.value)}
                className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-primary-500 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" size="sm" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Objective
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Log Study Minutes Dialog */}
      <Dialog
        isOpen={isStudyMinutesOpen}
        onClose={() => setIsStudyMinutesOpen(false)}
        title="Log Focus Work"
        description="Completed study offline? Keep your daily streak active by adding minutes directly."
        size="sm"
      >
        <form onSubmit={handleAddMinutesSubmit} className="flex flex-col gap-4">
          <Input
            label="Duration focused (minutes)"
            type="number"
            min="1"
            max="480"
            value={minutesToAdd}
            onChange={(e) => setMinutesToAdd(e.target.value)}
            required
            autoFocus
          />
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" size="sm" onClick={() => setIsStudyMinutesOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Log Minutes
            </Button>
          </div>
        </form>
      </Dialog>

    </div>
  );
};
