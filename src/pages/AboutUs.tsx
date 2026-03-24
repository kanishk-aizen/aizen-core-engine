import { useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import FooterSection from "@/components/FooterSection";

const StaggeredText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const yBg = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(smoothProgress, [0, 0.5], [1, 0.6]);

  return (
    <div className="relative min-h-screen text-foreground bg-background">
      {/* Main Content Layer that hides the Footer */}
      <div ref={containerRef} className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-[350px] md:mb-[430px] min-h-screen overflow-hidden">
        
        {/* Premium Minimal Background Pattern with Parallax (Infinite Resolution) */}
        <div className="absolute top-0 left-0 w-full h-[130vh] pointer-events-none z-0">
          <motion.div 
            style={{ y: yBg, opacity: opacityBg }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-black/60 z-0" /> {/* Darken base for white text */}
            
            {/* Ultra-sharp minimal tech grid pattern */}
            <div 
              className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 80%)'
              }}
            />
            
            {/* Animated high-res diagonal slash overlay */}
            <motion.div 
              animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 z-0 opacity-20 mix-blend-screen"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px)`
              }}
            />

            {/* Gradient fades perfectly into the site's light/dark background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
          </motion.div>
        </div>

        {/* Floating Orbs for extra premium feel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              y: [0, -50, 0], 
              rotate: [0, 45, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              y: [0, 50, 0], 
              rotate: [0, -45, 0],
              scale: [1, 1.5, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 blur-[150px]"
          />
        </div>

        <Navbar />
        
        <div className="pt-40 pb-32 container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Hero Header Section */}
            <div className="text-center mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-[0.2em] mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Our Story
              </motion.div>
              
              <StaggeredText 
                text="Engineered for the Future." 
                className="text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 leading-[1.1]"
              />
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-4 w-full justify-center md:justify-start">
                  <div className="h-[1px] w-12 bg-primary hidden md:block" />
                  <h2 className="text-sm font-mono uppercase tracking-widest text-primary">About Us</h2>
                </div>
                <h3 className="text-3xl font-display font-bold leading-tight text-center md:text-left">
                  Where cutting-edge AI meets precision-driven software.
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed text-center md:text-left">
                  Welcome to A.I.Zen. We specialize in intelligent automation, machine learning, and custom software development to drive innovation and efficiency. Our mission is to empower businesses with AI-driven solutions that enhance productivity, streamline operations, and unlock new possibilities.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative group h-full min-h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <img 
                  src="/aboutus.webp" 
                  alt="A.I.Zen Technology"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            </div>

            {/* Mission Content Full width */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative p-10 md:p-16 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] overflow-hidden mb-32"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-4 mb-8 w-full justify-center md:justify-start">
                  <div className="h-[1px] w-12 bg-blue-500 hidden md:block" />
                  <h2 className="text-sm font-mono uppercase tracking-widest text-blue-400">Our Mission</h2>
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8 text-center md:text-left">
                  Future-ready solutions for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">challenges of tomorrow.</span>
                </h3>
                <div className="space-y-6 text-xl text-muted-foreground leading-relaxed text-center md:text-left">
                  <p>
                    Our mission at A.I.Zen is to develop intelligent, scalable, and future-ready AI solutions that seamlessly integrate into businesses, enhancing efficiency, automation, and decision-making. We strive to create software that not only meets the demands of today but also anticipates the challenges of tomorrow. 
                  </p>
                  <p>
                    By combining cutting-edge AI technology with robust software engineering principles, we deliver high-performance solutions that stand the test of time. We envision a world where AI-driven software doesn’t just automate processes but elevates business intelligence, enhances human capabilities, and drives meaningful innovation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Meet the Founder */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Meet the <span className="font-light italic text-muted-foreground">Founder</span></h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-primary mx-auto rounded-full" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="flex flex-col items-center justify-center space-y-6 md:space-y-8"
              >
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
                    className="relative group cursor-pointer perspective-1000 z-10"
                  >
                    {/* Glowing Backing */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-primary via-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition duration-700" />
                    
                    {/* Rotating Border ring */}
                    <div className="absolute -inset-2 rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors duration-500 before:absolute before:inset-0 before:rounded-full before:border-t-2 before:border-t-primary before:animate-[spin_4s_linear_infinite]" />
                    
                    <img 
                      src="/kanishk.jpg" 
                      alt="Kanishk Jagwani" 
                      className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-[12px] border-background/80 shadow-[0_0_40px_rgba(0,0,0,0.8)] filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </motion.div>
                  
                  {/* Decorative orbital paths */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full z-0" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full border-dashed z-0 animate-[spin_60s_linear_infinite]" />
                </div>

                <div className="text-center space-y-3 relative z-10 mt-8">
                  <h3 className="text-4xl font-display font-bold tracking-tight text-foreground">Kanishk Jagwani</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-primary font-mono text-sm uppercase tracking-widest">(CEO)</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default AboutUs;
