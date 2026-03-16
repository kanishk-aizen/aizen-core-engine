import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How long does a typical project take?", a: "Most projects are delivered in under 90 days. Simpler automation builds can be done in 2-4 weeks. Complex operating systems and AI apps typically take 6-12 weeks." },
  { q: "What's included in the free Proof of Concept?", a: "A working proof-of-concept of your specific project. Not a generic demo — a functional build tailored to your business so you can evaluate our quality before committing." },
  { q: "I already have a spec for my AI project. Can you build it?", a: "Yes. Whether you need a document intelligence system, AI chatbot, voice agent, custom LLM tool, or automation workflow — we've shipped 121+ projects across every category. Send us your spec and we'll scope a free Proof of Concept." },
  { q: "How is AIZEN different from other agencies or freelancers?", a: "We operate like technical cofounders, not agencies or contractors. We plug into your business, understand your operations, and build systems with full ownership. And we prove ourselves with a free Proof of Concept before you commit a single dollar." },
  { q: "What industries do you work with?", a: "Legal, healthcare, insurance, agencies, SaaS, e-commerce, coaching, consulting, financial services, real estate, creator economy, and more." },
  { q: "Do you offer ongoing support?", a: "Yes. We don't disappear after delivery. We offer ongoing support plans including maintenance, updates, and scaling as your business grows." },
];

const FAQSection = () => (
  <section id="faq" className="section-padding">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">FAQ</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">Frequently Asked Questions</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[720px] mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-4">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
