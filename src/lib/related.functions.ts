import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { products } from "@/lib/products";

export type RelatedPick = { id: string; reason: string };

// AI-picked "You may also like" products. Only ids from the catalogue are returned.
export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ id: z.string().min(1).max(60) }).parse(d))
  .handler(async ({ data }): Promise<{ picks: RelatedPick[]; error?: string }> => {
    const current = products.find((p) => p.id === data.id);
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!current || !apiKey) return { picks: [], error: "unavailable" };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const { createLovableAiGatewayRunIdFetch } = await import("@/lib/run-id.server");
    const catalogue = products
      .filter((p) => p.id !== current.id)
      .map((p) => `id=${p.id} | ${p.name} | ${p.category} | ${p.bestFor} | ${p.traffic}`)
      .join("\n");
    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system: `You recommend complementary products for a Nigerian construction materials shop. Pick exactly 3 products from this catalogue that a buyer of the given product would also need on the same job (e.g. kerbs to edge interlocks, drains for estate roads). Only use ids from the list.\n${catalogue}\n\nOutput exactly 3 lines, nothing else:\n<id> | <reason, max 12 words>`,
        prompt: `Product: ${current.name} (${current.category}), used for ${current.bestFor}.`,
        providerOptions: {
          openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] },
        },
      });
      const text = await result.text;
      const valid = new Set(products.map((p) => p.id));
      const picks: RelatedPick[] = [];
      for (const line of text.split("\n")) {
        const [rawId, ...rest] = line.split("|");
        const id = rawId?.trim().replace(/^id=/, "");
        if (id && valid.has(id) && id !== current.id && !picks.some((p) => p.id === id)) picks.push({ id, reason: rest.join("|").trim() });
      }
      return { picks: picks.slice(0, 3) };
    } catch (e) {
      console.error("related products AI failed", e);
      return { picks: [], error: "unavailable" };
    }
  });
