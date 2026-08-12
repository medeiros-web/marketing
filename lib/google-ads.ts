const TOKEN_URL = "https://oauth2.googleapis.com/token";
const ADS_API = "https://googleads.googleapis.com/v17";

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Falha ao obter access token Google Ads");
  return data.access_token;
}

export async function getCampaigns() {
  const token = await getAccessToken();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
  const res = await fetch(`${ADS_API}/customers/${customerId}/googleAds:searchStream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `SELECT campaign.id, campaign.name, campaign.status,
                     campaign_budget.amount_micros,
                     metrics.clicks, metrics.impressions, metrics.cost_micros,
                     metrics.ctr, metrics.average_cpc
              FROM campaign
              WHERE campaign.status != 'REMOVED'
              ORDER BY campaign.id`,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google Ads API error: ${err}`);
  }
  return res.json();
}

export async function pauseCampaign(campaignId: string) {
  const token = await getAccessToken();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
  const res = await fetch(`${ADS_API}/customers/${customerId}/campaigns:mutate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operations: [{ update: { resourceName: `customers/${customerId}/campaigns/${campaignId}`, status: "PAUSED" }, updateMask: "status" }],
    }),
  });
  return res.json();
}

export async function updateBudget(budgetId: string, amountMicros: number) {
  const token = await getAccessToken();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
  const res = await fetch(`${ADS_API}/customers/${customerId}/campaignBudgets:mutate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operations: [{ update: { resourceName: `customers/${customerId}/campaignBudgets/${budgetId}`, amountMicros }, updateMask: "amount_micros" }],
    }),
  });
  return res.json();
}
