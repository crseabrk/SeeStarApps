# Changelog

## 2026-10-20 — Photometry audience and scope

- Recorded the accessible session-analysis promise, intended audience, scientific limits and specialist-tool handoff in `photometry/PRODUCT-SCOPE.md`.
- Distinguished current named-log imports from planned targeted session diagnostics and general field scanning; documented stable star identity, overlap reconciliation and read-only browser processing requirements.
- Linked the scope from the user guide, architecture, contributor guidance and AI instructions so future changes restate their evidence and limits. Documentation only; no new analyzer capability or scientific validation is claimed. Prepared with OpenAI Codex assistance.

This is a human-readable history of SeeStarApps. Dates are calendar dates in Europe/Berlin. Git commits are the authoritative source history; entries below do not invent version tags or separate commits for development that was published together. Future changes should add a dated entry describing behavior, validation, and any URL/schema changes.

## 2026-10-20 — Safari/macOS compatibility review

- Added an owner-required cross-environment test matrix and persistent Codex handoff instructions. Unavailable platform checks must be documented and the owner directed to the appropriate device/session.

- Use system font fallbacks in the page, canvas charts, and exported reports so macOS does not depend on Segoe UI.
- Replace the hidden file input's label with a native keyboard-operable button, opening the picker directly from the user gesture.
- Resume one-finger panning when a second finger leaves a pinch; retain download links with their Blob URLs until delayed cleanup.
- Calculate the unchanged median-line cadence/gap threshold once per redraw instead of once per bin, reducing repeated sorting during trackpad interaction. Scientific formulas, gap criteria, and export schemas remain unchanged.
- Added `tests/browser-compat.cjs` for picker activation, pinch-to-pan/cancellation, and download lifecycle. Smoke, analysis, and compatibility checks passed; analysis also passed under America/Los_Angeles and smoke under Europe/Berlin.
- Recovered the cloud edits on macOS and completed native Safari 27.0.1 checks for local/HTTPS import equivalence, rendering, filtering and real CSV/PNG/HTML downloads. All 73 synthetic-data bin counts and medians match the morning baseline. See `photometry/VALIDATION.md` for exact coverage, native input automation limits, and untested Finder/iCloud/print/touch behavior. OpenAI Codex assisted; private observation checks were not rerun.

## 2026-10-20 — Maintainer documentation

### Added

- Architecture and data-model guide, function comments, and readable source formatting.
- Repository-wide `AGENTS.md` guidance for future AI-assisted changes.
- Developer test instructions, review checklist, and explicit known limitations.
- This changelog, reconstructed from the public commits and the original development session.

### Validation

- Executable-token comparison preserved all 9,688 JavaScript tokens; only comments/formatting changed in the runtime script.
- `node tests/smoke.cjs`, `node tests/analysis.cjs`, and optional real-data checks against the two original local CSVs passed. No scientific-method change is intended.

## 2026-10-20 — Collection layout

Source: [cf3bfb5](https://github.com/crseabrk/SeeStarApps/commit/cf3bfb51d9dbb7a45d90e16fd0205229726ba46d).

### Changed

- Root `/SeeStarApps/` is a multi-project directory with Photometry as its first entry.
- Photometry overview, app, sample CSV, preview, and project documentation moved to `/photometry/`.
- Current tool URL: `/SeeStarApps/photometry/analyzer/`.
- Removed the earlier `/analyzer/` route, as requested before external publication. Update older bookmarks/embeds to the current URL.
- Added instructions for contributing future projects and verified hub → project → analyzer → project → hub navigation after deployment.

## 2026-10-20 — Project overview

Source: [ca18b94](https://github.com/crseabrk/SeeStarApps/commit/ca18b9432ffc8fbe5dcf1a691074f50db40e0eec).

- Added a project introduction, synthetic light-curve preview, downloads, GitHub/fork links, and AI disclosure.
- Initially separated the root overview from the tool at `/analyzer/`; superseded by the collection layout above.
- GitHub Pages enabled on `main`, repository root. The deployed tool imported all 1,081 synthetic rows in a live browser and displayed its chart and screening summary. This was a targeted browser check, not complete cross-browser QA.

## 2026-10-20 — Initial public implementation

Sources: [README initialization](https://github.com/crseabrk/SeeStarApps/commit/0ff20a44286de55ea2ca3692545f040c2c0c35f5), [application](https://github.com/crseabrk/SeeStarApps/commit/a0186a4f53b4560f67c23a84b61d4e4a30a49fa6), [synthetic CSV](https://github.com/crseabrk/SeeStarApps/commit/33dd546c27146b3425dd2ef887de49fb4fd8f20a).

### Added

- Standalone HTML/CSS/vanilla-JavaScript analyzer: no runtime dependencies or backend.
- BOM/quoted CSV import, exact target separation, JD chronology, preserved recorded clock times, midnight handling, and clock-aligned 1/2/5/10/15-minute bins.
- Interactive inverted-magnitude chart, median line, individual points, optional error bars, movement markers, zoom/pan/reset, and tooltips.
- Observation summary, sensor-coordinate diagnostics, optional quality filtering, and non-destructive import state.
- Replace session (default) and Add to session modes; repeated identical-file suppression. This distinction was developed before the first public code commit, not in a separate release.
- Five palettes: Starlight, Midnight Nebula, Mars Watch, Event Horizon, Aurora Borealis.
- Conservative sustained-trend screening and subtle candidate shading, with explicit scientific limitations.
- Locally generated PNG, processed CSV, printable report, and deterministic synthetic eclipse example (1,081 rows, six hours, 0.65-mag model depth).
- MIT license, contribution guide, AI-development disclosure, and initial portable smoke test.

### Validation

- RT And: 1,243 valid rows. Five-minute reference bins: 23:45 → 40 rows, median 8.7609725; 00:20 → 46 rows, median 8.3304125.
- SS And: seven valid rows, 60-second exposures.
- Additional development checks used synthetic fixtures and a simulated DOM/canvas. Original real observation files are not redistributed; see [validation record](photometry/VALIDATION.md).
- Initial `file:` browser automation was blocked. Later HTTPS deployment received the targeted live-browser check recorded above.
