import { motion } from "framer-motion";

const cases = [
  {
    tag: "Legal — US",
    title: "AI Document Operating System for 400K+ Document Law Firm",
    desc: "Attorneys spent 25 hrs/week manually searching, stamping, and redacting documents across Dropbox. We built a centralized AI system with semantic search, automated Bate stamping, and real-time agent orchestration.",
    result: "80% reduction in document time · 25 → 5 hrs/week",
    image: "/case-studies/legal_us.png",
  },
  {
    tag: "Insurance — France",
    title: "AI Emergency Accommodation Automation",
    desc: "Major French insurer handling emergency housing claims. Manual process took 24-48 hours. We built a real-time AI workflow engine with automated claim extraction, rental matching, and parallel multi-channel outreach.",
    result: "Response time: 48hrs → under 1hr · 73% less manual work",
    image: "/case-studies/insurance_france.png",
  },
  {
    tag: "Healthcare — US",
    title: "HIPAA-Compliant AI Documentation System",
    desc: "Behavioral health clinic where clinicians spent excessive time documenting therapy sessions. We built real-time transcription, AI summarization, structured report generation, and direct EHR integration.",
    result: "65% less admin · 40% more patient care time",
    image: "/case-studies/healthcare_us.png",
  },
  {
    tag: "Creator Economy",
    title: "AI Content Automation for 2.4M Follower Influencer",
    desc: "Manual content production couldn't scale. We built automated trend scraping, AI script generation, voice synthesis, avatar video generation, and a complete publishing dashboard.",
    result: "7,000+ content pieces · 70% less effort · Billions of views",
    image: "/case-studies/creator_economy.png",
  },
  {
    tag: "Real Estate — US",
    title: "AI Lead Capture & Follow-Up Automation",
    desc: "Real estate agents losing deals to slow follow-ups. We built AI chatbot lead capture, automated SMS + email sequences, AI lead qualification, calendar-synced booking, and conversion dashboards.",
    result: "37% more viewings · 41% better lead conversion",
    image: "/case-studies/real_estate.png",
  },
  {
    tag: "Legal — Korean-American Firm",
    title: "AI Bilingual SEO & Content System",
    desc: "Manual bilingual content production bottlenecked SEO growth. We built AI-generated bilingual legal content with dynamic keyword integration, human approval workflow, and automated multi-platform publishing.",
    result: "First-page rankings · 32% more inbound leads",
    image: "/case-studies/legal_bilingual.png",
  },
  {
    tag: "B2B Sales — Multi-Industry",
    title: "AI SDR & Outbound Sales Automation Platform",
    desc: "Manual prospecting producing generic outreach and low reply rates. We built a deep ICP research engine, hyper-personalized multi-channel messaging, automated reply qualification, and meeting booking automation.",
    result: "$224M+ pipeline generated across clients",
    image: "/case-studies/b2b_sales_v2.png",
  },
  {
    tag: "SaaS — Enterprise Voice AI",
    title: "AI Voice Agent SaaS Platform",
    desc: "Spanish founder needed hyper-realistic, low-latency voice AI with CRM and call center integration. We built real-time AI voice synthesis with ultra low-latency architecture and multilingual support.",
    result: "85% automation efficiency · 50% less manual support",
    image: "/case-studies/voice_ai_v2.png",
  },
];

const CaseStudies = () => (
  <section id="case-studies" className="section-padding">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          Case Studies
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
          Systems We've Built
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 2) * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col"
          >
            <div className="h-64 bg-secondary overflow-hidden relative">
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest opacity-50">
                    System Dashboard
                  </span>
                </div>
              )}
              {/* Overlay for better text separation */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-mono text-primary mb-2 block">
                {c.tag}
              </span>
              <h3 className="text-xl font-display font-bold mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {c.desc}
              </p>
              <div className="mt-auto px-4 py-3 rounded-xl bg-success/5 border border-success/20 group-hover:border-success/40 transition-colors">
                <p className="text-xs font-mono text-success font-bold">
                  {c.result}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
