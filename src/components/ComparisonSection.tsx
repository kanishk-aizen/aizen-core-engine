import { motion } from "framer-motion";
import { X, Check, Minus } from "lucide-react";
import aizenLogo from "@/assets/aizen-logo.png";

const features = [
  {
    name: "Speed of Delivery",
    freelancer: "Inconsistent / Slow",
    agency: "Months of 'discovery'",
    aizen: "Days to first build",
    status: ["bad", "bad", "good"],
  },
  {
    name: "Technical Depth",
    freelancer: "Surface-level / ChatGPT wrappers",
    agency: "Junior devs assigned to you",
    aizen: "Expert AI Engineers",
    status: ["bad", "bad", "good"],
  },
  {
    name: "Partnership Model",
    freelancer: "Takes brief, disappears",
    agency: "You're just a support ticket",
    aizen: "Your technical cofounder",
    status: ["bad", "bad", "good"],
  },
  {
    name: "Incentive Alignment",
    freelancer: "Get paid, move on",
    agency: "Billable hours over ROI",
    aizen: "Success-based / Skin in the game",
    status: ["bad", "bad", "good"],
  },
  {
    name: "Risk Mitigation",
    freelancer: "Zero warranty",
    agency: "Fixed fee, no guarantees",
    aizen: "Free POC before commitment",
    status: ["bad", "bad", "good"],
  },
];

const StatusIcon = ({
  status,
  isAizen,
}: {
  status: string;
  isAizen?: boolean;
}) => {
  if (status === "good") {
    return (
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
          isAizen
            ? "bg-primary/20 border border-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
            : "bg-emerald-500/10 border border-emerald-500/20"
        }`}
      >
        <Check
          size={12}
          className={isAizen ? "text-primary" : "text-emerald-500/70"}
        />
      </div>
    );
  }
  if (status === "bad") {
    return (
      <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20 shrink-0">
        <X size={10} className="text-destructive/50" />
      </div>
    );
  }
  return <Minus size={12} className="text-muted-foreground/20" />;
};

const ComparisonSection = () => (
  <section id="results" className="section-padding relative overflow-hidden">
    {/* Floating background blobs */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

    <div className="container-custom relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4 block font-bold">
          The Difference
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8">
          Why Most AI Projects Fail — <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80">
            And Why Ours Don't.
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The gap between a "demo" and a production-grade AI system is where
          most agencies fail. We bridges that gap with technical excellence.
        </p>
      </motion.div>

      {/* Table Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Glassmorphic Table Hardware */}
        <div className="rounded-[2.5rem] border border-white/10 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5 bg-white/[0.02]">
            <div className="p-6 md:p-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground hidden md:block">
              Feature
            </div>
            <div className="p-6 md:p-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground flex items-center justify-center md:justify-start">
              Freelancer
            </div>
            <div className="p-6 md:p-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground flex items-center justify-center md:justify-start">
              Agency
            </div>
            <div className="p-6 md:p-8 bg-primary/5 flex items-center justify-center md:justify-start border-l border-primary/20 relative group/logo">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -2, 0],
                  filter: [
                    "drop-shadow(0 0 0px rgba(139,92,246,0))",
                    "drop-shadow(0 0 8px rgba(139,92,246,0.3))",
                    "drop-shadow(0 0 0px rgba(139,92,246,0))",
                  ],
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  filter: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10"
              >
                <img
                  src={aizenLogo}
                  alt="AIZEN"
                  className="h-5 md:h-6 opacity-90 group-hover/logo:opacity-100 transition-all duration-300"
                />
              </motion.div>
            </div>
          </div>

          {/* Rows */}
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="p-6 md:p-8 border-r border-white/5 hidden md:flex items-center">
                <span className="text-sm font-bold text-foreground/80 group-hover:text-primary transition-colors">
                  {f.name}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 border-r border-white/5">
                <StatusIcon status={f.status[0]} />
                <span className="text-xs md:text-sm text-center md:text-left text-muted-foreground/60 leading-tight">
                  {f.freelancer}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 border-r border-white/5">
                <StatusIcon status={f.status[1]} />
                <span className="text-xs md:text-sm text-center md:text-left text-muted-foreground/60 leading-tight">
                  {f.agency}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 bg-primary/[0.02] border-l border-primary/20">
                <StatusIcon status={f.status[2]} isAizen />
                <span className="text-sm md:text-base text-center md:text-left font-bold text-foreground leading-tight">
                  {f.aizen}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative highlights */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 pointer-events-none -z-10 blur-3xl opacity-30" />
      </motion.div>
    </div>
  </section>
);

export default ComparisonSection;
