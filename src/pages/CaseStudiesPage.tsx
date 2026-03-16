import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CaseStudies from "@/components/CaseStudies";
import FooterSection from "@/components/FooterSection";

const CaseStudiesPage = () => (
  <div className="relative min-h-screen text-foreground overflow-x-hidden">
    {/* Main content layer — sits ABOVE the footer */}
    <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-[350px] md:mb-[430px]">
      <div className="page-bg" aria-hidden="true" />
      <Navbar />
      <div className="pt-32 pb-4 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4">
            Our Case Studies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Real systems we've built for real businesses. See how we've
            transformed operations across industries.
          </p>
        </motion.div>
      </div>
      <CaseStudies />
      <div className="section-padding text-center">
        <Button variant="gradient" size="lg" asChild>
          <a href="/#qualify">
            See If You Qualify <ArrowRight size={16} />
          </a>
        </Button>
      </div>
    </div>

    {/* Footer sits behind main content — revealed like a curtain */}
    <FooterSection />
  </div>
);

export default CaseStudiesPage;
