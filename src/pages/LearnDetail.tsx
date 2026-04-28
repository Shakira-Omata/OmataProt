import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Lightbulb,
  HelpCircle,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import topics from '../data/topics/index';
import { useAccessibility } from '../context/AccessibilityContext';
import MenstrualHealthResources from '../components/MenstrualHealthResources';
import {
  SectionCard,
  CardTitle,
  CardContent,
  InfoBox,
  BaseCard,
  GridContainer,
  HeroSummaryCard,
  ContentSectionCard,
  TrimesterCard,
  IconList
} from '../components/DesignSystem';

const LearnDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEasyRead, isAudioEnabled } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const topic = topics.find(t => t.id === id) as any;

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const textToSpeak = isEasyRead && topic.easyReadContent 
        ? topic.easyReadContent 
        : topic.content;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
        <h2 className="text-3xl font-bold mb-4">Topic not found</h2>
        <Link to="/learn" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Back to all topics</Link>
      </div>
    );
  }

  const nextTopic = topics[topics.indexOf(topic) + 1] || topics[0];

  return (
    <div className="w-full space-y-12 animate-in slide-in-from-bottom duration-700">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-3 text-sm font-semibold text-slate-600 px-2">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 hover:text-blue-600 transition-colors hover:underline"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <span className="text-slate-300">/</span>
        <Link to="/learn" className="hover:text-blue-600 transition-colors hover:underline">Learn SRHR</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold truncate">{topic.title}</span>
      </nav>

      {/* Hero Section */}
      <section className="space-y-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
            <CheckCircle2 size={18} /> Verified & Youth-Friendly Content
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
            {topic.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-medium">
            {topic.description}
          </p>
        </div>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-6 py-6 border-y-2 border-slate-200">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Clock size={18} className="text-blue-600" /> 5 min read
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <ShieldCheck size={18} className="text-green-600" /> Evidence-Based
          </div>

          {isAudioEnabled && (
            <button 
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                isPlaying 
                  ? "bg-blue-600 text-white" 
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? "Stop" : "Listen"}
            </button>
          )}

          <div className="ml-auto flex gap-2">
            <button className="p-3 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-all" title="Bookmark">
              <Bookmark size={20} />
            </button>
            <button className="p-3 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-all" title="Share">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Hero Summary Card */}
      <HeroSummaryCard
        keyFacts={[
          "Early prenatal care reduces complications by up to 70%",
          "Kenya provides free antenatal care in public facilities",
          "Regular checkups monitor both maternal and fetal health",
          "Proper nutrition prevents birth defects and supports development"
        ]}
        keyRights={[
          "Access to quality healthcare without discrimination",
          "Right to informed consent and birth choices",
          "Protection from harmful traditional practices",
          "Support for working mothers and students"
        ]}
      />

      {/* Main Content Section */}
      <section className="space-y-8">
        {topic.id === 'pregnancy-parenthood' ? (
          // Special layout for pregnancy topic with trimesters
          <>
            <ContentSectionCard
              title="Confirming Pregnancy & Early Steps"
              icon="🤰"
            >
              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed">
                  Pregnancy begins when a fertilized egg implants in the uterus. Early signs include missed periods, nausea, breast tenderness, fatigue, and frequent urination.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Home Pregnancy Tests</h4>
                    <IconList
                      items={[
                        "Available at pharmacies",
                        "Most accurate after missed period",
                        "Follow instructions carefully"
                      ]}
                      icon="🏠"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Medical Confirmation</h4>
                    <IconList
                      items={[
                        "Visit clinic for blood/urine tests",
                        "Ultrasound to confirm and date pregnancy",
                        "Schedule within 8-10 weeks"
                      ]}
                      icon="🏥"
                    />
                  </div>
                </div>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Prenatal Care Journey"
              icon="👩‍⚕️"
              didYouKnow="Kenya's Ministry of Health recommends at least 8 antenatal visits for optimal pregnancy outcomes."
            >
              <p className="text-slate-700 leading-relaxed mb-6">
                Regular checkups monitor your and baby's health throughout pregnancy. Each trimester brings different focus areas and important milestones.
              </p>

              <GridContainer cols={3} gap="lg">
                <TrimesterCard
                  title="First Trimester (Weeks 1-12)"
                  icon="🌱"
                  milestones={[
                    "Pregnancy confirmation and dating",
                    "Major organ development begins",
                    "Neural tube formation (brain & spine)"
                  ]}
                  symptoms={[
                    "Nausea and morning sickness",
                    "Breast tenderness and fatigue",
                    "Frequent urination and mood changes"
                  ]}
                  care={[
                    "Start folic acid supplementation",
                    "Avoid alcohol, smoking, certain medications",
                    "Initial clinic visit and blood tests",
                    "Begin healthy eating habits"
                  ]}
                />

                <TrimesterCard
                  title="Second Trimester (Weeks 13-26)"
                  icon="🌿"
                  milestones={[
                    "Fetal movement felt by mother",
                    "Organs continue developing",
                    "Baby can hear sounds"
                  ]}
                  symptoms={[
                    "Reduced nausea for most women",
                    "Increased energy levels",
                    "Visible baby bump growth"
                  ]}
                  care={[
                    "Anatomy scan ultrasound",
                    "Screening for gestational diabetes",
                    "Anemia prevention with iron supplements",
                    "Regular blood pressure monitoring"
                  ]}
                />

                <TrimesterCard
                  title="Third Trimester (Weeks 27-40)"
                  icon="🌳"
                  milestones={[
                    "Lungs mature for breathing air",
                    "Brain development accelerates",
                    "Baby gains weight rapidly"
                  ]}
                  symptoms={[
                    "Back pain and swelling",
                    "Braxton Hicks contractions",
                    "Sleep disturbances"
                  ]}
                  care={[
                    "Fetal growth monitoring",
                    "Preparing birth plan and preferences",
                    "Kick counting to monitor movement",
                    "Final ultrasounds and checkups"
                  ]}
                />
              </GridContainer>
            </ContentSectionCard>

            <ContentSectionCard
              title="Nutrition & Healthy Eating"
              icon="🥗"
            >
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-slate-700 font-medium">
                    <strong>Calorie Needs:</strong> Increase by 300-500 calories daily; focus on nutrient-dense foods.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Essential Nutrients</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-green-700">Folic Acid</h5>
                        <p className="text-sm text-slate-600">Prevents neural tube defects; found in leafy greens, beans, fortified cereals.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-700">Iron</h5>
                        <p className="text-sm text-slate-600">Prevents anemia; sources: red meat, beans, fortified foods, supplements.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-700">Calcium</h5>
                        <p className="text-sm text-slate-600">For bones; dairy, fortified plant milks, leafy greens.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Foods to Include</h4>
                    <IconList
                      items={[
                        "Fresh fruits and vegetables daily",
                        "Whole grains and complex carbohydrates",
                        "Lean proteins: eggs, fish, legumes",
                        "Healthy fats: avocados, nuts, olive oil"
                      ]}
                      icon="🥑"
                    />

                    <h4 className="text-lg font-semibold text-slate-900 mb-3 mt-6">Foods to Avoid</h4>
                    <IconList
                      items={[
                        "Raw or undercooked meats",
                        "Unpasteurized dairy products",
                        "High-mercury fish",
                        "Excessive caffeine"
                      ]}
                      icon="🚫"
                    />
                  </div>
                </div>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Safe Delivery in Kenya"
              icon="🏥"
              didYouKnow="Kenya has made significant improvements in maternal health services, with skilled birth attendants available in most facilities."
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🏥</div>
                    <h4 className="font-semibold text-green-800">Hospital Birth</h4>
                    <p className="text-sm text-green-700">Recommended for most; access to emergency care</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🏥</div>
                    <h4 className="font-semibold text-blue-800">Health Center</h4>
                    <p className="text-sm text-blue-700">For low-risk pregnancies with midwives</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🏠</div>
                    <h4 className="font-semibold text-amber-800">Home Birth</h4>
                    <p className="text-sm text-amber-700">Only with skilled attendant; higher risks</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Stages of Labor</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                      <div>
                        <h5 className="font-semibold text-slate-900">Early Labor</h5>
                        <p className="text-sm text-slate-600">Contractions every 5-10 minutes, cervix dilating</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                      <div>
                        <h5 className="font-semibold text-slate-900">Active Labor</h5>
                        <p className="text-sm text-slate-600">Strong contractions, water breaking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                      <div>
                        <h5 className="font-semibold text-slate-900">Transition</h5>
                        <p className="text-sm text-slate-600">Intense phase before pushing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                      <div>
                        <h5 className="font-semibold text-slate-900">Pushing/Delivery</h5>
                        <p className="text-sm text-slate-600">Baby's birth, then placenta</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentSectionCard>
          </>
        ) : (
          // Default content layout for other topics
          <BaseCard className="overflow-hidden">
            <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-blue-50/50 border-b-2 border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb size={24} className="text-blue-600" />
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                  {isEasyRead ? "Easy-Read Summary" : "What You Need To Know"}
                </h2>
              </div>
              {isEasyRead && (
                <div className="mt-3 px-3 py-1 inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-widest">
                  ✓ Simplified Version
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
                {isEasyRead && topic.easyReadContent ? (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 md:p-8 whitespace-pre-line text-base md:text-lg font-medium text-slate-800">
                    {topic.easyReadContent}
                  </div>
                ) : (
                  <div className="space-y-6 whitespace-pre-line">
                    {topic.content.split('\n\n').map((block: string, i: number) => {
                      if (block.startsWith('###')) {
                        return (
                          <h3
                            key={i}
                            className="text-2xl md:text-3xl font-black text-slate-900 pt-6 mt-8 mb-4 border-l-4 border-blue-600 pl-4"
                          >
                            {block.replace('###', '').trim()}
                          </h3>
                        );
                      }
                      if (block.startsWith('**')) {
                        return (
                          <p key={i} className="font-bold text-slate-900 text-lg">
                            {block.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      return <p key={i} className="text-base md:text-lg leading-relaxed">{block}</p>;
                    })}
                  </div>
                )}
              </div>
            </div>
          </BaseCard>
        )}
      </section>

      {/* Key Takeaways & Support */}
      <GridContainer cols={2} gap="lg">
        <SectionCard
          title="Key Takeaways"
          icon={<CheckCircle2 size={24} />}
          colorScheme="blue"
        >
          <ul className="space-y-4">
            {["Always prioritize your health and wellbeing", "Seek support from trusted sources", "You have agency over your body"].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-base text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Need Support?"
          icon={<HelpCircle size={24} />}
          colorScheme="green"
        >
          <p className="text-base text-slate-700 mb-6 leading-relaxed">
            If you have questions or need help, our support directory can connect you with youth-friendly services in your area.
          </p>
          <Link 
            to="/support" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors w-full"
          >
            Find Support <ChevronRight size={18} />
          </Link>
        </SectionCard>
      </GridContainer>

      {/* Topic-Specific Resources */}
      {topic.resources && <MenstrualHealthResources resources={topic.resources} />}

      {/* Next Topic CTA */}
      <div className="pt-12 border-t-2 border-slate-200">
        <Link 
          to={`/learn/${nextTopic.id}`} 
          className="group block p-10 md:p-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all"
        >
          <span className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 block">Continue Your Learning</span>
          <h4 className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-4">
            {nextTopic.title}
          </h4>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mb-6">
            {nextTopic.description}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors group-hover:gap-3">
            Next Topic <ArrowRight size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LearnDetail;
