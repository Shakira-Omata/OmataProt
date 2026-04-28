import React from 'react';
import { Users, Accessibility, Heart, MessageCircle, Info, Sparkles, Smile, Star, ChevronRight } from 'lucide-react';
import diverseData from '../data/diverse.json';
import {
  SectionCard,
  BaseCard,
  GridContainer,
  ContentSpacing,
  InfoBox
} from '../components/DesignSystem';

const DiverseCorner: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-10 md:p-16 border-2 border-purple-200">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold text-sm uppercase tracking-widest">
              <Accessibility size={18} /> Inclusive Space
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
              The Diverse Corner
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
              A dedicated space celebrating the diversity of all young people. We recognize that everyone's SRHR journey is unique, and everyone deserves accurate, affirming information that honors who they are.
            </p>
          </div>

          {/* Values Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { icon: Heart, label: "Dignity", color: "pink" },
              { icon: Smile, label: "Inclusion", color: "yellow" },
              { icon: Accessibility, label: "Access", color: "blue" },
              { icon: Star, label: "Power", color: "purple" }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-purple-300 flex flex-col items-center text-center gap-3">
                <item.icon size={32} className={`text-${item.color}-500`} />
                <span className="font-bold text-slate-900 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diverse Topics Grid */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Topics for Everyone</h2>
        <GridContainer cols={diverseData.length > 2 ? 3 : 2} gap="lg">
          {diverseData.map((item) => (
            <SectionCard
              key={item.id}
              title={item.title}
              icon={<Sparkles size={24} />}
              colorScheme="purple"
            >
              <ContentSpacing>
                <p className="text-slate-700 leading-relaxed mb-4 flex-1">
                  {item.content}
                </p>
                <button className="flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all group">
                  Learn More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </ContentSpacing>
            </SectionCard>
          ))}
        </GridContainer>
      </section>

      {/* LGBTQ+ Inclusion Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 md:p-16 border-2 border-indigo-200">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-pink-200/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start gap-12">
          <div className="flex-shrink-0 w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-200 to-pink-200 flex items-center justify-center shadow-lg">
            <Heart size={56} fill="currentColor" className="text-pink-500" />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-indigo-200 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Affirming & Celebratory
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              Sexual Orientations & Gender Identities Matter
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6 max-w-3xl">
              We are committed to providing SRHR information that recognizes and celebrates all sexual orientations and gender identities. Everyone deserves safe, affirming, respectful healthcare that honors their authentic self. LGBTQ+ young people's health, rights, and dignity are at the center of everything we do.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Gender Identity",
                "Sexual Orientation",
                "Affirming Care",
                "Rights & Safety",
                "Community Support"
              ].map((tag) => (
                <div
                  key={tag}
                  className="px-4 py-2 bg-white rounded-full text-sm font-bold text-slate-700 shadow-sm border border-slate-200"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disability Inclusion */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-10 md:p-16 border-2 border-blue-300">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
            <Accessibility size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
              Disabilities Don't Define Your Rights
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Your sexual and reproductive health matters. We provide accessible information and resources for young people with disabilities, ensuring you have the tools to understand your body, your rights, and your choices.
            </p>
          </div>
        </div>
      </section>

      {/* Marginalized Communities */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-10 md:p-16 border-2 border-amber-200">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-lg">
            <Users size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
              Amplifying Marginalized Voices
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Young people from marginalized communities—including those living in poverty, rural areas, or facing discrimination—deserve equal access to SRHR information. We're committed to creating pathways for everyone to access the resources they need.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <InfoBox
        variant="info"
        icon={<MessageCircle size={20} />}
        title="We're Here to Listen"
      >
        If you need specific resources, have accessibility requirements, or simply want to share your story, reach out. Your voice and experience matter. We're constantly working to make our content better for you.
      </InfoBox>
    </div>
  );
};

export default DiverseCorner;
