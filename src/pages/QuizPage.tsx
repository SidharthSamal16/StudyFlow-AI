import React from 'react';
import { HelpCircle, Sparkles, Plus, History, Award } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const QuizPage: React.FC = () => {
  const mockQuizzes = [
    { title: 'Calculus III - Triple Integrals', questions: 15, duration: '20 mins', score: '92%' },
    { title: 'General Pathology Review', questions: 30, duration: '40 mins', score: '85%' },
    { title: 'Software Design Patterns', questions: 10, duration: '15 mins', score: '100%' }
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Quiz Hub</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">Generate active questionnaires to challenge conceptual understanding.</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => showToast('Quiz creator is coming soon in Phase 2!', 'info')}
        >
          Create Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockQuizzes.map((quiz, idx) => (
          <Card key={idx} hoverEffect className="border border-slate-200/50 dark:border-slate-800">
            <CardBody className="p-5 flex flex-col justify-between h-44">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <Badge color="success" variant="subtle">
                    Score: {quiz.score}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{quiz.title}</h4>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1"><History className="h-3.5 w-3.5" /> {quiz.questions} Questions</span>
                <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> {quiz.duration}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="border border-dashed border-success-500/20 bg-success-50/10 dark:bg-success-950/5/10 relative overflow-hidden text-center py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 pointer-events-none" />
        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          <div className="h-14 w-14 rounded-2xl bg-success-100 dark:bg-success-950/40 text-success-600 dark:text-success-400 flex items-center justify-center mb-5">
            <Sparkles className="h-6 w-6" />
          </div>
          <Badge variant="subtle" color="success" className="mb-3">
            🎯 Interactive Mock Testing Coming Soon
          </Badge>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Phase 2: Self-Generated Exam Simulator</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-6 font-medium">
            Test yourself with automatically designed quizzes matching your exact learning syllabus. Includes detailed explanations for wrong answers and score correlation indexes.
          </p>
          <Button variant="outline" size="sm" onClick={() => showToast('Subscribed to quiz releases!', 'success')}>
            Join Quiz Beta List
          </Button>
        </div>
      </Card>
    </div>
  );
};
