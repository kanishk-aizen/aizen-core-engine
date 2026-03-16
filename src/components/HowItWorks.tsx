import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Coffee, Search, Rocket, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    text: "We deep dive into your business — mapping out exactly where you're leaking time and money.",
    icon: Search,
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    num: "02",
    title: "Proof of Concept",
    text: "Before you commit, we build a complimentary piece of your actual system. You see the quality before you pay.",
    icon: Coffee,
    color: "from-primary/20 to-primary/30",
  },
  {
    num: "03",
    title: "The Build Phase",
    text: "Our engineers plug into your business. We deliver a production-grade system in under 90 days.",
    icon: Rocket,
    color: "from-emerald-500/20 to-emerald-600/20",
  },
];

const StepCard = ({ step, index }: any) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mb-24 last:mb-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="flex-1 w-full"
      >
        <div
          className={`bg-card/40 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-primary/50 transition-colors duration-500 shadow-xl ${!isEven ? "text-right md:text-right" : "text-left"}`}
        >
          <div
            className={`absolute top-0 ${isEven ? "right-0" : "left-0"} p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
          >
            <step.icon size={120} className="text-primary" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block font-bold">
            Step {step.num}
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md ml-0 mr-auto lg:ml-0 group-hover:text-foreground transition-colors duration-500">
            {step.text}
          </p>
        </div>
      </motion.div>

      {/* Center Circle */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className={`w-14 h-14 rounded-full bg-background bg-gradient-to-br ${step.color} border-2 border-primary/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(139,92,246,0.3)]`}
        >
          <step.icon size={24} className="text-primary" />
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 -z-10" />
        </motion.div>
      </div>

      {/* Placeholder for symmetry */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block font-bold">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
            Roadmap to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Efficiency
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our structured approach ensures we ship fast, minimize risk, and
            deliver high-impact results for your business.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-border/30 -translate-x-1/2 hidden md:block" />
          <motion.div
            className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-blue-500 to-primary -translate-x-1/2 origin-top hidden md:block"
            style={{ scaleY }}
          />

          <div className="relative">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>

          {/* Final Pulse Circle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center mt-12 md:mt-0"
          >
            <div className="w-10 h-10 rounded-full bg-background bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center relative md:absolute md:left-1/2 md:-translate-x-1/2 md:-bottom-20 z-10">
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
