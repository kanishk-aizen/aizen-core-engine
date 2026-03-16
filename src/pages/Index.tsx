import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ResultsSection from "@/components/ResultsSection";
import ProblemSection from "@/components/ProblemSection";
import BottleneckDiagram from "@/components/BottleneckDiagram";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import AIBrainDiagram from "@/components/AIBrainDiagram";
import DashboardPreview from "@/components/DashboardPreview";
import ComparisonSection from "@/components/ComparisonSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoTestimonials from "@/components/VideoTestimonials";
import FounderSection from "@/components/FounderSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FooterSection from "@/components/FooterSection";
import GameplanForm from "@/components/GameplanForm";

const Index = () => {
  const [gameplanOpen, setGameplanOpen] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Handle cross-page navigation from state (to avoid hashes)
    if (lenis && location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      // We wait slightly longer to ensure the global ScrollToTop reset has finished
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Use lenis.scrollTo instead of scrollIntoView for better reliability
          lenis.scrollTo(element, { offset: -100, duration: 1.5 });
        }
      }, 250);
      // Clear state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location, lenis]);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* Main content layer — sits ABOVE the footer */}
      <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-[350px] md:mb-[430px]">
        <div className="page-bg" aria-hidden="true" />
        <Navbar />
        <HeroSection onOpenGameplan={() => setGameplanOpen(true)} />
        <ResultsSection />
        <ProblemSection />
        <BottleneckDiagram />
        <WhoThisIsFor />
        <AIBrainDiagram />
        <DashboardPreview />
        <ComparisonSection />
        <ServicesSection />
        <HowItWorks />
        <TestimonialsSection />
        <VideoTestimonials />
        <FounderSection />
        <GuaranteeSection />
      </div>

      {/* Footer sits behind main content — revealed like a curtain */}
      <FooterSection />

      <AnimatePresence>
        {gameplanOpen && (
          <GameplanForm
            open={gameplanOpen}
            onClose={() => setGameplanOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
