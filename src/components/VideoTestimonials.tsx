import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";

/* 
 * Video Testimonials Data
 * Reconstructed to support the split-pane design with short overlaid quotes
 */
const videos = [
  {
    src: "/test1.mp4",
    quoteShort: "Shipped fast and super reliable!",
    quote:
      "We would highly recommend anyone who's looking for an AI equipped development team who ships fast. They were super reliable and helped us launch our SaaS sooner.",
    clientName: "Voone",
    clientRole: "Voice AI platform (SaaS)",
    category: "SaaS",
  },
  {
    src: "/test2.mp4",
    quoteShort: "Generate billions of views!",
    quote:
      "Aizen helped me build an AI content operating system which allows my personal brand and clients to generate billions of views.",
    clientName: "Anti Prophet",
    clientRole: "Influencer (2.4M followers)",
    category: "Content",
  },
  {
    src: "/test3.mp4",
    quoteShort: "Restored our trust in outsourcing!",
    quote:
      "AIZEN’s team was exceptional to work with. Their engineers executed quickly and delivered consistently. After difficult experiences with other agencies, I had lost trust in outsourcing. AIZEN restored that confidence by building our Dreamster AI Music NFT SaaS platform in a fraction of the expected time.",
    clientName: "Dreamster",
    clientRole: "AI Music NFT SaaS",
    category: "Platform",
  },
];

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
        className="relative w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.3)] border border-white/10 max-h-[90vh]"
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
  
  // Embla Carousel Setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  
  // Carousel State tracking
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // 6-7 second auto-play logic
  useEffect(() => {
    if (!emblaApi) return;
    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6500); // exactly in the middle of 6-7s
    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);


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
          className="text-center mb-16"
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

        {/* Embla Carousel Container */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center">
          
          {/* Left Chevron */}
          <button 
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-12 lg:-left-20 z-10 w-12 h-12 items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="embla overflow-hidden w-full rounded-[2rem] border border-white/5 shadow-2xl" ref={emblaRef}>
            <div className="embla__container flex">
              {videos.map((v, i) => (
                <div className="embla__slide flex-[0_0_100%] min-w-0" key={i}>
                  {/* Split Card Design */}
                  <div className="flex flex-col lg:flex-row bg-[#11121c] w-full min-h-[400px]">
                    
                    {/* Left Pane: Video section */}
                    <div className="relative w-full lg:w-1/2 aspect-[4/5] md:aspect-video lg:aspect-auto bg-black overflow-hidden group cursor-pointer" onClick={() => setActiveVideoIndex(i)}>
                      <video
                        src={v.src}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-700"
                        muted
                        playsInline
                      />
                      
                      {/* Playful quote overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10">
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight max-w-[90%] shadow-black drop-shadow-md">
                          "{v.quoteShort}"
                        </h3>
                      </div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                          <Play size={24} className="text-white fill-white ml-1 opacity-90" />
                        </div>
                      </div>

                      {/* Client Logo / Info Box overlay */}
                      <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-4 z-20 shadow-xl">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {v.clientName.charAt(0)}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold text-white">{v.clientName}</span>
                          <span className="text-xs text-muted-foreground">{v.clientRole}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Pane: Text section */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#181a27] to-[#11121c]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <h4 className="text-2xl font-medium text-white tracking-wide">{v.clientName}</h4>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={18}
                              className="text-[#3b82f6] fill-[#3b82f6] opacity-90"
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {v.quote}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Chevron */}
          <button 
            onClick={scrollNext}
            className="hidden md:flex absolute -right-12 lg:-right-20 z-10 w-12 h-12 items-center justify-center rounded-full text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight size={36} />
          </button>

        </div>
        
        {/* Mobile controls indicator (optional) */}
        <div className="flex md:hidden justify-center gap-6 mt-10">
          <button 
            onClick={scrollPrev} 
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground active:bg-primary active:text-white transition-all shadow-lg active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext} 
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground active:bg-primary active:text-white transition-all shadow-lg active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
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

