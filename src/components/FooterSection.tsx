import aizenLogo from "@/assets/aizen-logo.png";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Services", href: "services" },
  { label: "How It Works", href: "how-it-works" },
  { label: "Results", href: "results" },
  { label: "Case Studies", href: "/case-studies", isExternal: true },
  { label: "FAQ", href: "faq" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aizenautomation/",
  },
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
];

const FooterSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (location.pathname !== "/") {
      return;
    }
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean,
  ) => {
    if (isExternal) return;

    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/", { state: { scrollTo: href } });
      return;
    }

    scrollToSection(e, href);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-card overflow-hidden will-change-transform pointer-events-auto">
      <div className="container-custom py-10 md:py-12">
        {/* Top area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <img
                src={aizenLogo}
                alt="AIZEN"
                className="h-10 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              We plug into your business as your technical AI cofounder —
              building intelligent systems that scale your entire operation.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@aizen.dev"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail size={14} />
                hello@aizen.dev
              </a>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin size={14} />
                Global — Remote First
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider mb-6 text-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((l) =>
                l.isExternal ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={
                      location.pathname === "/" ? `#${l.href}` : `/#${l.href}`
                    }
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200"
                  >
                    {l.label}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Social Column */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider mb-6 text-foreground">
              Social
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  {l.label}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* CTA Column */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider mb-6 text-foreground">
              Get Started
            </h4>
            <a
              href="https://calendly.com/aizentools/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              See If You Qualify
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} AIZEN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
