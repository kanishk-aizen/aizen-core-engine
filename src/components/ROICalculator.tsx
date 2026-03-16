import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [numTools, setNumTools] = useState(8);
  const [costPerTool, setCostPerTool] = useState(120);

  const laborCost = teamSize * hoursPerWeek * 52 * hourlyRate;
  const toolCost = numTools * costPerTool * 12;
  const totalWaste = laborCost + toolCost;
  const hoursWasted = teamSize * hoursPerWeek * 52;

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 block">Calculate Your Savings</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
            Interactive ROI Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much time and money you're losing to manual work — and what automation could save you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
        >
          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span>Team Size</span>
                <span className="font-mono text-primary">{teamSize}</span>
              </div>
              <Slider value={[teamSize]} onValueChange={([v]) => setTeamSize(v)} min={1} max={50} step={1} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span>Hours/Week on Manual Work (per person)</span>
                <span className="font-mono text-primary">{hoursPerWeek}h</span>
              </div>
              <Slider value={[hoursPerWeek]} onValueChange={([v]) => setHoursPerWeek(v)} min={1} max={40} step={1} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span>Average Hourly Rate</span>
                <span className="font-mono text-primary">${hourlyRate}</span>
              </div>
              <Slider value={[hourlyRate]} onValueChange={([v]) => setHourlyRate(v)} min={10} max={300} step={5} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span>Number of SaaS Tools</span>
                <span className="font-mono text-primary">{numTools}</span>
              </div>
              <Slider value={[numTools]} onValueChange={([v]) => setNumTools(v)} min={1} max={25} step={1} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span>Avg. Cost per Tool</span>
                <span className="font-mono text-primary">${costPerTool}/mo (~${fmt(numTools * costPerTool)}/mo total)</span>
              </div>
              <Slider value={[costPerTool]} onValueChange={([v]) => setCostPerTool(v)} min={10} max={500} step={10} />
            </div>
          </div>

          {/* Results */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
              YOUR ESTIMATED ANNUAL WASTE
            </p>
            <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
              ${fmt(totalWaste)}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              in time and tool costs lost to manual work every year
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Manual Labor Cost/Year</p>
                <p className="text-xl font-bold">${fmt(laborCost)}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Fragmented Tool Cost/Year</p>
                <p className="text-xl font-bold">${fmt(toolCost)}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Hours Wasted/Year</p>
                <p className="text-xl font-bold">{fmt(hoursWasted)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
