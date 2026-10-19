// Posts lead notifications to the owner's Slack channel (#all-jummy-blocks).
const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";
const LEADS_CHANNEL = "C0CB87FEKA4";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function postLeadToSlack(title: string, fields: Record<string, string | undefined | null>) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const slackKey = process.env["SLACK_API_KEY"];
  if (!lovableKey || !slackKey) {
    console.error("Slack lead notification skipped: credentials missing");
    return;
  }
  const lines = Object.entries(fields)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `*${k}:* ${esc(String(v))}`);
  const text = `:bricks: *${esc(title)}*\n${lines.join("\n")}`;
  try {
    const res = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": slackKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel: LEADS_CHANNEL, text, unfurl_links: false }),
    });
    const body = await res.text();
    if (!res.ok || !JSON.parse(body).ok) console.error(`Slack post failed [${res.status}]: ${body}`);
  } catch (e) {
    console.error("Slack post error", e);
  }
}
