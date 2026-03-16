import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  Database,
} from "lucide-react";

const ValueCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-card/30 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:border-primary/40 transition-colors group"
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
      <Icon size={20} className="text-primary" />
    </div>
    <h4 className="text-sm font-bold mb-2 text-foreground">{title}</h4>
    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
  </motion.div>
);

const GuaranteeSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: 3D Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                mouseX.set(0);
                mouseY.set(0);
              }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative aspect-square max-w-[450px] mx-auto group cursor-none md:cursor-default"
            >
              {/* Shield Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />

              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: "translateZ(50px)" }}
              >
                {/* The Shield */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-background/40 backdrop-blur-xl border-2 border-primary/30 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center shadow-2xl">
                  {/* Internal Grid lines */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  <motion.div
                    animate={
                      isHovered
                        ? { scale: 1.1, rotate: 5 }
                        : { scale: 1, rotate: 0 }
                    }
                    className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-primary/20 rounded-3xl border border-primary/50 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                  >
                    <ShieldCheck size={64} className="text-primary" />
                    <Sparkles className="absolute -top-2 -right-2 text-primary animate-pulse" />
                  </motion.div>

                  <div className="text-center px-6 relative z-10">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-2 font-bold">
                      Encrypted
                    </p>
                    <h4 className="text-xl md:text-2xl font-display font-bold">
                      Zero-Risk Trust
                    </h4>
                  </div>

                  {/* Top shine */}
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000" />
                </div>
              </div>

              {/* Floaties */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transform: "translateZ(80px)" }}
                className="absolute top-10 right-0 p-4 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Zap size={16} className="text-emerald-500" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  No Risk
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                style={{ transform: "translateZ(100px)" }}
                className="absolute bottom-10 left-0 p-4 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Lock size={16} className="text-blue-500" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Verify First
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                <Sparkles size={12} />
                <span>The Aizen Guarantee</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                Prove us <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80">
                  before you pay us.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                We don't believe in generic sales calls. Instead, we build a
                custom{" "}
                <span className="text-foreground font-semibold">
                  Proof of Concept
                </span>{" "}
                tailored to your actual business data—for free. You verify our
                tech, our speed, and our impact before committing a single
                dollar.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <ValueCard
                icon={Database}
                title="Own the POC"
                desc="Keep the architecture and logic we build, even if you don't proceed."
                delay={0.1}
              />
              <ValueCard
                icon={Zap}
                title="Crystal Clarity"
                desc="See exact timelines and ROI projections before signing a contract."
                delay={0.2}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                variant="gradient"
                size="lg"
                asChild
                className="w-full sm:w-auto px-10 h-16 text-lg rounded-2xl"
              >
                <a
                  href="https://calendly.com/aizentools/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See If You Qualify <ArrowRight size={20} className="ml-2" />
                </a>
              </Button>
              <div className="text-sm font-mono text-muted-foreground text-center sm:text-left">
                <p className="text-foreground font-bold">No commitment.</p>
                <p>Just technical excellence, proven upfront.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
