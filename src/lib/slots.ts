// Booking rules: Mon–Sat, 8am–5pm Lagos time (UTC+1, no daylight saving), 1-hour slots.
export const LAGOS_OFFSET_HOURS = 1;
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 17;

export type Busy = { start: string; end: string };

/** All candidate slot start times (ISO, UTC) for the next `days` days, future-only. */
export function candidateSlots(now: Date, days = 14): string[] {
  const out: string[] = [];
  const lagosNow = new Date(now.getTime() + LAGOS_OFFSET_HOURS * 3600_000);
  for (let d = 0; d < days; d++) {
    const day = new Date(Date.UTC(lagosNow.getUTCFullYear(), lagosNow.getUTCMonth(), lagosNow.getUTCDate() + d));
    if (day.getUTCDay() === 0) continue; // Sunday closed
    for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
      const start = new Date(day.getTime() + (h - LAGOS_OFFSET_HOURS) * 3600_000);
      if (start.getTime() > now.getTime() + 3600_000) out.push(start.toISOString());
    }
  }
  return out;
}

export function isFree(startIso: string, busy: Busy[]): boolean {
  const s = new Date(startIso).getTime();
  const e = s + 3600_000;
  return !busy.some((b) => new Date(b.start).getTime() < e && new Date(b.end).getTime() > s);
}

export function isValidSlot(startIso: string, now: Date): boolean {
  return candidateSlots(now).includes(new Date(startIso).toISOString());
}
