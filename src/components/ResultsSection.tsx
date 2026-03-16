import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 } as any,
  },
};

const ResultsSection = () => {
  const projects = useCountUp(121, 2000);
  const roi = useCountUp(224, 2000);
  const satisfaction = useCountUp(100, 2000);

  return (
    <section id="results" className="section-padding overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block font-bold">
            Proven Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            Numbers That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Speak
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 } as any,
            }}
            className="bg-card border border-border/50 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center relative overflow-hidden group shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p
              ref={projects.ref}
              className="text-5xl md:text-6xl font-display font-bold gradient-text mb-2 relative z-10"
            >
              {projects.count}+
            </p>
            <p className="text-muted-foreground relative z-10">
              Projects Delivered
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 } as any,
            }}
            className="bg-card border border-border/50 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center relative overflow-hidden group shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p
              ref={roi.ref}
              className="text-5xl md:text-6xl font-display font-bold gradient-text mb-2 relative z-10"
            >
              ${roi.count}M+
            </p>
            <p className="text-muted-foreground relative z-10">
              Client ROI Generated
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 } as any,
            }}
            className="bg-card border border-border/50 hover:border-primary/50 transition-colors rounded-2xl p-8 text-center relative overflow-hidden group shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p
              ref={satisfaction.ref}
              className="text-5xl md:text-6xl font-display font-bold gradient-text mb-2 relative z-10"
            >
              {satisfaction.count}%
            </p>
            <p className="text-muted-foreground relative z-10">
              Client Satisfaction Rate
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
