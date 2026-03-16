import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
{ quote: "I had a great video chat with the team. They answered my questions and provided brilliant ideas to help move my project forward. I intend to keep working with them.", type: "60 Minute Consultation" },
{ quote: "I couldn't be happier with their work. True professionals across the board. They understood our problem deeply and delivered beyond expectations.", type: "App Consulting" },
{ quote: "AIZEN is fantastic to work with, clear communicators and they do work to a high standard. They really understood our MVP requirements.", type: "AI MVP Development" },
{ quote: "Great experience and will continue to work with the team. They built our entire website and integrated AI features we didn't even know were possible.", type: "Website Development" },
{ quote: "The team was highly responsive and proactive during this project. It was easy to communicate with them and they were flexible to our needs and changes.", type: "AI Automation Build" },
{ quote: "Very knowledgeable — he gets what you're trying to do and is very efficient. One of the best teams I've worked with. Highly recommend for any AI project.", type: "AI Platform Build" },
{ quote: "Can't thank the guys enough for the efforts to bring our MVP to life. Fantastic communication, support, and advanced technical expertise. Wonderful job across the board.", type: "App Development" },
{ quote: "Adam is an expert in his field, friendly and helpful, answering everything I needed to know. I would highly recommend him to anyone needing development assistance.", type: "Developer Mentoring" },
{ quote: "Easy to work with and completed everything as requested.", type: "Invoice Generation App" },
{ quote: "Project ran very well with good communications and very satisfied with the deliverables.", type: "AI Integration" },
{ quote: "Adam is very knowledgeable, he gets what you are trying to do and is very efficient! One of the best freelancers I've worked with.", type: "Bug Fix Project" },
{ quote: "Highly professional and delivered exactly what we needed. The AI automation saved us 20+ hours per week. Game changer for our operations.", type: "AI Workflow Automation" }];


const Stars = () =>
<div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) =>
  <Star key={i} size={14} className="fill-warning text-warning" />
  )}
  </div>;


const Card = ({ t }: {t: (typeof testimonials)[0];}) =>
<div className="bg-card border border-border rounded-2xl p-6 mb-4 break-inside-avoid">
    <Stars />
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.quote}"</p>
    <div>
      <p className="text-sm font-semibold">— Client Review</p>
      <p className="text-xs text-muted-foreground">{t.type}</p>
    </div>
  </div>;


// Split testimonials into 3 columns
const col1 = testimonials.filter((_, i) => i % 3 === 0);
const col2 = testimonials.filter((_, i) => i % 3 === 1);
const col3 = testimonials.filter((_, i) => i % 3 === 2);

const MarqueeColumn = ({
  items,
  direction = "up",
  duration = 30




}: {items: (typeof testimonials);direction?: "up" | "down";duration?: number;}) => {
  const doubled = [...items, ...items];
  const yFrom = direction === "up" ? "0%" : "-50%";
  const yTo = direction === "up" ? "-50%" : "0%";

  return (
    <div className="relative overflow-hidden h-[600px]">
      <motion.div
        animate={{ y: [yFrom, yTo] }}
        transition={{
          y: {
            duration,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="flex flex-col">

        {doubled.map((t, i) =>
        <Card key={i} t={t} />
        )}
      </motion.div>
    </div>);

};

const TestimonialsSection = () =>
<section className="section-padding overflow-hidden">
    <div className="container-custom">
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16">

        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">What Our Clients Say</h2>
      </motion.div>

      <div className="relative">
        {/* Fade masks */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MarqueeColumn items={col1} direction="up" duration={25} />
          <MarqueeColumn items={col2} direction="down" duration={30} />
          <MarqueeColumn items={col3} direction="up" duration={28} />
        </div>
      </div>
    </div>
  </section>;


export default TestimonialsSection;