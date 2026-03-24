import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
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
import CrmSection from "@/components/CrmSection";
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

  useEffect(() => {
    // Handle cross-page navigation from state (to avoid hashes)
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      // We wait slightly longer to ensure the global ScrollToTop reset has finished
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Native scroll jump
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "auto", // Immediate jump
          });
        }
      }, 250);
      // Clear state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* Main content layer — sits ABOVE the footer */}
      <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-[850px] md:mb-[430px]">
        <div className="page-bg" aria-hidden="true" />
        <Navbar />
        <HeroSection onOpenGameplan={() => setGameplanOpen(true)} />
        <ResultsSection />
        <ServicesSection />
        <CrmSection />
        <ProblemSection />
        <BottleneckDiagram />
        <WhoThisIsFor />
        <AIBrainDiagram />
        <DashboardPreview />
        <ComparisonSection />
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
