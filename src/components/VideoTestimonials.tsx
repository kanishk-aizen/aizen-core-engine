import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

const videos = [
  {
    src: "/test1.mp4",
    quote:
      "We would highly recommend anyone who's looking for an AI equipped development team who ships fast. They were super reliable and helped us launch our SaaS sooner",
    client: "Voone — Voice AI platform (SaaS)",
    category: "SaaS",
  },
  {
    src: "/test2.mp4",
    quote:
      "Aizen helped me build an AI content operating system which allows my personal brand and clients to generate billions of views",
    client: "Anti Prophet — Influencer (2.4M followers)",
    category: "Content",
  },
  {
    src: "/test3.mp4",
    quote:
      "AIZEN’s team was exceptional to work with. Their engineers executed quickly and delivered consistently. After difficult experiences with other agencies and development teams, I had lost trust in outsourcing software projects. AIZEN restored that confidence by building our Dreamster AI Music NFT SaaS platform in a fraction of the expected time while maintaining a high standard of quality.",
    client: "Dreamster — AI Music NFT Platform",
    category: "Platform",
  },
];

const VideoCard = ({
  video,
  index,
  onPlay,
}: {
  video: (typeof videos)[0];
  index: number;
  onPlay: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card border border-border/50 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-xl"
    >
      {/* Thumbnail Container */}
      <div
        className="aspect-[4/3] relative cursor-pointer overflow-hidden bg-black"
        onClick={onPlay}
      >
        <video
          src={video.src}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          muted
          playsInline
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform duration-500">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              className="text-emerald-500 fill-emerald-500"
            />
          ))}
        </div>
        <p className="text-sm md:text-base font-display font-medium leading-relaxed mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-4">
          "{video.quote}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80">
            {video.client}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const VideoModal = ({
  video,
  onClose,
}: {
  video: (typeof videos)[0];
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-3xl"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.2)] border border-white/10"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          playsInline
          controls
          preload="auto"
          onClick={togglePlay}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Modal Controls */}
        <div className="absolute top-8 right-8 z-10">
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 text-white shadow-2xl"
          >
            <X size={24} />
          </button>
        </div>

        {/* Play indicator overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-24 h-24 rounded-full bg-primary/40 backdrop-blur-xl border border-primary/50 flex items-center justify-center text-white shadow-[0_0_50px_rgba(139,92,246,0.5)]">
                <Play size={40} className="fill-white ml-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

const VideoTestimonials = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  return (
    <section
      id="case-studies"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4 -z-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4 -z-10" />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-6 block font-bold">
            Live Results
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
            Hear Directly From <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary/80">
              Our Clients
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real stories from founders and executives who chose technical
            excellence and AI-native scaling over traditional overhead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {videos.map((v, i) => (
            <VideoCard
              key={i}
              video={v}
              index={i}
              onPlay={() => setActiveVideoIndex(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideoIndex !== null && (
          <VideoModal
            video={videos[activeVideoIndex]}
            onClose={() => setActiveVideoIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonials;
