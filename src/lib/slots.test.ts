import { describe, it, expect } from "vitest";
import { candidateSlots, isFree } from "./slots";

// Monday 19 Oct 2026, 06:00 Lagos (05:00 UTC)
const now = new Date("2026-10-19T05:00:00Z");

describe("booking slots", () => {
  it("first slot is 8am Lagos (07:00 UTC)", () => {
    expect(candidateSlots(now)[0]).toBe("2026-10-19T07:00:00.000Z");
  });
  it("last slot of the day starts at 4pm Lagos", () => {
    expect(candidateSlots(now)).toContain("2026-10-19T15:00:00.000Z");
    expect(candidateSlots(now)).not.toContain("2026-10-19T16:00:00.000Z");
  });
  it("no slots on Sunday", () => {
    expect(candidateSlots(now).some((s) => s.startsWith("2026-10-25"))).toBe(false);
  });
  it("busy time blocks the slot", () => {
    expect(isFree("2026-10-19T09:00:00.000Z", [{ start: "2026-10-19T09:30:00Z", end: "2026-10-19T10:00:00Z" }])).toBe(false);
  });
});
