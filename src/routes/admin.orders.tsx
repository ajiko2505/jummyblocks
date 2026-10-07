import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/orders")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Orders — Jummy Blocks staff" },
      { name: "description", content: "Staff-only list of WhatsApp and Shopify orders." },
      { property: "og:title", content: "Orders — Jummy Blocks staff" },
      { property: "og:description", content: "Staff-only order tracking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrders,
});

const field = "w-full rounded-sm border bg-background px-3 py-2.5 text-sm";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const res = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin/orders` } });
    if (res.error) setMsg(res.error.message);
    else if (mode === "up") setMsg("Check your email to confirm your account, then sign in.");
  };
  return (
    <form onSubmit={submit} className="mx-auto mt-8 max-w-sm space-y-4">
      <label className="block text-sm font-semibold">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-1`} /></label>
      <label className="block text-sm font-semibold">Password<input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} mt-1`} /></label>
      <button className="w-full rounded-sm bg-ink py-3 font-semibold text-ink-foreground">{mode === "in" ? "Sign in" : "Create account"}</button>
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm underline">{mode === "in" ? "First time? Create your account" : "Have an account? Sign in"}</button>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </form>
  );
}

type Order = { id: string; source: string; customer_name: string; phone: string; address: string | null; notes: string | null; items: Array<{ name: string; quantity: number; unit: string }>; status: string; total: number | null; created_at: string };

function OrderList() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as Order[];
    },
  });
  const setStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["orders"] });
  };
  if (isLoading) return <p className="mt-8 text-muted-foreground">Loading…</p>;
  if (error) return <p className="mt-8 text-destructive">Couldn't load orders.</p>;
  if (!data?.length) return <p className="mt-8 text-muted-foreground">No orders yet. Your account may not have staff access — only the owner's email does.</p>;
  return (
    <div className="mt-8 space-y-3">
      {data.map((o) => (
        <div key={o.id} className="rounded-md border bg-card p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold">{o.customer_name} <span className="font-mono text-xs text-muted-foreground">· {o.phone}</span></p>
            <span className="rounded-sm border px-2 py-0.5 font-mono text-xs uppercase">{o.source}</span>
          </div>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("en-NG")}{o.address ? ` · ${o.address}` : ""}</p>
          <ul className="mt-2 list-disc pl-5">{o.items.map((i, k) => <li key={k}>{i.name} × {i.quantity} {i.unit}</li>)}</ul>
          {o.notes && <p className="mt-2 text-muted-foreground">{o.notes}</p>}
          <select aria-label="Order status" value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="mt-3 rounded-sm border bg-background px-2 py-1">
            {["new", "confirmed", "delivered", "cancelled"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}

function AdminOrders() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
      <p className="eyebrow mb-3">Staff</p>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight">Orders</h1>
        {session && <button onClick={() => supabase.auth.signOut()} className="text-sm underline">Sign out</button>}
      </div>
      {ready && (session ? <OrderList /> : <SignIn />)}
    </div>
  );
}
