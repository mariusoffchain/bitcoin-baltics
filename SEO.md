# Search and sharing

This repository builds two profiles. The default profile is the upstream Lithuania BTC code; its search notes live in the `lithuania-btc` repository. This file covers the Bitcoin Baltics profile (`SITE_PROFILE=baltics`), published at https://bitcoinbaltics.com/.

## Implemented

- The site is English only. `/` and `/about/` are the canonical pages. `/en/` and `/en/about/` remain compatible aliases whose canonical URLs point to `/` and `/about/`. No `hreflang` alternatives are published.
- The home page has one visually hidden H1 matching the page title, and the build prerenders the event list with the application's own classes. Crawlers that do not run JavaScript, and visitors without it, read events from all three countries; `atlas-app.js` replaces the list once its data loads.
- `/about/` contains descriptive HTML at build time, including headings and ordinary links, without depending on the map application.
- Title, description, canonical URL and WebSite/AboutPage JSON-LD describe the real site, taken from `profiles/baltics/config.json` and `profiles/baltics/about.json`. No invented reviews or business identity.
- `/sitemap.xml` lists the 2 canonical pages. `/robots.txt` advertises it. `/llms.txt` and its linked files give a dated reading guide.
- `worker.mjs` permanently redirects `www` and `http://` to `https://bitcoinbaltics.com/`, preserving paths and queries.
- Open Graph and Twitter large-image cards use `assets/baltics-share.jpg`, 1200 × 630.

These changes help describe and discover the site; they do not guarantee indexing, ranking or the exact snippet Google chooses.

## Next actions

1. **Search Console, site owner.** Use the domain property `bitcoinbaltics.com`, submit `https://bitcoinbaltics.com/sitemap.xml` and inspect `/` and `/about/` after each structural change. Search Console is managed outside this repository.
2. **Useful ongoing content.** Add verified upcoming events in `profiles/baltics/events.json`, refresh the merchant snapshot with `npm run refresh:baltics` and publish community photos with permission. Do not create repetitive keyword pages or false future events.
3. **Next development increment.** Generate a stable HTML detail URL per event, with its own title, description, share image and accurate Event structured data. The current `?event=` modal links are usable by visitors but still share the home page's server metadata. Do not claim individual event SEO is implemented.
4. **Review performance.** After Google has crawled the pages, compare impressions and clicks for queries such as “Bitcoin Baltics”, “Bitcoin Riga”, “Bitcoin Tallinn” and “Bitcoin Vilnius”. Check index coverage and selected canonical URLs.

## Edit and rebuild

- Title, description, tagline and countries: `profiles/baltics/config.json`.
- Descriptive copy: `profiles/baltics/about.json`.
- Regional events, initiatives and gallery: `profiles/baltics/events.json`, `profiles/baltics/site.json`, `profiles/baltics/gallery-optimized.json`.
- Metadata, sitemap and robots: `scripts/build-release.mjs`. Prerendered H1 and event list: `scripts/home-crawlable.mjs`.
- Run `npm test`, `npm run build:baltics`, review desktop and mobile, then `npm run deploy` with the `lithuania-btc` Cloudflare profile. Tests verify metadata, the H1, prerendered events from several countries, redirects and the offline shell.

Social platforms cache previews independently; already shared URLs may need a re-scrape through the platform's sharing debugger.

## References

- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: site names](https://developers.google.com/search/docs/appearance/site-names)
