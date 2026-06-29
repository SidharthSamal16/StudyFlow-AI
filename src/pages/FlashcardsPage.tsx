import React from 'react';
import { Layers, Sparkles, Plus, Clock, Brain } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const FlashcardsPage: React.FC = () => {
  const mockDecks = [
    { name: 'Skeletal System Anatomy', size: 45, master: 12, color: 'accent' },
    { name: 'React Hooks Lifecycle', size: 24, master: 21, color: 'primary' },
    { name: 'Organic Chemistry Reactions', size: 55, master: 38, color: 'warning' }
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Active Recall Decks</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Review critical materials using space repetition.</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => showToast('Card creation coming soon in Phase 2!', 'info')}
        >
          Create Deck
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockDecks.map((deck, idx) => (
          <Card key={idx} hoverEffect className="border border-slate-200/50 dark:border-slate-800">
            <CardBody className="p-5 flex flex-col justify-between h-44">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <Layers className="h-5 w-5" />
                  </div>
                  <Badge color="accent" variant="subtle">
                    {deck.size} Cards
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{deck.name}</h4>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1"><Brain className="h-3.5 w-3.5" /> Mastery: {Math.round((deck.master / deck.size) * 100)}%</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Due: Today</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="border border-dashed border-accent-500/20 bg-accent-50/10 dark:bg-accent-950/5/10 relative overflow-hidden text-center py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-accent-100 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-5">
            <Sparkles className="h-6 w-6" />
          </div>
          <Badge variant="subtle" color="accent" className="mb-3">
            🧠 Active Recall Decks Coming Soon
          </Badge>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Phase 2: Supercharged Recall</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-6 font-medium">
            We are preparing an Leitner spacing engine that feeds automatically on notes and documents, selecting terms and definitions to construct cards with zero efforts from your end.
          </p>
          <Button variant="outline" size="sm" onClick={() => showToast('Subscribed to recall alerts!', 'success')}>
            Join Recall Beta List
          </Button>
        </div>
      </Card>
    </div>
  );
};
