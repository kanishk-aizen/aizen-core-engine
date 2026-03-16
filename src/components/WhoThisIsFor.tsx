import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Building2,
  Bot,
  ClipboardList,
  Brain,
  MousePointerClick,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const cards = [
  {
    icon: Building2,
    title: "You're Running a Service Business",
    text: "Agencies, consultants, law firms, medical practices — juggling clients, projects, and internal workflows across too many tools.",
    colSpan: "md:col-span-2",
    delay: 0.1,
  },
  {
    icon: Bot,
    title: "You Want to Automate",
    text: "You know AI could save you time, but your systems are too scattered.",
    colSpan: "md:col-span-1",
    delay: 0.2,
  },
  {
    icon: ClipboardList,
    title: "You Need the Right Team",
    text: "You have a clear vision — an AI app or custom automation — and need a team that ships it.",
    colSpan: "md:col-span-1",
    delay: 0.3,
  },
  {
    icon: Brain,
    title: "You Need One System",
    text: "A single AI-powered operating system tailored to your business — built fast and ready to scale.",
    colSpan: "md:col-span-2",
    delay: 0.4,
  },
];

// Reusable 3D Tilt Card Component
const TiltCard = ({ card, children }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring for the actual rotation values
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform the mouse position into rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize mouse position between -0.5 and +0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: card.delay,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${card.colSpan} cursor-pointer perspective-1000`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
        style={{ transform: "translateZ(-50px)" }}
      />

      <div
        className="h-full bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300 rounded-3xl p-8 relative overflow-hidden shadow-2xl group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
          <card.icon size={120} className="text-primary" />
        </div>

        {/* Shine effect that follows mouse loosely */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ mixBlendMode: "overlay" }}
        />

        <div
          className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500 ease-out"
          style={{ transform: "translateZ(30px)" }}
        >
          <card.icon className="text-primary" size={28} />
        </div>

        <div style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-2xl font-display font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80 group-hover:to-primary/80 transition-colors duration-500">
            {card.title}
          </h3>
          <p className="text-base text-muted-foreground/90 leading-relaxed font-light">
            {card.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const WhoThisIsFor = () => (
  <section className="section-padding relative overflow-hidden">
    {/* Floating background elements */}
    <div
      className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none"
      style={{ animationDuration: "4s" }}
    />
    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

    <div className="container-custom relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block flex items-center justify-center gap-2">
          Is This You?
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
          Who We{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            Build For
          </span>
        </h2>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground animate-bounce">
          <MousePointerClick size={16} /> Hover to interact
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto perspective-1000">
        {cards.map((card, i) => (
          <TiltCard key={i} card={card} />
        ))}
      </div>
    </div>
  </section>
);

export default WhoThisIsFor;
