import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Quote,
  Zap,
  Award
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-primary-500" />,
    title: "AI Study Copilot",
    description: "Generate summaries, mock quizzes, flashcards, and conceptual frameworks instantly from your study material."
  },
  {
    icon: <Brain className="h-6 w-6 text-accent-500" />,
    title: "Adaptive Recall System",
    description: "Our intelligent space-repetition algorithms track memory retention to help you review cards at optimal intervals."
  },
  {
    icon: <Clock className="h-6 w-6 text-success-500" />,
    title: "Deep Focus Ambient Mode",
    description: "Block out distractions with minimalist layouts and integrated high-fidelity ambient auditory spaces."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-warning-500" />,
    title: "Precision Progress Insights",
    description: "Visualize study patterns, track learning streaks, and receive detailed data-driven tips to optimize schedule load."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary-400" />,
    title: "Instant Active Quizzes",
    description: "Convert slides or markdown text into interactive custom questionnaires with immediate analytical reports."
  },
  {
    icon: <Award className="h-6 w-6 text-accent-400" />,
    title: "Intelligent Daily Planner",
    description: "Set achievable milestones and track task progress in an automated hub tailored to your exam schedules."
  }
];

const reasons = [
  {
    title: "94% Score Optimization",
    desc: "Students utilizing StudyFlow adaptive cards reported a 94% increase in memory retrieval score."
  },
  {
    title: "Saves 10+ Hours Weekly",
    desc: "AI study generation eliminates the manual time spent on formatting flashcards and quizzes."
  },
  {
    title: "Zero Cognitive Friction",
    desc: "Clean, elegant layouts inspired by premium productivity tools avoid information overload."
  }
];

