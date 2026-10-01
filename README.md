# Bitcoin Baltics

An open-source Bitcoin map, events calendar and community directory for Estonia, Latvia and Lithuania. Built from [Lithuania BTC](https://github.com/mariusoffchain/lithuania-btc), with its own regional identity, photos and content.

Live site: https://bitcoinbaltics.com · Contact: contact@bitcoinbaltics.com

## Run locally

Requires Node.js 22+ and Python 3.

```sh
npm ci
npm run build:baltics
npm run preview:baltics
```

Open http://127.0.0.1:8775/. Serve `public-baltics/`, never the repository root. Generated output is not committed.

## Validate

```sh
npm run build
npm run build:baltics
npm test
npm run deploy:check
```

The default build retains the upstream Lithuanian profile for shared-engine tests. The Baltic production build is explicitly `build:baltics`.

## Publish

```sh
npx wrangler login
npm run build:baltics
npm run deploy
```

`wrangler.baltics.jsonc` targets the Bitcoin Baltics Worker and both custom domains. `worker.mjs` redirects www to the canonical domain, preserving paths and query parameters, then serves static assets. GitHub holds source code; publishing to Cloudflare is a separate step, not an automatic consequence of pushing.

For a fork, replace the Worker name and domains in `wrangler.baltics.jsonc`, update the hostname in `worker.mjs`, and use your own Cloudflare account. No API credentials are stored in this repository. The legacy `wrangler.jsonc` belongs to the upstream Lithuanian profile; do not use it to deploy a fork.

## Content and adaptation

- `profiles/baltics/config.json` — brand, domain, repository, email, map bounds and country filters.
- `profiles/baltics/events.json`, `site.json`, `about.json` — regional events, community links, photos and About text.
- `data/` — shared Lithuanian events and community content merged into the regional edition at build time.
- `profiles/baltics/identity.css`, `identity.js`, SVGs and fonts — regional visual identity.
- `profiles/baltics/merchants-snapshot.json` — fallback BTC Map data. Run `npm run refresh:baltics` to update, review changes, rebuild and deploy.
- `profiles/baltics/sources.md` and `ASSETS.md` — source provenance and media notes.

Events are manually curated. Use `status: "planned"` with no dates for an unconfirmed upcoming event. Add verified dates and location when announced. Public listings do not imply partnerships.

See [FORKING.md](FORKING.md) for the shared engine. Its Lithuanian examples need adapting to the regional profile.

## PWA, SEO and machine-readable content

The installable PWA caches the app and previously viewed map resources; it does not download an entire offline map. Browser storage can be evicted and merchant data can become stale. There are no push notifications.

Builds generate social metadata, sitemap.xml, robots.txt, llms.txt and Markdown resources under `/read/`. The share image is `profiles/baltics/baltics-share.jpg`. Rebuild after content changes.

## License

Code is [MIT](LICENSE), preserving the upstream copyright. Fonts, map data, photos and third-party logos have separate terms. See [THIRD_PARTY.md](THIRD_PARTY.md) and [Baltic asset notes](profiles/baltics/ASSETS.md). A code fork does not grant rights to reuse third-party media.
