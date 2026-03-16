import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
            The Manual Work Is Eating Your Business Alive.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you run an agency, medical practice, law firm, or SaaS company — the symptoms are the same. Your team is drowning in repetitive tasks that should have been automated months ago.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
