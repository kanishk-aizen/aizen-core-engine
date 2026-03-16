import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { TrendingUp, Bot, Cpu, DollarSign, BarChart3, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const revenueData = [
  { name: "Jan", value: 12400 },
  { name: "Feb", value: 18200 },
  { name: "Mar", value: 14800 },
  { name: "Apr", value: 9200 },
  { name: "May", value: 16500 },
  { name: "Jun", value: 21300 },
  { name: "Jul", value: 19800 },
  { name: "Aug", value: 26400 },
  { name: "Sep", value: 31200 },
];

const stats = [
  { label: "Pipeline Value", value: "$1.2M", change: "↑ 24.3%", icon: DollarSign },
  { label: "Active Deals", value: "47", change: "↑ 12.8%", icon: TrendingUp },
  { label: "AI Actions Today", value: "1,284", change: "↑ 31.2%", icon: Cpu },
  { label: "AI Employees Deployed", value: "12", change: "↑ 3 this week", icon: Bot },
];

const agents = [
  { name: "Lead Qualifier", task: "Scoring inbound from HubSpot", progress: 94, time: "12s ago", status: "active" },
  { name: "Proposal Writer", task: "Drafting SOW for Acme Corp", progress: 87, time: "34s ago", status: "active" },
  { name: "Follow-Up Agent", task: "Following up with S. Patel", progress: 72, time: "1m ago", status: "active" },
  { name: "Data Enrichment", task: "Enriching 23 new contacts", progress: 91, time: "45s ago", status: "active" },
  { name: "Meeting Scheduler", task: "Coordinating with J. Chen", progress: 58, time: "3m ago", status: "pending" },
  { name: "Revenue Forecaster", task: "Idle — next run in 2h", progress: 0, time: "8m ago", status: "idle" },
];

const AnimatedProgress = ({ value, status }: { value: number; status: string }) => {
  const [animVal, setAnimVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimVal(value), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, value]);

  const colorClass =
    status === "active" ? "[&>div]:bg-[hsl(var(--success))]" :
    status === "pending" ? "[&>div]:bg-[hsl(var(--warning))]" :
    "[&>div]:bg-muted-foreground/30";

  return (
    <div ref={ref}>
      <Progress value={animVal} className={`h-1.5 bg-secondary ${colorClass}`} />
    </div>
  );
};

const DashboardPreview = () => {
  const sectionRef = useRef(null);

  return (
    <section className="section-padding" ref={sectionRef} style={{ '--background': '240 10% 3.9%', '--foreground': '0 0% 98%', '--card': '240 6% 6%', '--card-foreground': '0 0% 98%', '--border': '240 6% 12%', '--muted-foreground': '240 4% 65%', '--secondary': '240 6% 10%', backgroundColor: 'hsl(240 10% 3.9%)', color: 'hsl(0 0% 98%)' } as React.CSSProperties}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
            What You're Missing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
            This Is What Your AI Operating System Looks Like
          </h2>
          <p className="text-lg text-muted-foreground">
            A real system you could have running in 90 days or less.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
          style={{ perspective: "1200px" }}
        >
          <div
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
            style={{ transform: "rotateX(4deg)", transformOrigin: "center bottom" }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full bg-[hsl(var(--warning))]/60" />
                <span className="w-3 h-3 rounded-full bg-[hsl(var(--success))]/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                AIZEN OS — Command Center
              </span>
            </div>

            <div className="p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between mb-6"
              >
                <div>
                  <p className="text-lg font-display font-bold mb-1">
                    Welcome back, Jonathan 👋
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Here's your AI OS overview for the last 30 days
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-secondary/30">
                  <Building2 size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-mono">Your Company Logo</span>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="bg-secondary/50 rounded-xl p-4 border border-border cursor-default group hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                      <s.icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <span className="text-xs text-[hsl(var(--success))]">{s.change}</span>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="bg-secondary/50 rounded-xl p-5 border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold">Revenue Trend</p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Month</span>
                      <span className="px-2 py-0.5 rounded hover:bg-secondary cursor-pointer">Week</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-[hsl(var(--success))]">+2.5% ↗</span>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(265, 70%, 55%)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(265, 70%, 55%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "hsl(240 4% 46%)", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0 0% 100%)",
                          border: "1px solid hsl(240 6% 88%)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          color: "hsl(240 10% 10%)",
                        }}
                        formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(265, 70%, 55%)"
                        strokeWidth={2.5}
                        fill="url(#revGrad)"
                        dot={false}
                        activeDot={{ r: 5, fill: "hsl(265, 70%, 55%)", stroke: "hsl(0 0% 100%)", strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Agents in Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Agents in Action
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[hsl(var(--success))] bg-[hsl(var(--success))]/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                    {agents.filter((a) => a.status === "active").length} active
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {agents.map((agent, i) => (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + i * 0.08 }}
                      whileHover={{
                        scale: 1.02,
                        borderColor: agent.status === "active" ? "hsl(160, 60%, 40%)" : undefined,
                        transition: { duration: 0.2 },
                      }}
                      className={`bg-secondary/30 rounded-xl p-4 border cursor-default transition-colors ${
                        agent.status === "pending"
                          ? "border-[hsl(var(--warning))]/30"
                          : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{agent.name}</span>
                        <BarChart3
                          size={16}
                          className={
                            agent.status === "active"
                              ? "text-[hsl(var(--success))]"
                              : agent.status === "pending"
                              ? "text-[hsl(var(--warning))]"
                              : "text-muted-foreground/40"
                          }
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{agent.task}</p>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 flex items-center gap-2">
                          <AnimatedProgress value={agent.progress} status={agent.status} />
                          {agent.progress > 0 && (
                            <span className="text-xs text-muted-foreground shrink-0">
                              {agent.progress}%
                            </span>
                          )}
                          {agent.progress === 0 && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{agent.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
