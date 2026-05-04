import React from 'react';
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
import { useBookmarks } from '../context/BookmarkContext';
import PageActions from '../components/PageActions';
import MenstrualHealthResources from '../components/MenstrualHealthResources';
import {
  SectionCard,
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
  const { isEasyRead } = useAccessibility();
  
  const topic = topics.find(t => t.id === id) as any;

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

        <PageActions 
          id={topic.id}
          title={topic.title}
          description={topic.description}
          contentToSpeak={isEasyRead && topic.easyReadContent ? topic.easyReadContent : topic.content}
        />
      </section>

      {/* Hero Summary Card - Only shown on Overview page as requested */}
      {topic.id === 'overview-rights' && (
        <HeroSummaryCard
          keyFacts={[
            "SRHR includes the right to make informed choices about your body",
            "Access to accurate information is a fundamental human right",
            "Kenyan Constitution provides legal protections for your health rights",
            "Youth-friendly centers offer confidential and supportive services"
          ]}
          keyRights={[
            "Bodily Autonomy & Decision Making",
            "Privacy and Medical Confidentiality",
            "Access to Comprehensive Healthcare",
            "Freedom from Discrimination & Coercion",
            "Right to SRHR Education & Information"
          ]}
        />
      )}

      {/* Main Content Section */}
      <section className="space-y-8">
        {topic.id === 'pregnancy-parenthood' && !isEasyRead ? (
          // Redesigned layout for pregnancy topic
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
        ) : topic.id === 'menstrual-health' && !isEasyRead ? (
          // Redesigned layout for menstrual health
          <>
            <BaseCard className="bg-teal-50/50 border-teal-100 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🩸</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                  Menstruation, commonly called a 'period,' is a natural monthly process where your body sheds the lining of the uterus through the vagina. This typically occurs every 21-35 days and lasts 3-7 days. Understanding your cycle empowers you to manage it confidently and recognize when something needs medical attention.
                </p>
              </div>
            </BaseCard>

            <ContentSectionCard
              title="The Menstrual Cycle Phases"
              icon="🔄"
              didYouKnow="The average person has about 450 periods in their lifetime!"
            >
              <div className="space-y-4">
                {[
                  { title: "Menstrual Phase (Days 1-5)", desc: "Bleeding occurs as the uterine lining is shed. Flow can be light to heavy.", icon: "1" },
                  { title: "Follicular Phase (Days 1-13)", desc: "Overlaps with menstruation; estrogen rises, preparing eggs for release.", icon: "2" },
                  { title: "Ovulation (Around Day 14)", desc: "An egg is released from the ovary. This is the most fertile time.", icon: "3" },
                  { title: "Luteal Phase (Days 15-28)", desc: "The body prepares for potential pregnancy; progesterone rises.", icon: "4" }
                ].map((phase, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-600 shadow-sm">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">{phase.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900">{phase.title}</h4>
                      <p className="text-slate-600 text-sm">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Managing Your Period Comfortably"
              icon="🩹"
            >
              <p className="text-slate-700 mb-6">Choose products based on your lifestyle and preferences:</p>
              <GridContainer cols={2} gap="md">
                {[
                  { title: "Sanitary Pads", desc: "Absorbent and easy to use; change every 4-6 hours to prevent leaks.", icon: "🧼" },
                  { title: "Tampons", desc: "Internal protection; change every 4-8 hours to avoid Toxic Shock Syndrome (TSS).", icon: "🧴" },
                  { title: "Menstrual Cups", desc: "Reusable silicone cups; can be worn 8-12 hours, eco-friendly and cost-effective.", icon: "♻️" },
                  { title: "Period Underwear", desc: "Absorbent underwear; great for heavy flow or overnight protection.", icon: "🩲" },
                  { title: "Reusable Cloth Pads", desc: "Sustainable option; wash and reuse, but requires careful cleaning.", icon: "🧺" }
                ].map((product, i) => (
                  <BaseCard key={i} className="p-5 flex flex-col gap-3 hover:border-blue-300 transition-colors">
                    <span className="text-2xl">{product.icon}</span>
                    <h4 className="font-bold text-slate-900">{product.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{product.desc}</p>
                  </BaseCard>
                ))}
              </GridContainer>
            </ContentSectionCard>

            <ContentSectionCard
              title="Health and Safety Considerations"
              icon="🛡️"
            >
              <div className="space-y-6">
                <IconList
                  items={[
                    "Toxic Shock Syndrome (TSS): A rare but serious infection from tampons. Change them regularly.",
                    "Track Your Cycle: Apps or calendars help predict periods and identify irregularities.",
                    "Pain Management: Mild cramps are normal; try warm compresses or exercise."
                  ]}
                  icon="✅"
                />

                <InfoBox
                  variant="danger"
                  icon="⚠️"
                  title="When to See a Doctor"
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium">
                    <li>• Periods lasting longer than 7 days</li>
                    <li>• Soaking through protection hourly</li>
                    <li>• Severe pain affecting daily activities</li>
                    <li>• Missing periods unexpectedly</li>
                    <li>• Heavy bleeding with clots</li>
                  </ul>
                </InfoBox>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Breaking Myths in Kenya"
              icon="📢"
            >
              <div className="grid gap-4">
                {[
                  { myth: "You can't bathe during your period.", fact: "Warm water is hygienic and can relieve cramps." },
                  { myth: "Sour foods stop bleeding.", fact: "Diet doesn't control menstrual flow physiologically." },
                  { myth: "Periods are 'dirty' or shameful.", fact: "Menstruation is a normal biological process." }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-purple-50 border-2 border-purple-100">
                    <p className="text-sm font-bold text-purple-900 mb-1">Myth: {item.myth}</p>
                    <p className="text-sm text-purple-700"><strong>Fact:</strong> {item.fact}</p>
                  </div>
                ))}
              </div>
            </ContentSectionCard>
          </>
        ) : topic.id === 'overview-rights' && !isEasyRead ? (
          // Redesigned layout for SRHR Overview
          <>
            <BaseCard className="bg-blue-50/50 border-blue-100 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🌍</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                  Sexual and Reproductive Health and Rights (SRHR) encompass the fundamental human rights to make informed choices about your body, sexuality, and reproduction without discrimination or coercion. As a young person in Kenya, understanding SRHR means recognizing that you have the right to access accurate information, quality healthcare services, and the freedom to decide about your sexual and reproductive life.
                </p>
              </div>
            </BaseCard>

            <ContentSectionCard
              title="Key SRHR Rights Include"
              icon="⚖️"
              didYouKnow="Bodily autonomy is the foundation of all other SRHR rights!"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Bodily Autonomy", desc: "The right to make decisions about your own body without pressure.", icon: "🧘" },
                  { title: "Privacy", desc: "Your health information is kept private and confidential.", icon: "🔒" },
                  { title: "Healthcare Access", desc: "Right to services like contraception and STI testing.", icon: "🏥" },
                  { title: "No Discrimination", desc: "Rights apply to everyone regardless of gender or age.", icon: "🤝" },
                  { title: "Education", desc: "The right to learn about your body in a safe environment.", icon: "📚" }
                ].map((right, i) => (
                  <BaseCard key={i} className="p-4 flex items-start gap-3 border-l-4 border-green-500">
                    <span className="text-xl shrink-0">{right.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{right.title}</h4>
                      <p className="text-xs text-slate-600">{right.desc}</p>
                    </div>
                  </BaseCard>
                ))}
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Why Gender Equality Matters"
              icon="🕊️"
            >
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <p className="text-slate-700 leading-relaxed">
                  Gender equality is at the heart of SRHR. When gender norms are challenged, it creates safer spaces for everyone to access healthcare and make choices free from harmful stereotypes. In Kenya, this means working towards a society where both young men and women can openly discuss their health needs and seek support without stigma.
                </p>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Your Rights in Practice"
              icon="🛡️"
            >
              <div className="space-y-6">
                <p className="text-slate-700">In Kenya, you have legal protections under the Constitution and various health policies that support your SRHR.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <BaseCard className="p-5 bg-slate-50 border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">⚖️</span>
                      Legal Protection
                    </h4>
                    <p className="text-sm text-slate-600">The Kenyan Constitution guarantees every person the right to the highest attainable standard of health.</p>
                  </BaseCard>
                  <BaseCard className="p-5 bg-slate-50 border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">🏥</span>
                      Youth Services
                    </h4>
                    <p className="text-sm text-slate-600">Youth-friendly health centers provide confidential services tailored specifically to your needs.</p>
                  </BaseCard>
                </div>
                <InfoBox variant="info" icon="💡" title="Take Action">
                  Seeking information and care is a sign of responsibility, not shame. You have the power to protect your future!
                </InfoBox>
              </div>
            </ContentSectionCard>
          </>
        ) : topic.id === 'puberty-adolescent-health' && !isEasyRead ? (
          // Redesigned layout for Puberty
          <>
            <BaseCard className="bg-orange-50/50 border-orange-100 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">📈</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                  Puberty is a natural and exciting phase of life when your body transforms from childhood to adulthood. This process typically begins between ages 9-14 for girls and 10-15 for boys in Kenya, though it can start earlier or later. Understanding these changes helps you feel confident and prepared.
                </p>
              </div>
            </BaseCard>

            <ContentSectionCard
              title="Physical & Emotional Changes"
              icon="🌱"
              didYouKnow="Growth spurts during puberty can make you grow up to 4 inches in a single year!"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">💪</span> Physical Changes
                  </h4>
                  <IconList
                    items={[
                      "Growth Spurts: Growing taller quickly",
                      "Body Hair: Under arms and pubic area",
                      "Voice Changes: Deeper voices (boys)",
                      "Skin Changes: Acne and oily skin",
                      "Breast Development & Menstruation (girls)"
                    ]}
                    icon="✨"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">💭</span> Emotional Changes
                  </h4>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-slate-700">
                    Mood swings, new feelings, and questions about relationships are normal. Hormones affect emotions, but talking to trusted adults helps navigate these changes.
                  </div>
                </div>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Hygiene and Self-Care"
              icon="🧼"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Daily Shower", desc: "Use mild soap to stay fresh.", icon: "🚿" },
                  { title: "Deodorant", desc: "Manage body odor effectively.", icon: "🧴" },
                  { title: "Hair Care", desc: "Wash hair and change clothes daily.", icon: "💇" },
                  { title: "Oral Hygiene", desc: "Brush twice daily for health.", icon: "🪥" },
                  { title: "Specific Care", desc: "Menstrual hygiene for girls.", icon: "🩸" }
                ].map((item, i) => (
                  <BaseCard key={i} className="p-4 flex flex-col items-center text-center gap-2 border-b-4 border-orange-400">
                    <span className="text-2xl">{item.icon}</span>
                    <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </BaseCard>
                ))}
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Nutrition for Healthy Development"
              icon="🍎"
            >
              <div className="space-y-6">
                <p className="text-slate-700 font-medium">Your body needs extra nutrients during puberty for growth and energy:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Iron-rich foods", desc: "Beans, spinach, meat for energy.", icon: "🥩" },
                    { title: "Calcium", desc: "Milk, yogurt, greens for bones.", icon: "🥛" },
                    { title: "Protein", desc: "Eggs, fish, legumes for growth.", icon: "🥚" },
                    { title: "Vitamins", desc: "Fruits and vegetables for immunity.", icon: "🥦" }
                  ].map((food, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <span className="text-xl">{food.icon}</span>
                      <div>
                        <h5 className="font-bold text-green-900 text-sm">{food.title}</h5>
                        <p className="text-xs text-green-700">{food.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <InfoBox variant="warning" icon="🏥" title="When to See a Doctor">
                  If changes cause significant distress, affect daily life, or you have questions, talk to a healthcare provider or counselor.
                </InfoBox>
              </div>
            </ContentSectionCard>
          </>
        ) : topic.id === 'sexual-health-protection' && !isEasyRead ? (
          // Redesigned layout for Sexual Health
          <>
            <BaseCard className="bg-sky-50/50 border-sky-100 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🛡️</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                  Sexual health is about making informed choices to protect your body, prevent unwanted pregnancies, and stay free from infections. This guide covers STI and HIV prevention, family planning methods available in Kenya, and information on safe abortion services. Remember, your health decisions are yours to make—seek confidential advice from healthcare providers.
                </p>
              </div>
            </BaseCard>

            <ContentSectionCard
              title="STI and HIV Prevention"
              icon="🛡️"
              didYouKnow="PrEP is a daily pill that can reduce the risk of HIV infection from sex by about 99%!"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <BaseCard className="p-5 border-l-4 border-blue-500">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🩺</span> Common STIs in Kenya
                    </h4>
                    <IconList
                      items={["Chlamydia & Gonorrhea", "Syphilis & Herpes", "HPV & HIV", "Hepatitis B"]}
                      icon="🔬"
                    />
                  </BaseCard>
                  <BaseCard className="p-5 border-l-4 border-green-500">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">✅</span> Prevention Methods
                    </h4>
                    <IconList
                      items={["Consistent condom use", "Regular testing (VCT)", "PrEP & PEP medication", "HPV Vaccination"]}
                      icon="🛡️"
                    />
                  </BaseCard>
                </div>
                <InfoBox variant="danger" icon="⚠️" title="Symptoms to Watch For">
                  Unusual discharge, sores, itching, pain during sex, or bleeding between periods. Get tested if you notice these!
                </InfoBox>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Family Planning in Kenya"
              icon="👨‍👩‍👧‍👦"
            >
              <p className="text-slate-700 mb-6">Choose the method that works best for your future:</p>
              <GridContainer cols={2} gap="md">
                {[
                  { title: "Condoms", desc: "Prevents both pregnancy and STIs. Easy to get.", icon: "🧤" },
                  { title: "Pills", desc: "Taken daily; 99% effective if used perfectly.", icon: "💊" },
                  { title: "Injectables", desc: "Like Depo; one shot every 3 months.", icon: "💉" },
                  { title: "Implants", desc: "Small rods under skin; lasts 3-5 years.", icon: "📍" },
                  { title: "IUDs", desc: "T-shaped device; lasts 5-10 years.", icon: "⚓" },
                  { title: "Emergency", desc: "'Morning-after' pill for unexpected needs.", icon: "🚨" }
                ].map((item, i) => (
                  <BaseCard key={i} className="p-4 flex gap-4 items-center border-b-2 border-sky-200 hover:shadow-md transition-shadow">
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  </BaseCard>
                ))}
              </GridContainer>
            </ContentSectionCard>

            <ContentSectionCard
              title="Safe Abortion Information"
              icon="⚖️"
            >
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-2">The Legal Framework</h4>
                  <p className="text-sm text-amber-800">In Kenya, abortion is legal if the pregnancy endangers the mother's life or health, or in cases of sexual violence. Unsafe abortions are dangerous—always seek professional care.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <BaseCard className="p-4 bg-white border-slate-200">
                    <h5 className="font-bold text-slate-900 mb-2">Safe Options</h5>
                    <IconList items={["Medical abortion (pills) up to 12 weeks", "Surgical abortion at accredited clinics"]} icon="🏥" />
                  </BaseCard>
                  <BaseCard className="p-4 bg-white border-slate-200">
                    <h5 className="font-bold text-slate-900 mb-2">Where to Go</h5>
                    <IconList items={["Public Hospitals", "Marie Stopes (MSI) Kenya clinics"]} icon="📍" />
                  </BaseCard>
                </div>
                <InfoBox variant="danger" icon="🚫" title="Never Attempt DIY">
                  Unsafe abortions can cause infection, heavy bleeding, and infertility. Call the National Reproductive Health Hotline at 0800 722 000 for confidential advice.
                </InfoBox>
              </div>
            </ContentSectionCard>
          </>
        ) : topic.id === 'mental-health-wellbeing' && !isEasyRead ? (
          // Redesigned layout for Mental Health
          <>
            <BaseCard className="bg-purple-50/50 border-purple-100 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🧠</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                  Mental health is the foundation of overall well-being, and it's deeply connected to your sexual and reproductive health. Understanding how emotions and stress impact your SRHR experiences is key to a healthy life. Remember, seeking help is a sign of strength, not weakness.
                </p>
              </div>
            </BaseCard>

            <ContentSectionCard
              title="Emotional Health in SRHR"
              icon="💖"
              didYouKnow="Your emotional state can significantly influence your physical health and healthcare decisions!"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Body Image", desc: "How you feel about your body affects confidence.", icon: "✨" },
                  { title: "Relationships", desc: "Emotional connections influence intimacy.", icon: "🤝" },
                  { title: "Identity", desc: "Exploring identity can bring joy and questions.", icon: "🏳️‍🌈" },
                  { title: "Overcoming Stigma", desc: "Building resilience against societal judgment.", icon: "🛡️" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Self-Care & Stress Management"
              icon="🧘"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Sleep", desc: "Aim for 7-9 hours daily.", icon: "😴" },
                    { title: "Journaling", desc: "Write down your feelings.", icon: "📓" },
                    { title: "Boundaries", desc: "Learn to say no when needed.", icon: "🛑" },
                    { title: "Breathing", desc: "Try the 4-7-8 technique.", icon: "🌬️" },
                    { title: "Connection", desc: "Talk to supportive friends.", icon: "🗣️" },
                    { title: "Creativity", desc: "Express yourself through art.", icon: "🎨" }
                  ].map((practice, i) => (
                    <BaseCard key={i} className="p-4 flex flex-col items-center text-center gap-2 border-b-4 border-purple-400">
                      <span className="text-2xl">{practice.icon}</span>
                      <h5 className="font-bold text-slate-900 text-sm">{practice.title}</h5>
                      <p className="text-xs text-slate-600">{practice.desc}</p>
                    </BaseCard>
                  ))}
                </div>
                <InfoBox variant="success" icon="🌱" title="Quick Stress Relief">
                  Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you can taste.
                </InfoBox>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Mental Health Conditions"
              icon="🩹"
            >
              <div className="space-y-6">
                <p className="text-slate-700">Certain conditions are more common in SRHR contexts and are all treatable:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <IconList
                    items={["Anxiety and Panic Disorders", "Depression and Persistent Sadness", "PMDD (Severe PMS symptoms)"]}
                    icon="🎗️"
                  />
                  <IconList
                    items={["Postpartum Depression", "Post-Traumatic Stress (PTSD)", "Eating & Body Image Concerns"]}
                    icon="🎗️"
                  />
                </div>
                <InfoBox variant="danger" icon="⚠️" title="When to Seek Professional Help">
                  If you experience persistent sadness, suicidal thoughts, self-harm, or difficulty concentrating, reach out to a counselor immediately.
                </InfoBox>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Resources in Kenya"
              icon="📞"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <BaseCard className="p-5 border-l-4 border-red-500 bg-red-50/30">
                  <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🚑</span> Crisis Helplines
                  </h4>
                  <ul className="text-sm space-y-2 text-red-800">
                    <li>• <strong>Befrienders Kenya:</strong> 0800 721 722</li>
                    <li>• <strong>Red Cross:</strong> Immediate Support</li>
                    <li>• <strong>SRHR Hotline:</strong> 0800 722 000</li>
                  </ul>
                </BaseCard>
                <BaseCard className="p-5 border-l-4 border-blue-500 bg-blue-50/30">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🏢</span> Support Centers
                  </h4>
                  <ul className="text-sm space-y-2 text-blue-800">
                    <li>• Chiromo Lane Medical Centre</li>
                    <li>• KCPA Directory of Counselors</li>
                    <li>• School/University Peer Counseling</li>
                  </ul>
                </BaseCard>
              </div>
            </ContentSectionCard>
          </>
        ) : topic.id === 'relationships-support' && !isEasyRead ? (
          // Redesigned layout for Healthy Relationships
          <>
            <BaseCard className="bg-emerald-50/50 border-emerald-100 p-8 md:p-10">
              <div className="flex flex-col items-center text-center gap-4">
                <span className="text-4xl">🤝</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                  Healthy relationships are built on trust, mutual respect, and open communication. They empower you to make informed SRHR choices and bring joy rather than stress. Remember, you deserve relationships that make you feel valued and safe.
                </p>
              </div>
            </BaseCard>

            <ContentSectionCard
              title="Consent: The Foundation"
              icon="⚖️"
              didYouKnow="Consent must be ongoing—you can change your mind at any point, even after saying yes!"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: "Voluntary", desc: "Given without any pressure.", icon: "🕊️" },
                    { title: "Informed", desc: "You know exactly what's happening.", icon: "📖" },
                    { title: "Enthusiastic", desc: "Genuine excitement from everyone.", icon: "✨" }
                  ].map((trait, i) => (
                    <div key={i} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                      <span className="text-2xl block mb-2">{trait.icon}</span>
                      <h5 className="font-bold text-emerald-900 text-sm">{trait.title}</h5>
                      <p className="text-xs text-emerald-700 mt-1">{trait.desc}</p>
                    </div>
                  ))}
                </div>
                <InfoBox variant="info" icon="💡" title="Consent Myths">
                  <ul className="text-sm space-y-1">
                    <li>• Clothing is NEVER an invitation for sex.</li>
                    <li>• Being in a relationship doesn't mean automatic consent.</li>
                    <li>• Silence does NOT mean 'yes'—always confirm!</li>
                  </ul>
                </InfoBox>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Communication & Connection"
              icon="🗣️"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <BaseCard className="p-5 border-l-4 border-blue-500">
                  <h4 className="font-bold text-slate-900 mb-3">Active Listening</h4>
                  <IconList
                    items={["Give full attention (no phones)", "Reflect back what you heard", "Validate their feelings"]}
                    icon="👂"
                  />
                </BaseCard>
                <BaseCard className="p-5 border-l-4 border-purple-500">
                  <h4 className="font-bold text-slate-900 mb-3">Clear Expression</h4>
                  <IconList
                    items={["Use 'I' statements (I feel...)", "Be specific about behaviors", "Choose the right time to talk"]}
                    icon="💬"
                  />
                </BaseCard>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Preventing Violence (GBV)"
              icon="🛡️"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Warning Signs (Red Flags)</h4>
                    <IconList
                      items={["Excessive jealousy or control", "Isolation from friends/family", "Threats or intimidation"]}
                      icon="🚩"
                    />
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-bold text-red-900 mb-2">If You Are in Danger</h4>
                    <p className="text-sm text-red-800">Get to a safe place immediately. Call emergency services (112 or 999) or the specialized hotlines below.</p>
                  </div>
                </div>
                <InfoBox variant="danger" icon="📞" title="Helplines in Kenya">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold">
                    <span>Gender Violence Hotline: 1195</span>
                    <span>GVRC Support: 0722 797 604</span>
                  </div>
                </InfoBox>
              </div>
            </ContentSectionCard>

            <ContentSectionCard
              title="Digital Safety Online"
              icon="📱"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Verify", desc: "Use video calls to confirm identities.", icon: "✅" },
                  { title: "Privacy", desc: "Don't share locations or home info.", icon: "🔒" },
                  { title: "Block", desc: "Don't hesitate to block toxic people.", icon: "🚫" },
                  { title: "Authentication", desc: "Use 2-factor for all social apps.", icon: "🔑" },
                  { title: "Consent", desc: "Never send or ask for nudes without it.", icon: "📸" },
                  { title: "Adults", desc: "Tell a trusted adult about creeps.", icon: "👮" }
                ].map((item, i) => (
                  <BaseCard key={i} className="p-4 flex flex-col items-center text-center gap-2 border-b-4 border-emerald-400">
                    <span className="text-2xl">{item.icon}</span>
                    <h5 className="font-bold text-slate-900 text-sm">{item.title}</h5>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </BaseCard>
                ))}
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
