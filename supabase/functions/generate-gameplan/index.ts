import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are AIZEN's AI strategist. You analyze businesses and create detailed, actionable AI transformation gameplans.

Given the business data below, generate a comprehensive AI Gameplan with these sections:

1. **Executive Summary** — 2-3 sentence overview of the opportunity
2. **Current State Analysis** — What's working, what's broken, key bottlenecks identified
3. **AI Automation Opportunities** — 3-5 specific processes that can be automated with AI, each with:
   - Process name
   - Current pain point
   - Proposed AI solution
   - Estimated time savings per week
4. **Recommended AI OS Architecture** — High-level system design connecting their tools with AI agents
5. **Implementation Roadmap** — 3 phases (Quick Wins in Week 1-2, Core Systems in Month 1-2, Advanced in Month 3+)
6. **Projected ROI** — Conservative estimates based on their revenue and manual hours
7. **Next Steps** — Clear call to action to book a strategy call with AIZEN

Be specific to their industry, tools, and bottlenecks. Use concrete numbers. Be bold but realistic.
Format in clean markdown.`;

    const userPrompt = `Here is the business data:

- **Industry**: ${answers.industry}
- **Team Size**: ${answers.teamSize}
- **Operations**: ${answers.operations}
- **Team Structure & Bottleneck**: ${answers.teamStructure}
- **Manual Hours/Week**: ${answers.manualHours}
- **#1 Manual Task**: ${answers.manualTask}
- **Current Tools**: ${answers.tools}
- **Monthly Tool Spend**: ${answers.toolSpend}
- **Annual Revenue**: ${answers.revenue}
- **Email**: ${answers.email}

Generate their custom AI Gameplan now.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-gameplan error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
