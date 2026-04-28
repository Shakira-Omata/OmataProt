import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ChevronDown, ChevronRight, Zap, Heart, Brain, Shield } from 'lucide-react';
import topics from '../data/topics/index';
import {
  SectionCard,
  CardContent,
  BaseCard,
  GridContainer
} from '../components/DesignSystem';

const Learn: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get icon based on topic ID
  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'menstrual-health':
        return <Heart size={24} />;
      case 'sexual-health-protection':
        return <Shield size={24} />;
      case 'mental-health-wellbeing':
        return <Brain size={24} />;
      case 'pregnancy-parenthood':
        return <Zap size={24} />;
      default:
        return <BookOpen size={24} />;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900">
          Learn About Your Rights & Health
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-medium">
          Explore comprehensive, accurate, and judgment-free information specifically tailored for young people. All our content is verified and youth-friendly.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search topics..."
          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm hover:border-slate-300 text-base font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Topics Dropdown */}
      <BaseCard className="overflow-hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <BookOpen size={32} />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Explore {topics.length} Topics
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-medium mt-1">
                {isDropdownOpen ? 'Click to collapse' : 'Click to explore all topics'}
              </p>
            </div>
          </div>
          <ChevronDown
            size={28}
            className={`transition-transform duration-300 text-slate-400 flex-shrink-0 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="border-t-2 border-slate-200">
            {filteredTopics.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {filteredTopics.map((topic, index) => (
                  <Link
                    key={topic.id}
                    to={`/learn/${topic.id}`}
                    className="flex items-center gap-4 p-5 md:p-6 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
                      {getTopicIcon(topic.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2 font-medium">
                        {topic.description}
                      </p>
                    </div>
                    <ChevronRight size={24} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Search size={32} />
                </div>
                <p className="text-xl font-bold text-slate-600 mb-4">No topics found</p>
                <p className="text-slate-500 mb-6 font-medium">
                  Try adjusting your search terms or browse all topics below
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}
      </BaseCard>

      {/* Topic Grid Preview (when collapsed) */}
      {!isDropdownOpen && filteredTopics.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Featured Topics</h3>
          <GridContainer cols={filteredTopics.length > 2 ? 3 : 2} gap="lg">
            {filteredTopics.slice(0, 3).map((topic) => (
              <Link
                key={topic.id}
                to={`/learn/${topic.id}`}
                className="group"
              >
                <SectionCard
                  title={topic.title}
                  icon={getTopicIcon(topic.id)}
                  colorScheme={
                    topic.id === 'menstrual-health'
                      ? 'blue'
                      : topic.id === 'sexual-health-protection'
                      ? 'purple'
                      : topic.id === 'mental-health-wellbeing'
                      ? 'green'
                      : 'blue'
                  }
                  className="h-full hover:shadow-lg transition-shadow"
                >
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                    {topic.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                    Learn More <ChevronRight size={18} />
                  </div>
                </SectionCard>
              </Link>
            ))}
          </GridContainer>
        </div>
      )}

      {/* Diversity Corner Callout */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 md:p-12">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <p className="text-lg font-bold text-white/90 mb-3">🌈 Celebrate Diversity</p>
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            Everyone's Experience Matters
          </h3>
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6 font-medium">
            Our content celebrates sexual and reproductive health across all identities, abilities, and backgrounds. Learn how SRHR applies to you.
          </p>
          <Link
            to="/diverse-corner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-slate-50 transition-colors"
          >
            Explore Diverse Perspectives <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* FAQ or Quick Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-8 md:p-12">
        <div className="max-w-3xl">
          <p className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-3">💡 Tips</p>
          <h3 className="text-3xl font-black text-slate-900 mb-6">
            How to Get the Most From These Resources
          </h3>
          <ul className="space-y-4">
            {[
              "Take notes as you read – this helps you remember important information",
              "Share these resources with friends who might have questions",
              "Bookmark your favorite topics for quick reference later",
              "Check the Support Directory if you need professional guidance"
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  {i + 1}
                </div>
                <span className="text-base text-slate-700 font-medium leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Learn;

