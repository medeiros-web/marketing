import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SECRET ?? "fallback_secret";
  if (session !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [campaignsRes, decisionsRes] = await Promise.all([
    supabase.from("campaigns").select("*").order("updated_at", { ascending: false }),
    supabase.from("campaign_decisions").select("*").order("created_at", { ascending: false }).limit(50),
  ]);

  return NextResponse.json({
    ok: true,
    campaigns: campaignsRes.data ?? [],
    decisions: decisionsRes.data ?? [],
  });
}
