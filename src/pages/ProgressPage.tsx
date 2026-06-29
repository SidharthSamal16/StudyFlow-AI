import React from 'react';
import { TrendingUp, Award, Clock, Flame } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAppStore } from '../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export const ProgressPage: React.FC = () => {
  const { streakCount, todayStudyMinutes } = useAppStore(
    useShallow((state) => ({
      streakCount: state.streakCount,
      todayStudyMinutes: state.todayStudyMinutes,
    }))
  );

  const achievements = [
    { title: 'The Architect', desc: 'Maintained a 5-day study streak.', date: 'Today', status: 'Unlocked', badge: <Flame className="h-4 w-4" /> },
    { title: 'Focus Disciple', desc: 'Logged 300+ total study minutes.', date: '2 days ago', status: 'Unlocked', badge: <Clock className="h-4 w-4" /> },
    { title: 'Test Conqueror', desc: 'Achieved 90%+ score on a mock quiz.', date: 'Yesterday', status: 'Unlocked', badge: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="border-b border-slate-100 dark:border-slate-900 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Progress Analytics</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Review learning statistics, achievement milestones and analytical insights.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardBody className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Todayfocused</p>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">{todayStudyMinutes} Mins</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardBody className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-warning-100 dark:bg-warning-950/40 text-warning-600 dark:text-warning-400 flex items-center justify-center">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Current Streak</p>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">{streakCount} Days</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardBody className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-success-100 dark:bg-success-950/40 text-success-600 dark:text-success-400 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mock Quiz Mastery</p>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">89% Avg</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-800">
          <CardBody className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-accent-100 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Syllabus Progress</p>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">65% Done</h3>
            </div>
          </CardBody>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Milestone Achievement List */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="py-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Achievements Unlocked</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">Your unlocked badges</p>
            </CardHeader>
            <CardBody className="p-4 flex flex-col gap-4">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
                  <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                    {ach.badge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ach.title}</h4>
                      <Badge color="success" variant="subtle" className="text-[9px] py-0 px-1.5">{ach.status}</Badge>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-semibold">{ach.desc}</p>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1.5 font-bold uppercase">{ach.date}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Right column: Target Goals tracker */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardBody className="p-5 flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Learning Goals Goal-Meter</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
                Your goals represent standard targets for preparation completion.
              </p>

              <div className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Weekly Focus Limit</span>
                    <span>300 / 420 mins</span>
                  </div>
                  <ProgressBar value={300} max={420} color="primary" height="sm" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Quiz Set Completion</span>
                    <span>4 / 5 Quizzes</span>
                  </div>
                  <ProgressBar value={40} max={50} color="accent" height="sm" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Active Memory Recall Cards</span>
                    <span>120 / 150 Cards</span>
                  </div>
                  <ProgressBar value={120} max={150} color="success" height="sm" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </div>
    </div>
  );
};
