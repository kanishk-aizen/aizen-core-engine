import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import aizenLogo from "@/assets/aizen-logo.png";
import { Button } from "@/components/ui/button";
import { BlobButton } from "@/components/ui/BlobButton";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "services" },
  { label: "How It Works", href: "how-it-works" },
  { label: "Results", href: "results" },
  { label: "Case Studies", href: "/case-studies", isExternal: true },
  { label: "About Us", href: "/about-us", isExternal: true },
  { label: "FAQ", href: "faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (location.pathname !== "/") {
      // If not on home page, we don't prevent default, just let it navigate to /#id
      // But user doesn't want hashes... so we navigate to / then scroll.
      // Easiest is to navigate to / and then use a timeout to scroll if we have a state
      return;
    }

    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean,
  ) => {
    if (isExternal) {
      setOpen(false);
      return; // Let normal Link handle it
    }

    e.preventDefault();

    if (location.pathname !== "/") {
      setOpen(false);
      navigate("/", { state: { scrollTo: href } });
      return;
    }

    scrollToSection(e, href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16">
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center relative group"
        >
          <img src={aizenLogo} alt="AIZEN" className="h-8" />
          <div className="absolute -inset-2 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) =>
            l.isExternal ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-primary/5 group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-blue-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ) : (
              <a
                key={l.href}
                href={location.pathname === "/" ? `#${l.href}` : `/#${l.href}`}
                onClick={(e) => handleNavClick(e, l.href)}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-primary/5 group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-blue-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ),
          )}
        </div>

        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <BlobButton
              onClick={() =>
                window.open(
                  "https://calendly.com/aizentools/intro-call",
                  "_blank",
                )
              }
              className="h-10 px-6 text-[12px]"
            >
              See If You Qualify
            </BlobButton>
          </motion.div>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 border-t border-white/5 overflow-hidden bg-background/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="container-custom py-8 flex flex-col gap-2 relative z-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {l.isExternal ? (
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between text-base font-medium text-muted-foreground hover:text-primary transition-all py-3 border-b border-white/5 active:bg-white/5 rounded-lg px-2"
                    >
                      {l.label}
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    </Link>
                  ) : (
                    <a
                      href={location.pathname === "/" ? `#${l.href}` : `/#${l.href}`}
                      onClick={(e) => handleNavClick(e, l.href)}
                      className="flex items-center justify-between text-base font-medium text-muted-foreground hover:text-primary transition-all py-3 border-b border-white/5 active:bg-white/5 rounded-lg px-2"
                    >
                      {l.label}
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.1 }}
                className="mt-6"
              >
                <BlobButton
                  onClick={() =>
                    window.open(
                      "https://calendly.com/aizentools/intro-call",
                      "_blank",
                    )
                  }
                  className="w-full h-14 text-sm uppercase tracking-widest font-bold"
                >
                  See If You Qualify
                </BlobButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
