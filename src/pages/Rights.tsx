import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Lock, Gavel } from 'lucide-react';
import rights from '../data/rights.json';

const Rights: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-2xl font-bold uppercase tracking-widest text-sm">
          <Gavel size={20} /> Legal Protection
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
          Know Your <span className="text-primary">Rights</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          In Kenya, you have specific legal and human rights regarding your sexual and reproductive health. Understanding these rights empowers you to make safe and informed choices.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {rights.map((right) => (
          <div key={right.id} className="card group hover:border-primary/50 flex flex-col p-8 rounded-[2.5rem]">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
               <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-card-foreground leading-snug">{right.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-lg flex-1">
              {right.content}
            </p>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden mt-12">
        <div className="absolute top-0 right-0 p-12 text-primary/10 hidden md:block">
          <ShieldAlert size={200} className="rotate-12" />
        </div>
        <div className="relative z-10 space-y-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">Your Right to <br/><span className="text-primary italic">Privacy and Confidentiality 🤫</span></h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
              When you visit a doctor, nurse, or clinic for reproductive health services, your personal information belongs to you alone. Healthcare providers cannot share your medical records, the questions you asked, or the services you received with anyone else—including your parents, teachers, or partners—without your direct permission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2"><Gavel size={24} /> What the Law Says</h3>
                <p className="text-slate-300 leading-relaxed">
                  Your right to privacy is guaranteed by <strong>Article 31 of the Kenyan Constitution</strong>. Furthermore, the <strong>Health Act (2017)</strong> strictly protects patient data and confidentiality. The Ministry of Health’s <em>National Guidelines on the Provision of Youth-Friendly Services</em> also specifically state that adolescents and young people must be able to access health services confidentially without fear of judgment.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2"><ShieldCheck size={24} /> What This Means for You</h3>
                <p className="text-slate-300 leading-relaxed">
                  You can ask questions about contraception, STIs, menstruation, or mental health without worrying that the clinic staff will gossip. You have the absolute right to request a private room for consultations and to speak to a healthcare provider alone, even if you came to the clinic with an older relative or friend.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">📖 Example Scenario</h3>
                <p className="text-slate-300 leading-relaxed">
                  Amani (17) visits a local public clinic to get tested for an STI. She is nervous because her aunt works at the same hospital. The doctor assures Amani that her visit is completely confidential. Later, when Amani's aunt asks the doctor why Amani was there, the doctor politely but firmly refuses to share the information, protecting Amani's privacy.
                </p>
              </div>

              <div className="bg-orange-500/10 p-6 rounded-3xl border border-orange-500/20">
                <h3 className="text-xl font-bold text-orange-400 mb-3">🛑 Myth vs Fact</h3>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <span className="font-bold text-orange-300">Myth:</span> If I am under 18, healthcare providers are legally required to tell my parents if I ask for condoms or birth control.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <span className="font-bold text-green-400">Fact:</span> No, they are not. Kenyan Youth-Friendly Service guidelines emphasize that young people have the right to confidential SRH counseling and services. Your health and safety come first.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 md:p-8 rounded-3xl border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">What to Do If Your Right Is Violated</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-slate-300">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">1</div>
                <p><strong>Speak up right away:</strong> Calmly ask them to close the door and remind them that you expect privacy.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">2</div>
                <p><strong>Report the issue:</strong> Ask for the "facility in-charge" or clinic manager to file a complaint.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">3</div>
                <p><strong>Seek an alternative:</strong> You have the right to leave and visit a certified Youth-Friendly Service (YFS) center.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">4</div>
                <p><strong>Get support:</strong> Call toll-free Kenyan youth helplines (like 1190) for guidance on safe clinics.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20">
             <h3 className="text-xl font-bold text-blue-400 mb-2">🤝 Inclusion Note</h3>
             <p className="text-slate-300 leading-relaxed">
                For young people with disabilities, privacy is sometimes overlooked because caregivers or guides are often present. You have the right to ask your caregiver to step out of the room during your consultation if you wish to speak privately. If you use a sign language interpreter, remember that they are bound by strict professional rules—they cannot share what you discussed with your family or community.
             </p>
          </div>

          <div className="text-center pt-4">
            <p className="text-2xl font-bold text-primary italic">
              👉 "You deserve to be treated with respect and dignity—always."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rights;
