import React from 'react';
import { Calendar, Sparkles, Plus, Clock } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const PlannerPage: React.FC = () => {
  const mockSchedules = [
    { title: 'Calculus Final Preparation', date: 'July 15, 2026', progress: 40, status: 'In Progress' },
    { title: 'Pathology Quiz Set B', date: 'July 2, 2026', progress: 100, status: 'Completed' },
    { title: 'System Security Audit', date: 'July 28, 2026', progress: 0, status: 'Not Started' }
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Study Planner</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Organize and schedule your upcoming deadlines and study milestones.</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => showToast('Planner addition coming soon in Phase 2!', 'info')}
        >
          Create Milestone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockSchedules.map((sched, idx) => (
          <Card key={idx} hoverEffect className="border border-slate-200/50 dark:border-slate-800">
            <CardBody className="p-5 flex flex-col justify-between h-44">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <Badge color={sched.status === 'Completed' ? 'success' : sched.status === 'In Progress' ? 'primary' : 'slate'} variant="subtle">
                    {sched.status}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{sched.title}</h4>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Due {sched.date}</span>
                <span>{sched.progress}%</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="border border-dashed border-primary-500/20 bg-primary-50/10 dark:bg-primary-950/5/10 relative overflow-hidden text-center py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-5">
            <Sparkles className="h-6 w-6" />
          </div>
          <Badge variant="subtle" color="primary" className="mb-3">
            📅 Automated Study Planner Coming Soon
          </Badge>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Phase 2: Intelligent Scheduler</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-6 font-medium">
            We are designing a scheduling calendar that charts preparation guidelines leading up to your exams, distributing card revisions and review sessions evenly to reduce stress.
          </p>
          <Button variant="outline" size="sm" onClick={() => showToast('Subscribed to calendar synchronization!', 'success')}>
            Join Planner Beta List
          </Button>
        </div>
      </Card>
    </div>
  );
};
