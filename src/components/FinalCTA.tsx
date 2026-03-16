import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section id="qualify" className="section-padding">
    <div className="container-custom text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          Let's Go
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
          Let's Build Something Real.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          If your business is drowning in manual work and disconnected systems,
          or you have an AI project that needs the right team — let's talk.
          We'll build you a free Proof of Concept so you can see exactly what we
          can do.
        </p>
        <Button variant="gradient" size="lg" asChild>
          <a
            href="https://calendly.com/aizentools/intro-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            See If You Qualify <ArrowRight size={16} />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          No commitment. No pitch. Just a conversation about what's possible.
        </p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
