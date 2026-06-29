import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, RotateCcw, User, Bell, Sliders } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';
import { showToast } from '../components/ui/Toast';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const settingsSchema = z.object({
  userName: z.string().min(2, 'Name must be at least 2 characters').max(30, 'Name must be under 30 characters'),
  dailyGoalMinutes: z.coerce.number().min(10, 'Daily target must be at least 10 minutes').max(480, 'Daily target cannot exceed 480 minutes'),
  notificationsEnabled: z.boolean(),
  soundEnabled: z.boolean(),
  soundType: z.enum(['rain', 'waves', 'forest', 'none']),
  autoStartBreaks: z.boolean(),
  autoStartSessions: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useAppStore(
    useShallow((state) => ({
      settings: state.settings,
      updateSettings: state.updateSettings,
      resetSettings: state.resetSettings,
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      userName: settings.userName,
      dailyGoalMinutes: settings.dailyGoalMinutes,
      notificationsEnabled: settings.notificationsEnabled,
      soundEnabled: settings.soundEnabled,
      soundType: settings.soundType,
      autoStartBreaks: settings.autoStartBreaks,
      autoStartSessions: settings.autoStartSessions,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    updateSettings(data);
    showToast('Preferences updated successfully!', 'success');
    reset(data); // reset dirty state
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to restore default preferences?')) {
      resetSettings();
      // Reload states into hook-form
      reset({
        userName: 'Alex Mercer',
        dailyGoalMinutes: 60,
        notificationsEnabled: true,
        soundEnabled: true,
        soundType: 'rain',
        autoStartBreaks: false,
        autoStartSessions: true,
      });
      showToast('Settings restored to factory defaults', 'warning');
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="border-b border-slate-100 dark:border-slate-900 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Preferences & Settings</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Configure your personalized study targets, timers and notification layers.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
          
          {/* Section 1: Scholar Profile */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="py-4 flex gap-2 items-center">
              <User className="h-4.5 w-4.5 text-primary-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Scholar Profile</h3>
            </CardHeader>
            <CardBody className="p-5 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <img
                  src={settings.avatarUrl}
                  alt={settings.userName}
                  className="h-16 w-16 rounded-full object-cover border-2 border-primary-500/20"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Alex Mercer</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Premium Scholar Tier</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3.5 text-xs py-1.5"
                    onClick={() => showToast('Avatar upload is unlocked in Phase 2!', 'info')}
                  >
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Display Scholar Name"
                  placeholder="e.g. Alex Mercer"
                  error={errors.userName?.message}
                  {...register('userName')}
                />

                <Input
                  label="Daily Focus Target (Mins)"
                  type="number"
                  placeholder="e.g. 60"
                  error={errors.dailyGoalMinutes?.message}
                  {...register('dailyGoalMinutes')}
                />
              </div>
            </CardBody>
          </Card>

          {/* Section 2: Session Timers */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="py-4 flex gap-2 items-center">
              <Sliders className="h-4.5 w-4.5 text-primary-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Timer & Sound Space</h3>
            </CardHeader>
            <CardBody className="p-5 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Focus Ambient Track</label>
                  <select
                    {...register('soundType')}
                    className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-primary-500 text-slate-800 dark:text-slate-100 font-medium"
                  >
                    <option value="rain">Heavy Rain Over Forest</option>
                    <option value="waves">Binaural Ocean Waves</option>
                    <option value="forest">Deep Woods Ambience</option>
                    <option value="none">Total Silence Mode</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Ambient Audio</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Enable soundtracks inside timers</p>
                  </div>
                  <input
                    type="checkbox"
                    {...register('soundEnabled')}
                    className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Auto Start Breaks</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Trigger break timer instantly</p>
                  </div>
                  <input
                    type="checkbox"
                    {...register('autoStartBreaks')}
                    className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Auto Start Sessions</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Trigger study timers after breaks</p>
                  </div>
                  <input
                    type="checkbox"
                    {...register('autoStartSessions')}
                    className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Section 3: Notification Alerts */}
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="py-4 flex gap-2 items-center">
              <Bell className="h-4.5 w-4.5 text-primary-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Alerts & System Logs</h3>
            </CardHeader>
            <CardBody className="p-5">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Desktop Notifications</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">Receive audio alarms when study milestones expire</p>
                </div>
                <input
                  type="checkbox"
                  {...register('notificationsEnabled')}
                  className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700"
                />
              </div>
            </CardBody>
          </Card>

        </div>

        {/* Right Column: Actions Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 sticky top-24">
            <CardBody className="p-5 flex flex-col gap-4">
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Workspace Controls</h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
                Make sure you save modifications to sync preferences across current active browser workspaces.
              </p>
              
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="md" 
                  disabled={!isDirty}
                  leftIcon={<Save className="h-4 w-4" />}
                  className="w-full"
                >
                  Save Preferences
                </Button>
                
                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={handleResetToDefaults}
                  leftIcon={<RotateCcw className="h-4 w-4" />}
                  className="w-full"
                >
                  Reset Defaults
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

      </form>
    </div>
  );
};
