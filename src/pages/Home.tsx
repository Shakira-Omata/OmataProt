import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Users,
  Download,
  ArrowRight,
  Accessibility,
  Lightbulb
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import topicsData from '../data/topics.json';
import quizData from '../data/quiz.json';
import tipsData from '../data/tips.json';
import { useAccessibility } from '../context/AccessibilityContext';

// Import all hero images
import hero1 from '../assets/Hero.png';
import hero2 from '../assets/All.png';
import hero3 from '../assets/Collaborating.png';
import hero4 from '../assets/Community.png';
import hero5 from '../assets/Inclusive.png';
import hero6 from '../assets/Smilling woman.png';
import hero7 from '../assets/Accessible design for all users.png';

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

const Home: React.FC = () => {
  const { isEasyRead, setIsEasyRead, isAudioEnabled, setIsAudioEnabled, contrastMode, setContrastMode } = useAccessibility();
  const [currentHero, setCurrentHero] = React.useState(0);
  const featuredTopics = topicsData.slice(0, 3);

  const dailyTip = React.useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    return tipsData[dayIndex % tipsData.length];
  }, []);

  // Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = React.useState(() => Math.floor(Math.random() * quizData.length));
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [showNext, setShowNext] = React.useState(false);

  const currentQuiz = quizData[currentQuizIdx];

  const handleOptionClick = (index: number) => {
    if (showNext) return;
    setSelectedOption(index);
    const correct = index === currentQuiz.answer;
    setIsCorrect(correct);
    if (correct) {
      setShowNext(true);
    }
  };

  const handleNextQuestion = () => {
    let nextIdx = Math.floor(Math.random() * quizData.length);
    while (nextIdx === currentQuizIdx && quizData.length > 1) {
      nextIdx = Math.floor(Math.random() * quizData.length);
    }
    setCurrentQuizIdx(nextIdx);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowNext(false);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-primary/10 p-8 md:p-16 lg:p-24 flex flex-col items-center text-center gap-16 border border-primary/20">
        <div className="w-full max-w-5xl relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-2 group-hover:rotate-3 transition-transform duration-500 shadow-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
            <img
              key={currentHero}
              src={heroImages[currentHero]}
              alt="Diverse youth discussing SRHR"
              className="w-full aspect-[16/10] md:aspect-video object-cover animate-in fade-in zoom-in-95 duration-700 transition-all"
            />
            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentHero(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    currentHero === i ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 text-primary rounded-full text-sm font-bold tracking-widest uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            Your Safe Space
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.05] tracking-tight">
            SRHR Education <br /><span className="text-primary italic font-serif">For All</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to SalamaHub, your judgment-free home for accurate, inclusive, and rights-based sexual health information in Kenya.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link to="/learn" className="btn btn-primary h-16 px-10 text-xl rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
              Start Learning
            </Link>
            <Link to="/support" className="btn btn-secondary h-16 px-10 text-xl rounded-2xl border border-border bg-white/50 backdrop-blur-sm hover:bg-slate-100 active:scale-95 transition-all">
              Find Support
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row gap-12 overflow-hidden relative group border border-border shadow-2xl">
          <div className="absolute top-0 right-0 p-8 text-primary/10 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
            <HelpCircle size={240} />
          </div>

          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              Quick Quiz
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">{currentQuiz.question}</h3>
            <p className="text-muted-foreground text-lg">Test your knowledge and learn something new today!</p>

            {showNext && (
              <button
                onClick={handleNextQuestion}
                className="btn btn-primary h-14 px-8 text-lg rounded-2xl animate-in zoom-in group/btn"
              >
                Next Question <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {selectedOption !== null && !isCorrect && (
              <div className="text-red-400 font-bold animate-in shake-in duration-300">
                Not quite! Try another option.
              </div>
            )}
          </div>

          <div className="flex-1 grid gap-4 relative z-10">
            {currentQuiz.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(i)}
                disabled={showNext}
                className={cn(
                  "text-left p-6 rounded-[1.5rem] border-2 transition-all font-bold text-lg",
                  selectedOption === i
                    ? isCorrect
                      ? "bg-primary/20 border-primary text-foreground shadow-[0_0_20px_rgba(255,107,107,0.3)]"
                      : "bg-destructive/10 border-destructive text-destructive"
                    : "bg-secondary border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm",
                    selectedOption === i && isCorrect ? "bg-primary border-primary text-white" : "border-border"
                  )}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="space-y-8">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Topics</h2>
            <p className="text-muted-foreground">Essential learning for every young person.</p>
          </div>
          <Link to="/learn" className="text-primary font-bold flex items-center gap-2 group">
            See all <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredTopics.map((topic) => (
            <Link key={topic.id} to={`/learn/${topic.id}`} className="card group hover:border-primary/50">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
              <p className="text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{topic.description}</p>
              <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Accessibility Support Section */}
      <section className="grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="bg-secondary rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-border">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center text-primary shadow-sm border border-border">
              <Accessibility size={32} />
            </div>
            <h3 className="text-3xl font-bold text-foreground leading-tight">Inclusive Access for Everyone</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've built SalamaHub to be used by all young people, including those with disabilities. Customize your experience for maximum comfort.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={cn(
                "px-4 py-2 rounded-xl border font-bold text-sm transition-all",
                isAudioEnabled ? "bg-primary text-white border-primary shadow-md scale-105" : "bg-card border-border text-foreground hover:border-primary"
              )}
            >
              Audio Support {isAudioEnabled ? "✓" : ""}
            </button>
            <button className="px-4 py-2 rounded-xl bg-card border border-border font-bold text-sm opacity-50 cursor-not-allowed text-foreground">Large Text</button>
            <button
              onClick={() => setContrastMode(contrastMode === 'default' ? 'yellow' : 'default')}
              className={cn(
                "px-4 py-2 rounded-xl border font-bold text-sm transition-all",
                contrastMode !== 'default' ? "bg-primary text-white border-primary shadow-md scale-105" : "bg-card border-border text-foreground hover:border-primary"
              )}
            >
              High Contrast {contrastMode !== 'default' ? "✓" : ""}
            </button>
            <button
              onClick={() => setIsEasyRead(!isEasyRead)}
              className={cn(
                "px-4 py-2 rounded-xl border font-bold text-sm transition-all",
                isEasyRead ? "bg-primary text-white border-primary shadow-md scale-105" : "bg-card border-border text-foreground hover:border-primary"
              )}
            >
              Easy Read {isEasyRead ? "✓" : ""}
            </button>
          </div>
        </div>

        <div className="bg-card rounded-[2.5rem] p-8 md:p-10 border border-border flex flex-col justify-center items-center text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-sm">
            <Lightbulb size={32} />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Daily SRHR Tip</h3>
          <p className="text-muted-foreground italic">"{dailyTip}"</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-card border rounded-[2.5rem] p-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <Link to="/rights" className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <span className="font-bold text-sm">Your Rights</span>
          </Link>
          <Link to="/diverse" className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <Users size={24} />
            </div>
            <span className="font-bold text-sm">Diverse Corner</span>
          </Link>
          <Link to="/myths" className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <Lightbulb size={24} />
            </div>
            <span className="font-bold text-sm">Myths & Facts</span>
          </Link>
          <Link to="/guides" className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <Download size={24} />
            </div>
            <span className="font-bold text-sm">Downloads</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
