# Search and sharing

This repository builds two profiles. The default profile is the upstream Lithuania BTC code; its search notes live in the `lithuania-btc` repository. This file covers the Bitcoin Baltics profile (`SITE_PROFILE=baltics`), published at https://bitcoinbaltics.com/.

## Implemented

- The site is English only. `/` and `/about/` are the canonical pages. `/en/` and `/en/about/` remain compatible aliases whose canonical URLs point to `/` and `/about/`. No `hreflang` alternatives are published.
- The home page has one visually hidden H1 matching the page title, and the build prerenders the event list with the application's own classes. Crawlers that do not run JavaScript, and visitors without it, read events from all three countries; `atlas-app.js` replaces the list once its data loads.
- `/about/` contains descriptive HTML at build time, including headings and ordinary links, without depending on the map application.
- Title, description, canonical URL and WebSite/AboutPage JSON-LD describe the real site, taken from `profiles/baltics/config.json` and `profiles/baltics/about.json`. No invented reviews or business identity.
- Every dated event has its own page, `/events/<id>/`, with one H1, the date, venue, address, country, organiser, description, official links and image. Planned events without a date have no page. Event cards on the home page link to these pages; a plain click still opens the modal, and its “Copy link” shares the page URL.
- Regional events (`profiles/baltics/events.json`) are published here: their pages carry Event JSON-LD and appear in the sitemap. The copies on cryptobaltics.org and cypherbaltics.org point their canonical here.
- Lithuanian events come from Lithuania BTC: their pages here point their canonical to `https://lithuaniabtc.com/en/events/<id>/` and carry no Event JSON-LD, so search engines see one event, not several.
- `/sitemap.xml` lists the 2 canonical pages and the regional event pages. `/robots.txt` advertises it. `/llms.txt` and its linked files give a dated reading guide.
- `worker.mjs` permanently redirects `www` and `http://` to `https://bitcoinbaltics.com/`, preserving paths and queries.
- Open Graph and Twitter large-image cards use `assets/baltics-share.jpg`, 1200 × 630.

These changes help describe and discover the site; they do not guarantee indexing, ranking or the exact snippet Google chooses.

## Next actions

1. **Search Console, site owner.** Use the domain property `bitcoinbaltics.com`, submit `https://bitcoinbaltics.com/sitemap.xml` and inspect `/` and `/about/` after each structural change. Search Console is managed outside this repository.
2. **Useful ongoing content.** Add verified upcoming events in `profiles/baltics/events.json`, refresh the merchant snapshot with `npm run refresh:baltics` and publish community photos with permission. Do not create repetitive keyword pages or false future events.
3. **Event results.** After Google has crawled the event pages, check them with the Rich Results Test and in Search Console. Prices and ticket availability are not published because they are not in the data. Keep event ids stable, and publish a Lithuanian event on lithuaniabtc.com first, since the copy here points there.
4. **Review performance.** After Google has crawled the pages, compare impressions and clicks for queries such as “Bitcoin Baltics”, “Bitcoin Riga”, “Bitcoin Tallinn” and “Bitcoin Vilnius”. Check index coverage and selected canonical URLs.

## Edit and rebuild

- Title, description, tagline and countries: `profiles/baltics/config.json`.
- Descriptive copy: `profiles/baltics/about.json`.
- Regional events, initiatives and gallery: `profiles/baltics/events.json`, `profiles/baltics/site.json`, `profiles/baltics/gallery-optimized.json`.
- Metadata, sitemap and robots: `scripts/build-release.mjs`. Prerendered H1 and event list: `scripts/home-crawlable.mjs`.
- Event pages: `scripts/event-page.mjs` (layout, derived from the About page) and `scripts/event-data.mjs` (facts and Event JSON-LD, the same file in all four Baltic site repositories).
- Run `npm test`, `npm run build:baltics`, review desktop and mobile, then `npm run deploy` with the `lithuania-btc` Cloudflare profile. Tests verify metadata, the H1, prerendered events from several countries, event pages with their canonical URLs and Event data, redirects and the offline shell.

Social platforms cache previews independently; already shared URLs may need a re-scrape through the platform's sharing debugger.

## References

- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: site names](https://developers.google.com/search/docs/appearance/site-names)
- [Google: Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event)
