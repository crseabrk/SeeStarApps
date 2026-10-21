# Changelog

## 2026-10-21 — Lighter thumbnails and gallery visibility controls

- Group thumbnail markers into one SVG path, retain compact numerical bins and remove duplicate per-track SVG string caches. All curve points, median/ranking values and gap rules are preserved.
- Add collapse at the gallery bottom, optional close-on-selection (initially enabled) and a synchronized Open/Close control above the main chart. Back to gallery still restores the selected tile.
- Nine suites pass; synthetic before/after comparison confirms identical numerical summaries, curve paths and marker centres with materially less markup. Native heap and pixel verification remain pending. OpenAI Codex assisted.


## 2026-10-21 — Complete project introduction

- Expand the project overview and collection card to cover target/session workflows, provisional field tracks, gallery controls, diagnostics, explicit ASTAP/SIMBAD lookup, exports, remembered folders and return navigation.
- Align the four-step introduction with the analyzer and explain scientific/browser/persistence limits. Retain the fictional demo as a separate starting option. Static content only; no analyzer or algorithm changes. OpenAI Codex assisted.


## 2026-10-21 — Workflow guidance and gallery navigation

- Number the log, folder scan, gallery and main-curve steps; place target selection with import and explain the rescan required after log changes.
- Make the gallery collapsible and add Back to gallery plus Back to top controls. Return to the selected tile when possible and respect reduced-motion preferences. No measurement/matching/ranking formulas changed.
- Nine suites pass, including new navigation/state assertions in the gallery suite; native layout/keyboard checks remain pending. OpenAI Codex assisted.


## 2026-10-20 — Session scans, field gallery and optional catalogue lookup

Owner-authorized integration of the locally reviewed upgrades (previews 1–8). Added read-only sequential session auditing and exact target-log reconciliation; provisional coordinate tracks with scan-local IDs; searchable/filterable on-demand curves and a miniature SVG gallery with tile sizes/scales/review sorting; explicit local ASTAP .1476 candidate lookup and SIMBAD links; remembered directory handles in browser IndexedDB with explicit reopening/forgetting.

Nine runtime regression suites passed, plus owner-held session and D80 checks. Owner reported normal-Chrome success and supplied chart/gallery/lookup screenshots. Track fragmentation, scientific interpretation and cross-session IDs remain limited; Chrome restart persistence, hosted workflow verification and other native browsers remain pending. See photometry/README.md, VALIDATION.md and tests/ENVIRONMENT-HANDOFF.md. No private inputs are committed. Substantial OpenAI Codex assistance.

Earlier entries labelled local/unpublished below preserve development chronology and are superseded by this integration entry.

## Local preview — session evidence (unpublished)

- Preview 3 adds immediate folder-read status, empty-result diagnostics and cancellable/time-limited filesystem reads after an owner-reported silent failure. Native cause remains under investigation.

- Replaced the misleading folder-upload input with feature-detected read-only directory access; unsupported browsers use multiple-CSV selection. Added folder-access regression tests.

- Added sequential, cancellable read-only CSV folder audit and file-selection fallback, exact target-log reconciliation, ambiguity/conflict reporting and provenance JSON. Unnamed rows are distinguished from invalid values; no extra light-curve points are added.
- Added synthetic regression checks and verified the complete owner-held session locally; see `photometry/SESSION-PREVIEW.md` for counts, limits and outstanding native-browser checks. Substantial OpenAI Codex assistance.

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

- Owner-held reference CSV checks passed; input-specific counts and magnitudes are retained privately.
- Additional development checks used synthetic fixtures and a simulated DOM/canvas. Original real observation files are not redistributed; see [validation record](photometry/VALIDATION.md).
- Initial `file:` browser automation was blocked. Later HTTPS deployment received the targeted live-browser check recorded above.

## Local preview 4 — coordinate tracks (unpublished)

- Added opt-in provisional coordinate associations (enabled initially), searchable/filterable star-track selector, on-demand plotting, return to original log and catalogue snapshots. Fixed scan-local IDs; no cross-session identity claim.
- Conservative one-to-one matching excludes ambiguity, skips duplicate exposures and limits retained observations. Full-folder results show substantial unresolved ambiguity; this is not a validated unique-star census or eclipse detector.
- Added synthetic association regressions and real-session checks; native preview-4 verification pending. Substantial OpenAI Codex assistance.

## Local preview 5 — light-curve gallery (unpublished)

- Added a contact sheet of actual binned curves with four tile sizes, shared/individual scales, search/count filters and click-through to the main chart.
- Cache curve summaries and SVGs. Offer review-priority, observation-count and robust-range ordering with explicit heuristic limits; no event probabilities.
- Seven regression suites pass. Native browser visual/performance checks remain pending. OpenAI Codex assisted.

## Local preview 6 — explicit local catalogue lookup (unpublished)

- Added ASTAP .1476 folder/file selection and click-only nearby-candidate lookup, using bounded reads of relevant cells. No ASTAP installation is required; database files are sufficient.
- Added a click-only SIMBAD link for the selected sky position. No background online queries, automatic catalogue identification or track renaming.
- Eight regression suites pass; actual D80 lookup agrees with an independent calculation. Native UI checks and other database variants remain pending. OpenAI Codex assisted.

## Local preview 7 — identifier links (unpublished)

- Label the selected-position SIMBAD link clearly and add per-candidate identifier lookup links after local catalogue search. Explicit clicks only; no automatic identification or remote queries. Catalogue/link regression passed; native navigation pending.

## Local preview 8 — remembered folder selections (unpublished)

- Save session/catalogue directory handles in browser IndexedDB, with explicit Reopen controls and Forget action. Use separate picker IDs for each workflow.
- Restore handles without reading files or requesting access automatically; report unavailable storage without breaking normal folder selection. No cookies or observation copies.
- Nine simulated-DOM suites passed; native Chrome persistence across reload/restart remains pending. OpenAI Codex assisted.
