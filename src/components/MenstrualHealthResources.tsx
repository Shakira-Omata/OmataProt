import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  ExternalLink,
  XCircle,
  CheckCircle2,
  Leaf,
  Heart,
  AlertCircle,
  ShoppingBag,
  Hospital,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import type { TopicResources } from '../data/topics';
import {
  SectionCard,
  CardTitle,
  CardContent,
  GridContainer,
  StatCard,
  CollapsibleItem,
  InfoBox,
  SectionSpacing,
  ContentSpacing,
  DecorativeLine
} from './DesignSystem';

interface MenstrualHealthResourcesProps {
  resources: TopicResources;
}

const MenstrualHealthResources: React.FC<MenstrualHealthResourcesProps> = ({ resources }) => {
  const [openProblems, setOpenProblems] = useState<Set<string>>(new Set());

  const toggleProblem = (problemName: string) => {
    const newOpen = new Set(openProblems);
    if (newOpen.has(problemName)) {
      newOpen.delete(problemName);
    } else {
      newOpen.add(problemName);
    }
    setOpenProblems(newOpen);
  };

  return (
    <SectionSpacing>
      {/* Basics Panel */}
      {resources.basics && (
        <SectionCard
          title="Menstrual Cycle Basics"
          icon={<Heart size={24} />}
          colorScheme="blue"
        >
          <ContentSpacing>
            {resources.basics.normalCycle && (
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600" />
                  Normal Cycle Statistics
                </h4>
                <GridContainer cols={3} gap="md">
                  <StatCard
                    value={resources.basics.normalCycle.length}
                    label="Cycle Length"
                    colorScheme="blue"
                  />
                  <StatCard
                    value={resources.basics.normalCycle.bleeding}
                    label="Bleeding Days"
                    colorScheme="purple"
                  />
                  <StatCard
                    value={resources.basics.normalCycle.fertileWindow}
                    label="Fertile Window"
                    colorScheme="green"
                  />
                </GridContainer>
              </div>
            )}

            {resources.basics.seekHelp && (
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-600" />
                  When to Seek Help
                </h4>
                <InfoBox
                  variant="danger"
                  icon={<AlertCircle size={20} />}
                  title="Important Signs to Watch"
                >
                  <ul className="space-y-3">
                    {resources.basics.seekHelp.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </InfoBox>
              </div>
            )}
          </ContentSpacing>
        </SectionCard>
      )}

      {/* Common Problems */}
      {resources.commonProblems && resources.commonProblems.length > 0 && (
        <SectionCard
          title="Common Problems & Solutions"
          icon={<Lightbulb size={24} />}
          colorScheme="amber"
        >
          <ContentSpacing>
            <div className="space-y-4">
              {resources.commonProblems.map((problem, index) => (
                <CollapsibleItem
                  key={index}
                  title={problem.name}
                  isOpen={openProblems.has(problem.name)}
                  onToggle={() => toggleProblem(problem.name)}
                >
                  <GridContainer cols={2} gap="md">
                    <div>
                      <h5 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} />
                        Symptoms
                      </h5>
                      <ul className="space-y-2">
                        {problem.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-green-600 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        Solutions
                      </h5>
                      <ul className="space-y-2">
                        {problem.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GridContainer>
                </CollapsibleItem>
              ))}
            </div>
          </ContentSpacing>
        </SectionCard>
      )}

      {/* Products */}
      {resources.products && resources.products.length > 0 && (
        <SectionCard
          title="Menstrual Products Guide"
          icon={<ShoppingBag size={24} />}
          colorScheme="purple"
        >
          <ContentSpacing>
            <div className="space-y-6">
              {resources.products.map((product, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-slate-900">
                          {product.name}
                        </h4>
                        {product.sustainable && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            <Leaf size={14} />
                            Eco-Friendly
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">
                        {product.cost}
                      </p>
                      {product.brands && (
                        <p className="text-xs text-slate-500">
                          Popular brands: {product.brands.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <GridContainer cols={2} gap="md">
                    <div>
                      <h5 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        Advantages
                      </h5>
                      <ul className="space-y-2">
                        {product.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                        <XCircle size={18} />
                        Disadvantages
                      </h5>
                      <ul className="space-y-2">
                        {product.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GridContainer>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Where to find:</span> {product.availableAt.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ContentSpacing>
        </SectionCard>
      )}

      {/* Services */}
      {resources.services && resources.services.length > 0 && (
        <SectionCard
          title="Healthcare Services"
          icon={<Hospital size={24} />}
          colorScheme="green"
        >
          <ContentSpacing>
            <div className="space-y-4">
              {resources.services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {service.name}
                    </h4>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {service.county} County
                    </p>
                    <p className="text-sm text-slate-600 flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0 text-blue-600" />
                      {service.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                    <a
                      href={`tel:${service.phone}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
                    >
                      <Phone size={16} />
                      Call
                    </a>
                    {service.website && (
                      <a
                        href={service.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium text-sm"
                      >
                        <ExternalLink size={16} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ContentSpacing>
        </SectionCard>
      )}

      {/* Myths vs Facts */}
      {resources.mythsVsFacts && (
        <SectionCard
          title="Myths vs Facts"
          icon={<Sparkles size={24} />}
          colorScheme="cyan"
        >
          <ContentSpacing>
            <GridContainer cols={2} gap="lg">
              <div>
                <h4 className="text-lg font-bold text-red-600 mb-6 flex items-center gap-2">
                  <XCircle size={20} />
                  Common Myths
                </h4>
                <div className="space-y-3">
                  {resources.mythsVsFacts.myths.map((myth, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <XCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{myth}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-green-600 mb-6 flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  The Facts
                </h4>
                <div className="space-y-3">
                  {resources.mythsVsFacts.facts.map((fact, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                    >
                      <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GridContainer>
          </ContentSpacing>
        </SectionCard>
      )}
    </SectionSpacing>
  );
};

export default MenstrualHealthResources;