<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- LOVABLE:BEGIN-PROJECT -->
> [!IMPORTANT]
> Location maps use the Lovable-managed Google Maps connection via the Maps
> Embed API, with the browser key from
> `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`, rather than another map
> provider — the managed key needs no user setup. That key is restricted to
> `*.lovable.app` and `*.lovableproject.com` referrers, so an embedded map
> cannot render on the local dev server; check map behaviour on a deployed
> preview origin instead of chasing referrer errors.
<!-- LOVABLE:END-PROJECT -->
