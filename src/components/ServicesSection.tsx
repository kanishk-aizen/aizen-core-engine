import { motion } from "framer-motion";
import { Hammer, Zap, Building, Smartphone, Users, Scale } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Custom AI Apps & Product Development",
    text: "From idea to MVP to scale. We take SaaS startups from concept to product in days using proprietary AI development systems.",
  },
  {
    icon: Zap,
    title: "AI Automation & Intelligent Workflows",
    text: "Custom code automation with full infrastructure control. Also build on n8n, Make.com, Zapier. Deployed across legal, agencies, SaaS, coaching, consulting, financial services.",
  },
  {
    icon: Building,
    title: "Custom Operating Systems & AI CRMs",
    text: "CEO dashboards where marketing, sales, hiring, finances, and fulfilment live in one place. We audit, find leaks, and build a bulletproof system.",
  },
  {
    icon: Smartphone,
    title: "AI Content Automation",
    text: "Built a platform for a 2.4M follower influencer. 7,000+ content pieces, 70% less effort. Billions of views across YouTube, Instagram, X, LinkedIn.",
  },
  {
    icon: Users,
    title: "Team Augmentation",
    text: "Add our vetted AI engineers to your team. Full dev team or specialist. We integrate seamlessly and ship fast. No ramp-up.",
  },
  {
    icon: Scale,
    title: "AI Project Fulfilment",
    text: "Already have an AI project spec? We build it. Document intelligence, voice agents, chatbots, custom LLM tools — we've shipped 121+ of them.",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          What We Build
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
          AI Systems That Actually Work in Production
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you need an internal operating system built from scratch or
          have an existing AI project that needs the right team — we're your
          best option.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -10, scale: 1.02, rotate: [-1, 1, 0] }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className="bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 rounded-2xl p-6 relative overflow-hidden group shadow-md hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <s.icon size={20} className="text-primary-foreground" />
            </div>
            <h3 className="text-lg font-display font-bold mb-3 relative z-10 group-hover:text-primary transition-colors">
              {s.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
              {s.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
