import React, { useState, useEffect, useRef } from 'react';
import { Compass, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';
import { useAppStore } from '../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export const FocusPage: React.FC = () => {
  const { addStudyMinutes, addActivity } = useAppStore(
    useShallow((state) => ({
      addStudyMinutes: state.addStudyMinutes,
      addActivity: state.addActivity,
    }))
  );
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [soundType, setSoundType] = useState<'rain' | 'waves' | 'none'>('rain');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Log 25 minutes study
      addStudyMinutes(25);
      addActivity('Completed Pomodoro Session', 'focus', 25, 'Completed');
      showToast('🎉 Focus session completed! Take a 5-minute break.', 'success', 5000);
      setTimeLeft(1500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, addStudyMinutes, addActivity]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    showToast(isActive ? 'Session Paused' : 'Focus Session Started', 'info');
  };

  const resetTimer = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(1500);
    showToast('Timer Reset', 'warning');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="border-b border-slate-100 dark:border-slate-900 pb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Deep Focus Space</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Immerse yourself in deep learning, accompanied by subtle ambient soundtracks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Beautiful minimalist timer card */}
        <div className="lg:col-span-8 flex justify-center">
          <Card className="w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative">
            <CardBody className="p-10 flex flex-col items-center justify-center text-center gap-8 relative">
              <div className="absolute top-4 right-4 flex gap-1.5">
                <Badge color="primary" variant="subtle">Pomodoro 25:00</Badge>
              </div>

              <div className="relative mt-4">
                <svg className="w-56 h-56 transform -rotate-90">
                  {/* Background track ring */}
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  {/* Dynamic Progress indicator ring */}
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 100}
                    strokeDashoffset={(1 - timeLeft / 1500) * (2 * Math.PI * 100)}
                    className="text-primary-600 transition-all duration-300"
                  />
                </svg>
                {/* Numeric timer display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-900 dark:text-slate-50 select-none">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {isActive ? 'Keep Focusing' : 'Paused'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={resetTimer}
                  className="rounded-full h-11 w-11 p-0 flex items-center justify-center"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="h-4 w-4 text-slate-500" />
                </Button>
                
                <Button 
                  variant={isActive ? "secondary" : "primary"}
                  size="lg" 
                  onClick={toggleTimer}
                  className="px-8 font-extrabold text-sm rounded-full"
                >
                  {isActive ? 'Pause' : 'Start Focus'}
                </Button>

                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={() => {
                    setIsMuted(!isMuted);
                    showToast(isMuted ? 'Ambient audio unmuted' : 'Ambient audio muted', 'info');
                  }}
                  className="rounded-full h-11 w-11 p-0 flex items-center justify-center"
                  aria-label="Mute ambient sound"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-primary-500" />}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right: Ambient Sound settings and information */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardBody className="p-5 flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 uppercase tracking-wider">Acoustic Space</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
                Select your preferred neural flow layer to mask distracting background acoustics.
              </p>
              
              <div className="flex flex-col gap-2.5 mt-2">
                {[
                  { id: 'rain', label: 'Heavy Rain Over Forest', desc: 'Deep broadband white noise' },
                  { id: 'waves', label: 'Binaural Ocean Waves', desc: 'Alpha-wave synchronization' },
                  { id: 'none', label: 'Total Silence Mode', desc: 'No ambient generation' }
                ].map((sound) => (
                  <div
                    key={sound.id}
                    onClick={() => {
                      setSoundType(sound.id as any);
                      showToast(`Switched ambient track to: ${sound.label}`, 'success');
                    }}
                    className={`
                      p-3 rounded-xl border text-left cursor-pointer transition-all
                      ${soundType === sound.id 
                        ? 'border-primary-500 bg-primary-50/40 dark:bg-primary-950/20' 
                        : 'border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}
                    `}
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{sound.label}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-none">{sound.desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <CardBody className="p-4 flex gap-3">
              <Compass className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Did you know?</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed mt-1 font-semibold">
                  A 25-minute study run coupled with a 5-minute structured break maintains memory retrieval rates 3x higher compared to long study runs.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

      </div>
    </div>
  );
};
