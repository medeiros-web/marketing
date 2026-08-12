import { NextRequest, NextResponse } from "next/server";
import { getCampaigns } from "@/lib/google-ads";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SECRET ?? "fallback_secret";
  if (session !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getCampaigns();
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
