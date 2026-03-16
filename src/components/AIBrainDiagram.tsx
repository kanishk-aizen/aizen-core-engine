import { motion } from "framer-motion";

const agents = [
  {
    name: "Lead Response Agent",
    task: "Qualifying inbound lead from website",
    status: "LIVE",
    color: "text-success",
  },
  {
    name: "Finance Agent",
    task: "Generating monthly P&L report",
    status: "PROCESSING",
    color: "text-primary",
  },
  {
    name: "Proposal Agent",
    task: "Drafting SOW for new client",
    status: "LIVE",
    color: "text-success",
  },
  {
    name: "Support Agent",
    task: "Resolving customer ticket #4821",
    status: "LIVE",
    color: "text-success",
  },
  {
    name: "Quoting Agent",
    task: "Calculating project estimate",
    status: "PROCESSING",
    color: "text-primary",
  },
  {
    name: "Content Agent",
    task: "Publishing social post to 3 channels",
    status: "LIVE",
    color: "text-success",
  },
];

const AIBrainDiagram = () => (
  <section
    className="section-padding dark-section"
    style={
      {
        "--background": "240 10% 3.9%",
        "--foreground": "0 0% 98%",
        "--card": "240 6% 6%",
        "--card-foreground": "0 0% 98%",
        "--border": "240 6% 12%",
        "--muted-foreground": "240 4% 65%",
        "--secondary": "240 6% 10%",
        backgroundColor: "hsl(240 10% 3.9%)",
        color: "hsl(0 0% 98%)",
      } as React.CSSProperties
    }
  >
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          The Vision
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
          Your Business's AI Brain
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every agent works in sync. Every task automated. Every decision
          data-driven. One intelligent system running your entire operation.
        </p>
      </motion.div>

      {/* Brain diagram */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto w-40 h-40 md:w-48 md:h-48 mb-12"
        >
          <div className="absolute inset-0 rounded-full gradient-bg opacity-20 blur-2xl animate-pulse-slow" />
          <div className="absolute inset-3 rounded-full gradient-bg opacity-10 blur-xl animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full border border-primary/30 flex items-center justify-center bg-card/80">
            <div className="text-center">
              <p className="text-sm font-display font-bold gradient-text">
                AI Operating System
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                (YOUR AI BRAIN)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Agent nodes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                delay: i * 0.1,
                opacity: { duration: 0.45, ease: "easeOut" },
                y: {
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="bg-card border border-border rounded-xl p-4 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{a.name}</span>
                <span
                  className={`text-[10px] font-mono flex items-center gap-1 ${a.color}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {a.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{a.task}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AIBrainDiagram;
