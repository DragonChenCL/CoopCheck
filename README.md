# CoopCheck

CoopCheck is a zero-cost GitHub Pages MVP for checking backyard chicken rules and planning a coop setback layout.

## V1 scope
- City-by-city official backyard chicken rules
- Manual rectangular lot + house layout
- Visual setback planner
- Printable site-plan style report
- SEO city pages, sitemap, robots.txt, structured data
- GitHub Actions deployment to GitHub Pages

> Informational only. Always verify current city/county code, zoning, permits, and HOA/CC&R restrictions before building or keeping poultry.

## Mapbox runtime configuration
The GitHub Pages workflow injects the repository secret `MAPBOX_TOKEN` into `site/assets/runtime-config.js` during deployment. The token is not stored in source control.

## Policy data workflow

City policy facts are maintained in `site/data/cities.json` as the canonical audited registry. Do not hand-edit `site/assets/data.js`; regenerate it with:

```bash
node scripts/generate-policy-data.cjs
```

Before deployment, CI verifies the registry, generated browser data, official-source coverage, city-page verification dates, and policy regression guards. See `POLICY_AUDIT.md` for the latest 18-city audit.

## First 100-city coverage batch

The registry now tracks **100 cities**. The first 82 additions are separated into reviewed government-source profiles and research-pending profiles. Pending city pages display an explicit warning, are marked `noindex,follow`, and are **not** included in `sitemap.xml` or the planner's rule selector. Do not imply that 100 city rules have all been verified.

To regenerate the browser data, city pages, directory and sitemap after changing `site/data/cities.json`:

```bash
node scripts/generate-policy-data.cjs
node scripts/generate-coverage-pages.cjs
node scripts/qa-coopcheck.cjs
```

CI checks both generators with `--check` and runs the QA suite before deployment. Start with `site/coverage.html` for the rollout status.

## 2026-10-13 all-city official-source audit

An official-source search and review was carried out for all 100 city profiles. As recorded in [POLICY_AUDIT_2026-10-13.md](POLICY_AUDIT_2026-10-13.md), **40** summaries are verified, **30** are verified only for specific supported claims, and **30** still require current city-specific authority or a municipal planning response. Pending rows remain `noindex` and out of the sitemap and planner; none are fabricated to meet SEO page-count targets.
