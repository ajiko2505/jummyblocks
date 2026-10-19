const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

function headers() {
  const a = process.env["LOVABLE_API_KEY"];
  const b = process.env["GOOGLE_CALENDAR_API_KEY"];
  if (!a || !b) throw new Error("Google Calendar is not configured");
  return { Authorization: `Bearer ${a}`, "X-Connection-Api-Key": b, "Content-Type": "application/json" };
}

export async function calFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${GATEWAY_URL}${path}`, { ...init, headers: headers() });
  const body = await res.text();
  if (!res.ok) {
    console.error(`Calendar request failed [${res.status}]: ${body}`);
    throw new Error(`Calendar request failed [${res.status}]`);
  }
  return JSON.parse(body);
}

export async function getBusy(timeMin: string, timeMax: string): Promise<{ start: string; end: string }[]> {
  const data = await calFetch("/freeBusy", {
    method: "POST",
    body: JSON.stringify({ timeMin, timeMax, items: [{ id: "primary" }] }),
  });
  return data.calendars?.primary?.busy ?? [];
}
