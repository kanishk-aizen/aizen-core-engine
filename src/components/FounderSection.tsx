import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Quote } from "lucide-react";
import { useState } from "react";

const FounderSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Decor - More Dynamic */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/4 -translate-y-1/4"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4"
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Content side */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              variants={itemVariants as any}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              <Play size={14} className="animate-pulse" />
              Founder's Vision
            </motion.div>

            <motion.h2
              variants={itemVariants as any}
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05]"
            >
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80 animate-gradient-x">
                Development.
              </span>
            </motion.h2>

            <motion.div variants={itemVariants as any} className="relative">
              <Quote className="absolute -top-6 -left-8 w-12 h-12 text-primary/10 -z-10 rotate-12" />
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-xl font-medium">
                <p className="italic">
                  "Traditional agencies are built on overhead.{" "}
                  <br className="hidden md:block" />
                  We built AIZEN on outcomes."
                </p>
                <p className="text-base md:text-lg not-italic font-normal text-muted-foreground">
                  My mission is to eliminate the friction between a business
                  idea and a high-scale technical reality. We don't just ship
                  code; we ship competitive advantages.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants as any}
              className="pt-10 border-t border-border/50 flex items-center gap-5"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center text-white font-display font-bold text-2xl border border-white/10">
                  K
                </div>
              </div>
              <div>
                <h4 className="text-foreground font-bold text-xl mb-0.5">
                  Kanishk Jagwani
                </h4>
                <p className="text-xs text-primary font-mono uppercase tracking-[0.2em] font-bold">
                  Founder & CEO
                </p>
              </div>
            </motion.div>
          </div>

          {/* Video side */}
          <motion.div variants={itemVariants as any} className="lg:col-span-6">
            <div className="relative group">
              {/* Dynamic Glow Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <AnimatePresence mode="wait">
                  {!isPlaying ? (
                    <motion.div
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                      className="absolute inset-0 z-10 cursor-pointer overflow-hidden"
                      onClick={() => setIsPlaying(true)}
                    >
                      {/* Local Thumbnail */}
                      <img
                        src="/thumbnail.png"
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                      />

                      {/* Interactive Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:bg-primary group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-500">
                          <Play
                            size={36}
                            className="text-white fill-white ml-1"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0"
                    >
                      <iframe
                        src="https://www.loom.com/embed/604921cbfaa34b0e97549d2f4475a94f?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                        frameBorder="0"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Advanced Floating Accents */}
              <div className="absolute -top-8 -right-8 w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-all duration-700 pointer-events-none -z-10 group-hover:-translate-y-4">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,1)]" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center blur-sm group-hover:blur-0 transition-all duration-700 pointer-events-none -z-10 group-hover:translate-y-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
