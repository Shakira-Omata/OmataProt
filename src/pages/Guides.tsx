import React from 'react';
import { Download, FileText, Accessibility, Info, FileStack, ArrowRight, Play, Check } from 'lucide-react';
import guides from '../data/guides.json';
import {
  SectionCard,
  BaseCard,
  GridContainer,
  ContentSpacing,
  InfoBox
} from '../components/DesignSystem';

const Guides: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-widest">
          <FileStack size={18} /> Educational Toolkits
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
          Guides & Resources
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-medium">
          Download our comprehensive SRHR guides for offline reading or sharing. All resources are designed to be youth-friendly, accessible, and practical.
        </p>
      </section>

      {/* Guides Grid */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Available Downloads</h2>
        <GridContainer cols={guides.length > 3 ? 3 : 2} gap="lg">
          {guides.map((guide) => (
            <SectionCard
              key={guide.id}
              title={guide.title}
              icon={<FileText size={24} />}
              colorScheme="blue"
              className="flex flex-col"
            >
              <ContentSpacing>
                <p className="text-slate-700 leading-relaxed flex-1">
                  {guide.description}
                </p>

                <div className="space-y-3 pt-2">
                  {guide.accessible && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase tracking-widest">
                      <Check size={14} />
                      Accessible Format
                    </div>
                  )}

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    Download {guide.format}
                    <Download size={18} />
                  </button>
                </div>
              </ContentSpacing>
            </SectionCard>
          ))}
        </GridContainer>
      </section>

      {/* Video Stories Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Visual Stories & Videos</h2>
          <p className="text-slate-600 font-medium">Learn through captioned stories with full accessibility support</p>
        </div>

        <GridContainer cols={2} gap="lg">
          {[
            {
              title: "Understanding Consent",
              description: "Explore what consent really means and why it matters",
              duration: "2:30",
              color: "from-blue-500 to-blue-600"
            },
            {
              title: "My Body, My Rights",
              description: "A powerful story about bodily autonomy and reproductive rights",
              duration: "3:45",
              color: "from-purple-500 to-purple-600"
            }
          ].map((video, i) => (
            <BaseCard
              key={i}
              className="relative overflow-hidden group cursor-pointer h-80"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${video.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <Play fill="currentColor" size={32} />
                </div>

                <div className="text-center px-4">
                  <h4 className="text-2xl font-bold mb-2">{video.title}</h4>
                  <p className="text-sm text-white/90 mb-3">{video.description}</p>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest">
                    {video.duration} • CC Enabled
                  </span>
                </div>
              </div>
            </BaseCard>
          ))}
        </GridContainer>
      </section>

      {/* Print Materials Request */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10 md:p-16">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center">
            <Info size={48} className="text-white" />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Need Printed Copies?</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              If you're a community worker, educator, or youth leader and need physical copies of our resources for distribution in schools or community spaces, we can help.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-100 transition-colors">
              Request Materials <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Accessibility Note */}
      <InfoBox
        variant="info"
        icon={<Accessibility size={20} />}
        title="Accessibility Matters to Us"
      >
        Can't find what you need or require content in a specific format (braille, audio-only, large text)? Contact our support team and we'll do our best to provide it. Your access matters.
      </InfoBox>
    </div>
  );
};

export default Guides;
