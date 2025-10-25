# Modernization Roadmap

## Iteration 0 – Baseline & Planning (Week 0)
- Capture current-state audit (performance, a11y, SEO).
- Document design principles, tokens, and component priorities.
- Acceptance: audit report committed; roadmap reviewed; docs folder scaffolded.

## Iteration 1 – Design System & Shell (Week 1)
- Implement tokens, theming, typography, spacing scale.
- Build global layout: header, footer, navigation, skip links, theme toggle.
- Acceptance: dual theme toggle persists; layout responsive across breakpoints; contrast AA verified on top-level surfaces.

## Iteration 2 – Core Pages Refresh (Week 2)
- Home: hero, features, marquee, flow demo, testimonials, CTA.
- Pricing: tier cards, billing toggle, FAQ.
- Docs shell: sidebar, sticky TOC, content area, search stub.
- Acceptance: Lighthouse desktop = 90 perf / 95 a11y / 90 SEO for Home; Pricing/Docs render without console errors; flow demo interactive on desktop & touch.

## Iteration 3 – Content Extensions (Week 3)
- Changelog and Blog index/detail templating.
- 404 page and routing safeguards.
- Populate meta tags, social cards, schema.org data.
- Acceptance: sitemap & robots updated; OG/Twitter previews validated; 404 accessible via manual route.

## Iteration 4 – Motion & Quality (Week 4)
- Introduce micro-interactions with prefers-reduced-motion fallbacks.
- Optimize assets (lazy loading, WebP/AVIF), tree-shake CSS.
- Integrate tests: lint, type-check, Playwright smoke; Lighthouse CI pipeline.
- Acceptance: CI pipeline green; Lighthouse desktop (Home) = 92/96/92 Perf/A11y/SEO; motion disables when prefers-reduced-motion set.

## Definition of Done Snapshot
- Branch eat/modern-refactor-n8n-style merged via PR with detailed summary and captures.
- Docs updated (udit-initial.md, design-system.md, changelog.md, modernization-roadmap.md).
- Preview deployment linked.
- CI runs (build, lint, tests, lighthouse) pass.
