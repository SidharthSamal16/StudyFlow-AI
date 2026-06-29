import React from 'react';
import { BookOpen, FolderOpen, Plus } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const NotesPage: React.FC = () => {
  const mockNotebooks = [
    { title: 'Calculus III Lectures', count: 12, size: '2.4 MB', color: 'primary' },
    { title: 'Advanced Machine Learning', count: 8, size: '1.8 MB', color: 'accent' },
    { title: 'Pathophysiology Concepts', count: 19, size: '4.1 MB', color: 'success' },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Notes Library</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Structure, edit and digest academic papers seamlessly.</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => showToast('Note editor is coming soon in Phase 2!', 'info')}
        >
          Create Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockNotebooks.map((notebook, idx) => (
          <Card key={idx} hoverEffect className="border border-slate-200/50 dark:border-slate-800">
            <CardBody className="p-5 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <FolderOpen className="h-5 w-5" />
                </div>
                <Badge variant="subtle" color="slate">
                  {notebook.size}
                </Badge>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{notebook.title}</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-semibold">{notebook.count} detailed sub-pages</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Premium Coming Soon Card */}
      <Card className="border border-dashed border-primary-500/20 bg-primary-50/10 dark:bg-primary-950/5/10 relative overflow-hidden text-center py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-5">
            <BookOpen className="h-6 w-6" />
          </div>
          <Badge variant="subtle" color="primary" className="mb-3">
            📚 Notes Space Coming Soon
          </Badge>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Phase 2: Intelligent Note Engine</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-6 font-medium">
            We are designing an editing canvas inspired by Notion and Linear, letting you combine rich text blocks with direct AI querying, dynamic citation tables, and layout outputs.
          </p>
          <Button variant="outline" size="sm" onClick={() => showToast('Subscribed to Phase 2 Updates!', 'success')}>
            Notify Me on Launch
          </Button>
        </div>
      </Card>
    </div>
  );
};
