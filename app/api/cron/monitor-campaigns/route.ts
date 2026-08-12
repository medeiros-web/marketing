import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret") ?? req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: campaigns, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("status", "ACTIVE");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const decisions: Array<{ campaign_id: string; action: string; reason: string; old_value?: number; new_value?: number }> = [];

  for (const c of campaigns ?? []) {
    // Scale budget: CPC < 0.50 AND CTR > 2.5%
    if (c.cpc !== null && c.ctr !== null && c.cpc < 0.5 && c.ctr > 2.5) {
      const newBudget = +(c.budget * 1.3).toFixed(2);
      await supabase.from("campaigns").update({ budget: newBudget, updated_at: new Date().toISOString() }).eq("id", c.id);
      decisions.push({ campaign_id: c.id, action: "SCALE_BUDGET", reason: `CPC ${c.cpc} < 0.50 e CTR ${c.ctr}% > 2.5%`, old_value: c.budget, new_value: newBudget });
    }

    // Pause: CTR < 1% for 48h — approximate via low CTR + high impressions
    if (c.ctr !== null && c.ctr < 1 && c.impressions > 1000) {
      await supabase.from("campaigns").update({ status: "PAUSED", updated_at: new Date().toISOString() }).eq("id", c.id);
      decisions.push({ campaign_id: c.id, action: "PAUSE", reason: `CTR ${c.ctr}% < 1% com ${c.impressions} impressões` });
    }

    // Refresh creative: frequency > 3
    if (c.frequency !== null && c.frequency > 3) {
      decisions.push({ campaign_id: c.id, action: "REFRESH_CREATIVE", reason: `Frequência ${c.frequency} > 3` });
    }

    // Alert: budget almost exhausted (80%)
    if (c.spend !== null && c.budget !== null && c.spend >= c.budget * 0.8) {
      decisions.push({ campaign_id: c.id, action: "BUDGET_ALERT", reason: `Gasto R$${c.spend} atingiu 80% do budget R$${c.budget}` });
    }
  }

  if (decisions.length > 0) {
    await supabase.from("campaign_decisions").insert(decisions);
  }

  // Heartbeat: upsert system status
  await supabase.from("campaign_decisions").insert([{
    campaign_id: null,
    action: "CRON_HEARTBEAT",
    reason: `Monitor rodou em ${new Date().toISOString()} — ${(campaigns ?? []).length} campanhas ativas, ${decisions.length} decisões`,
  }]).select();

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    campaigns_checked: (campaigns ?? []).length,
    decisions,
  });
}
