import { motion } from "framer-motion";

const topTags = ["Sales", "Marketing", "Hiring", "Finance", "Support", "Fulfilment"];
const bottomTags = [
  { icon: "⏳", text: "Slow decisions" },
  { icon: "🔥", text: "Burnout" },
  { icon: "💸", text: "Missed revenue" },
  { icon: "📉", text: "Can't scale" },
];

const BottleneckDiagram = () => (
  <section className="pb-24 md:pb-32 lg:pb-40">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card border border-border rounded-2xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
            This is what's really happening
          </h3>
          <p className="text-muted-foreground">
            Every department in your business funnels through one person —{" "}
            <span className="text-destructive font-semibold">you</span>.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Top tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {topTags.map((t) => (
              <span key={t} className="px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Arrow down */}
          <div className="w-px h-12 bg-destructive/50 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-destructive/50" />
          </div>

          {/* YOU box */}
          <motion.div
            animate={{ boxShadow: ["0 0 20px hsl(0 72% 55% / 0.2)", "0 0 40px hsl(0 72% 55% / 0.4)", "0 0 20px hsl(0 72% 55% / 0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-8 py-4 rounded-xl border-2 border-destructive/50 bg-destructive/10"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-destructive animate-pulse-slow" />
              <span className="text-lg font-display font-bold text-destructive">YOU</span>
            </div>
          </motion.div>

          <p className="text-sm text-muted-foreground text-center max-w-md">
            Every decision. Every approval. Every escalation. Nothing moves without you. You're not running the business — the business is running you.
          </p>

          {/* Arrow down */}
          <div className="w-px h-12 bg-destructive/50 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-destructive/50" />
          </div>

          {/* Bottom consequence tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {bottomTags.map((t) => (
              <span key={t.text} className="px-4 py-2 rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                {t.icon} {t.text}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default BottleneckDiagram;
