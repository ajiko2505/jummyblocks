import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
import { products } from "@/lib/products";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/run-id.server";

const Body = z.object({ requirements: z.string().trim().min(5).max(2000) });

export const Route = createFileRoute("/api/recommend")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Please describe your project in a few words." }, { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

        const catalogue = products
          .map((p) => `id=${p.id} | ${p.name} | ${p.category} | size ${p.size} | strength ${p.strength} | weight ${p.weight} | absorption ${p.absorption} | traffic ${p.traffic} | best for ${p.bestFor} | ${p.price}/${p.unit}`)
          .join("\n");

        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });

        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          abortSignal: request.signal,
          system: `You are a Nigerian construction materials advisor for Jummy Blocks. Recommend 1-3 products ONLY from this catalogue:\n${catalogue}\n\nOutput format, nothing else:\nPRODUCT: <id> | <one or two sentence reason tied to the user's needs, mentioning a spec>\n(repeat per product, best first)\nTIP: <one practical installation or buying tip>\nIf nothing fits, output only TIP: explaining what to ask a supplier.`,
          prompt: parsed.data.requirements,
          providerOptions: {
            openai: {
              store: false,
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            },
          },
        });

        return withLovableAiGatewayRunIdHeader(result.toTextStreamResponse(), runIdFetch);
      },
    },
  },
});
