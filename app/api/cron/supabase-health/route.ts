import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret") ?? req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checks: Record<string, string> = {};

  // Verifica cada tabela crítica
  for (const table of ["campaigns", "campaign_decisions", "criativos"]) {
    const { error } = await supabase.from(table).select("id").limit(1);
    checks[table] = error ? `ERRO: ${error.message}` : "OK";
  }

  // Recria tabelas se necessário
  const allOk = Object.values(checks).every(v => v === "OK");

  return NextResponse.json({
    ok: allOk,
    timestamp: new Date().toISOString(),
    tables: checks,
  });
}