const testimonials = [
  {
    name: "Eleanor Vance",
    role: "M.D. Candidate, Stanford University",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    quote: "StudyFlow AI revolutionized my pre-clinical preparation. I created custom recall decks in seconds instead of wasting precious weekend hours typing cards manually.",
    rating: 5
  },
  {
    name: "Marcus Aurelius",
    role: "B.S. Software Engineering, MIT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    quote: "The interface feels like Linear meets Arc Browser. It is incredibly clean, keyboard-friendly, and has zero clutter. Essential for long, intense computer science study runs.",
    rating: 5
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden min-h-screen">
      
      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-900/50 flex items-center justify-between px-6 md:px-12 z-50">
        <div className="flex items-center gap-2.5 select-none">
          <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            ⚡
          </div>
          <span className="font-extrabold text-lg bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            StudyFlow AI
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <button onClick={scrollToFeatures} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</button>
          <a href="#benefits-section" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Why StudyFlow</a>
          <a href="#testimonials-section" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Reviews</a>
        </nav>

        <div>
          <Button variant="primary" size="sm" onClick={handleGetStarted} rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            Get Started
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Abstract Backdrop Gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-tr from-primary-500/10 to-accent-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Badge variant="subtle" color="primary" className="py-1 px-3 text-xs tracking-wider uppercase font-semibold">
            ✨ Introducing StudyFlow AI Phase 1
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          Learn <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Smarter</span>.<br />
          Study Better. Achieve More.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-medium"
        >
          StudyFlow AI blends adaptive space-repetition flashcards, distraction-free focus modes, deep visual progress analytics, and active recall testing into a premium study experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Button variant="primary" size="lg" onClick={handleGetStarted} rightIcon={<ArrowRight className="h-4 w-4" />} className="w-full sm:w-auto">
            Get Started Free
          </Button>
          <Button variant="outline" size="lg" onClick={scrollToFeatures} className="w-full sm:w-auto">
            Learn More
          </Button>
        </motion.div>
      </section>

      {/* SCREENSHOT PLACEHOLDER */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-primary-500/5 overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div className="h-3 w-3 rounded-full bg-error-500" />
            <div className="h-3 w-3 rounded-full bg-warning-500" />
            <div className="h-3 w-3 rounded-full bg-success-500" />
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold ml-2">https://app.studyflow.ai/dashboard</span>
          </div>
          
          <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 sm:p-12 text-center relative overflow-hidden group">
            {/* Visual background accents */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-50 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
              <div className="h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-950/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-50">Experience the Full Interactive Dashboard</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Click Get Started to explore our fully functional desktop-and-mobile layout, featuring customizable focus targets, streak logs, a responsive daily task manager, visual graphs, and personalized settings.
              </p>
              <Button variant="primary" size="md" onClick={handleGetStarted} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Launch App Dashboard
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features-section" className="py-24 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/40 dark:border-slate-900/50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge color="accent" className="mb-3 uppercase text-[10px] tracking-wider font-extrabold">Full Feature Suite</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">Every Study tool, Reimagined.</h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
              We design premium tools that strip away complexity, providing clean interactive pipelines so you can concentrate purely on content acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="h-full border border-slate-200/60 dark:border-slate-800/60 shadow-sm" hoverEffect>
                  <CardBody className="p-6">
                    <div className="h-11 w-11 rounded-lg bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mb-4 text-slate-800 dark:text-slate-200">
                      {feat.icon}
                    </div>
                    <h4 className="text-base font-extrabold mb-2 text-slate-900 dark:text-slate-50">{feat.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STUDYFLOW AI */}
      <section id="benefits-section" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <Badge color="success" className="mb-3 uppercase text-[10px] tracking-wider font-extrabold">The StudyFlow Edge</Badge>
            <h2 className="text-3xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-slate-50">Why High Achievers Choose StudyFlow</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
              Our architecture respects cognitive load constraints. We avoid flashing notifications and clutter, designing high-level pathways modeled after the memory-consolidation principles of Cognitive Science.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Clean keyboard navigation workflows</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Offline PWA workspace backup</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Zero distracting ad layouts</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 flex flex-col gap-5">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="border-l-4 border-l-primary-500 border border-slate-200 dark:border-slate-800">
                  <CardBody className="p-5">
                    <h5 className="font-extrabold text-sm text-primary-600 dark:text-primary-400 mb-1">{reason.title}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">{reason.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials-section" className="py-24 bg-slate-100/30 dark:bg-slate-900/10 border-t border-slate-200/40 dark:border-slate-900/50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge color="warning" className="mb-3 uppercase text-[10px] tracking-wider font-extrabold">Success Stories</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Vetted by Top Students</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="h-full border border-slate-200/80 dark:border-slate-800/80 relative">
                  <CardBody className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-warning-400 text-warning-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-slate-200 dark:text-slate-800 mb-2 absolute top-6 right-6" />
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6 font-semibold relative z-10">
                        "{test.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                      <img
                        src={test.image}
                        alt={test.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                      />
                      <div>
                        <h6 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-50">{test.name}</h6>
                        <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold">{test.role}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600 dark:bg-slate-900 -z-20" />
        {/* Radial mesh decorative pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center text-white flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">Ready to Master Your Material?</h2>
          <p className="text-primary-100 text-sm sm:text-base max-w-2xl mb-10 leading-relaxed font-semibold">
            Join thousands of high-achieving medical, software, and academic professionals who have structured their learning pathways using StudyFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button variant="accent" size="lg" onClick={handleGetStarted} rightIcon={<ArrowRight className="h-4 w-4" />} className="w-full sm:w-auto text-white">
              Launch App Free
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-900 px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 select-none">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                ⚡
              </div>
              <span className="font-extrabold text-base bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                StudyFlow AI
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
              Premium UI-centric AI learning space tailored to simplify the retention pipeline. Phase 1 Release.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Features</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">Active Recall</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">Deep Focus Ambient</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">Quizzes</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Product</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">Pricing (Free)</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">Change Log</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">Framework</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Status</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success-500 animate-pulse" />
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-100 dark:border-slate-900/60 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          <span>&copy; {new Date().getFullYear()} StudyFlow AI. Built with React 19 & Tailwind CSS. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
