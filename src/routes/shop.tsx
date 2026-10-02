import { createFileRoute, redirect } from "@tanstack/react-router";

// The Shop page was merged into the Catalogue; /shop redirects there.
export const Route = createFileRoute("/shop")({
  beforeLoad: () => {
    throw redirect({ to: "/catalogue", replace: true });
  },
});
