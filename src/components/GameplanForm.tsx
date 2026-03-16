import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, X, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameplanFormProps {
  open: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: "industry",
    question: "What industry is your business in?",
    subtitle: "Be as specific as possible for a more accurate gameplan.",
    placeholder: "e.g. Digital marketing agency, SaaS, Legal, Healthcare...",
  },
  {
    id: "teamSize",
    question: "How large is your team?",
    subtitle: "Include full-time, part-time, and contractors.",
    placeholder: "e.g. 8 people — 3 account managers, 2 designers, 2 developers, 1 ops",
  },
  {
    id: "operations",
    question: "Describe your operations at a high level.",
    subtitle: "What does your business actually do day-to-day? Be detailed — the more context, the better your gameplan.",
    placeholder: "e.g. We run a digital marketing agency. We handle client onboarding, content creation, ad management, reporting, and invoicing across 30+ clients...",
  },
  {
    id: "teamStructure",
    question: "What's your team structure and main operational bottleneck?",
    subtitle: "Where does work get stuck? What slows your team down the most?",
    placeholder: "e.g. We have 3 account managers, 2 designers, and 1 ops person. Our bottleneck is proposal writing — it takes 4+ hours per proposal...",
  },
  {
    id: "manualHours",
    question: "How many hours per week does your team spend on manual, repetitive tasks?",
    subtitle: "Think data entry, copy-pasting, follow-ups, reporting, scheduling.",
    placeholder: "e.g. Around 20-30 hours per week across the team",
  },
  {
    id: "manualTask",
    question: "What is the #1 manual, repetitive task bleeding your team's time?",
    subtitle: "The task that, if automated, would have the biggest impact.",
    placeholder: "e.g. Manually qualifying leads from our website and entering them into HubSpot, then sending personalized follow-up emails...",
  },
  {
    id: "tools",
    question: "What tools and software does your team currently use?",
    subtitle: "List your main tools — CRM, project management, communication, etc.",
    placeholder: "e.g. HubSpot, Slack, Notion, Google Sheets, Zapier, QuickBooks, Calendly...",
  },
  {
    id: "toolSpend",
    question: "What's your total monthly subscription spend on software tools?",
    subtitle: "An estimate is fine.",
    placeholder: "e.g. Around $2,500/month across all tools",
  },
  {
    id: "revenue",
    question: "What's your annual revenue range?",
    subtitle: "This helps us calibrate ROI projections to your scale.",
    placeholder: "e.g. $1M–$5M annually",
  },
  {
    id: "email",
    question: "Where should we send your AI Gameplan?",
    subtitle: "Enter your best email. We'll also display the gameplan right here.",
    placeholder: "you@yourcompany.com",
    isEmail: true,
  },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-gameplan`;

const GameplanForm = ({ open, onClose }: GameplanFormProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [gameplan, setGameplan] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentQ = questions[step];
  const progress = generating || gameplan ? 100 : ((step) / questions.length) * 100;
  const currentAnswer = answers[currentQ?.id] || "";

  const canProceed =
    currentQ?.isEmail
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentAnswer)
      : currentAnswer.trim().length > 0;

  const generateGameplan = async () => {
    setGenerating(true);
    setError("");
    setGameplan("");

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ answers }),
      });

      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate gameplan");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setGameplan(fullText);
              // Auto-scroll
              requestAnimationFrame(() => {
                scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  const next = () => {
    if (!canProceed) return;
    if (step < questions.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      generateGameplan();
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const setAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  if (!open) return null;

  // Show gameplan result
  if (generating || gameplan) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-display font-bold gradient-text">AIZEN</span>
            <span className="text-xs text-muted-foreground">Your AI Gameplan</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pt-4">
          <div className="max-w-3xl mx-auto">
            <Progress value={100} className="h-1.5 bg-secondary [&>div]:bg-primary" />
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto">
            {generating && !gameplan && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="animate-spin" size={20} />
                <span>Generating your custom AI Gameplan...</span>
              </div>
            )}
            {error && (
              <div className="text-destructive bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
                {error}
              </div>
            )}
            {gameplan && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: formatMarkdown(gameplan) }} />
                {generating && (
                  <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-display font-bold gradient-text">AIZEN</span>
          <span className="text-xs text-muted-foreground">AI Gameplan</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 pt-4">
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="h-1.5 bg-secondary [&>div]:bg-primary" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">{step + 1} of {questions.length}</span>
            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">
                {currentQ.question}
              </h2>
              <p className="text-muted-foreground mb-8">{currentQ.subtitle}</p>

              <input
                type={currentQ.isEmail ? "email" : "text"}
                value={currentAnswer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                onKeyDown={(e) => e.key === "Enter" && next()}
                autoFocus
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="px-6 py-6 border-t border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <Button
            variant="gradient"
            size="lg"
            onClick={next}
            disabled={!canProceed}
            className="rounded-2xl"
          >
            {step === questions.length - 1 ? "Generate My AI Gameplan" : "Next"} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Simple markdown to HTML converter
function formatMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3 gradient-text">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

export default GameplanForm;
