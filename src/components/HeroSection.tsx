import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlobButton } from "@/components/ui/BlobButton";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onOpenGameplan?: () => void;
}

// Stagger container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Item animation
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
    textShadow: "0 0 0px rgba(139,92,246,0)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    textShadow: [
      "0 0 0px rgba(167, 139, 250, 0)",
      "0 0 30px rgba(167, 139, 250, 1), 0 0 60px rgba(139, 92, 246, 0.6)",
      "0 0 15px rgba(167, 139, 250, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)",
      "0 0 0px rgba(167, 139, 250, 0)",
    ],
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      textShadow: {
        duration: 4,
        times: [0, 0.2, 0.6, 1],
        ease: "easeInOut",
      },
    } as any,
  },
};

const textToAnimate = ["Your", "AI", "Systems", "Partner"];

const HeroSection = ({ onOpenGameplan }: HeroSectionProps) => (
  <section className="relative flex items-center justify-center pt-44 md:pt-52 pb-16 overflow-hidden min-h-[85vh]">
    {/* Radial glow - animated */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none"
    />

    <div className="container-custom relative z-10 text-center">
      <motion.span
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6"
      >
        BUILT TO SCALE
      </motion.span>

      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-4xl md:text-5xl lg:text-[64px] font-display font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto flex flex-wrap justify-center gap-[0.3em]"
      >
        {textToAnimate.map((word, i) => (
          <motion.span key={i} variants={itemVariants} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-lg text-muted-foreground max-w-[640px] mx-auto mb-10 leading-relaxed"
      >
        We plug into your business as your technical AI cofounder — diagnose
        your operational bottlenecks, automate the repetitive work bleeding your
        team dry, and build you one intelligent system that runs your entire
        operation. We build you a free Proof of Concept before we sign any
        contracts.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <BlobButton
            onClick={() =>
              window.open(
                "https://calendly.com/aizentools/intro-call",
                "_blank",
              )
            }
            className="h-14 px-10"
          >
            <span className="flex items-center gap-2 relative z-10">
              See If You Qualify
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </span>
          </BlobButton>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="lg"
            onClick={onOpenGameplan}
            className="rounded-2xl group h-12 px-8 flex items-center gap-2"
          >
            Get Your Free AI Gameplan
            <motion.span
              initial={{ y: 0 }}
              whileHover={{ y: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowDown size={16} />
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
