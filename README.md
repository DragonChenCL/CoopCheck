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
