import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Lightbulb, MessageCircle, Send } from 'lucide-react';
import myths from '../data/myths.json';
import {
  SectionCard,
  BaseCard,
  CollapsibleItem,
  InfoBox,
  ContentSpacing
} from '../components/DesignSystem';

const Myths: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-widest">
          <HelpCircle size={18} /> Common Questions
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
          Myths & Facts About SRHR
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-medium">
          We're addressing common misconceptions with evidence-based facts. Let's separate myths from reality so you can make informed decisions about your health and rights.
        </p>
      </section>

      {/* Myths Accordion */}
      <div className="space-y-4">
        {myths.map((item, index) => (
          <BaseCard
            key={item.id}
            className={`transition-all duration-300 ${
              openIndex === index ? 'border-blue-300 shadow-lg' : 'border-slate-200'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 md:p-8 flex items-start justify-between text-left hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 mt-1 group-hover:bg-red-200 transition-colors">
                  <HelpCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug text-left">
                    {item.myth}
                  </h3>
                </div>
              </div>
              <div className={`w-6 h-6 text-blue-600 flex-shrink-0 ml-4 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>

            {openIndex === index && (
              <div className="border-t border-slate-200 p-6 md:p-8 bg-blue-50/50">
                <ContentSpacing>
                  <InfoBox
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                    title="The Fact"
                  >
                    <p className="text-lg text-slate-800 font-medium leading-relaxed">
                      {item.fact}
                    </p>
                  </InfoBox>

                  <div className="flex items-center justify-end gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-blue-600 font-bold hover:bg-blue-100 rounded-lg transition-colors group">
                      <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                      Found helpful?
                    </button>
                  </div>
                </ContentSpacing>
              </div>
            )}
          </BaseCard>
        ))}
      </div>

      {/* Anonymous Questions CTA */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 md:p-16">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              <Lightbulb size={28} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-3">Still Have Questions?</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Have a burning question that isn't answered here? Submit it anonymously and our team will provide a supportive, evidence-based answer.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
              <Send size={18} />
              Ask Anonymously
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-colors border border-white/20">
              Browse More Topics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Myths;
