# Photometry implementation guide

Read [product scope and expectations](PRODUCT-SCOPE.md) before designing changes. The original named-log pipeline and the added session/field workflows are documented below; detailed algorithms and limitations for the added features are in SESSION-PREVIEW.md.

## Start here

The editable runtime source is **`analyzer/index.html`**, relative to this folder. HTML, CSS, palettes, data processing, canvas rendering, input handlers, and export code are all embedded deliberately so the tool can open as a local file. There is no generated runtime bundle, package manifest, backend, hidden service, or separate build output. Do not edit old paths from the changelog.

Read [the user guide](README.md), [scientific validation](VALIDATION.md), [sample specification](SAMPLE-DATA.md), and [developer tests](../tests/README.md) alongside this guide.

## Collection and deployment

| Path from repository root | Responsibility |
|---|---|
| `index.html` | Static directory of available projects; manually maintained project cards/count |
| `photometry/index.html` | Static project overview and links to this tool |
| `photometry/analyzer/index.html` | Standalone application and its only essential runtime file |
| `photometry/eclipse-preview.svg` | Static preview derived from the synthetic demonstration, not live observations |
| `photometry/SIM_Eclipse_Demo.csv` | Deterministic synthetic fixture, never real observation data |
| `tests/` | Optional Node development harness; never required by visitors |
| `.nojekyll` | Serve repository files directly through GitHub Pages |

GitHub Pages deploys `main` from the repository root. The tool URL is `https://crseabrk.github.io/SeeStarApps/photometry/analyzer/`. A Blogger iframe should use that URL, not the project hub. Relative navigation supports local files and project hosting. The downloaded tool remains functional without its parent overview.

## Screenshot walkthrough

`walkthrough/index.html` is an optional standalone seven-slide companion with local JPEG assets, manifest and capture/maintenance README. The introduction links to it; it has no analyzer state, data uploads, dependencies or autoplay. All screenshots use fictional data. It is separate from the development-only stress experiment and does not change the analyzer runtime.

## Data flow

```text
File selection / drop
  → importFiles (stage valid files, choose replace/append)
  → decodeCSV → raw records (all targets)
  → selected → timeline → all (one target)
  → flagged + hide setting → kept
  → binData → binned
  → movements(all) + detectVariability(kept, binned) → annotations
  → update / renderStats / drawAll
  → PNG(current viewport), CSV(all retained bins), HTML report
```

No fetch/XHR, observation upload or external chart library is used. Optional IndexedDB stores selected directory handles only. User-clicked SIMBAD links navigate externally. Refresh clears observation/analysis state; remembered handles can survive. Browser downloads use Blob URLs; the application removes the temporary download link and revokes its Blob URL together after 30 seconds. The native file-picker button invokes the hidden input directly within the user gesture.

## Session and field workflows

`scanSession` stages an inventory/audit plus optional `fieldTracks`; accepted results replace previous scan state only after completion. `decodeCSV(..., true)` includes unnamed valid rows and keeps original field values for audit comparisons. `observationKey` identifies one exported observation using JD/RA/DEC/X/Y; it is not a permanent star identifier. Audit matches do not add points to the log.

`newTracks`/`trackFrame` use unit-sphere spatial buckets and 3-arcsecond, one-to-one, unique-candidate association. Ambiguous rows stay unassigned; new tracks start where no candidate exists. One exposure JD per frame is required; duplicate JDs and multi-exposure logs are skipped for tracking. Names do not influence matching. `plottedTrack` temporarily changes `selected()` to return copied track rows; `restoreLog()` returns to imported `raw`. Original raw records are retained. `renderTracks` filters the list; `curveSummary` caches 5-minute JD-based thumbnail bins and exploratory scores; `renderGallery` generates compact static SVG paths without retaining a second SVG string cache, and exposes every filtered track, while the dropdown shows the first 500.

`attachCatalogue` stores filenames/file handles only. Explicit `lookupLocalCatalogue` chooses .1476 cells around the current position, validates/decode headers and bounded record chunks, and reports candidates/missing coverage. `refreshLookup` updates click-only SIMBAD anchors without network requests. `folderStore` stores directory handles in IndexedDB; startup restores handles only, and `selectedFolder` requests read permission on explicit reopening. No source writes, automatic online lookup or executable launch.

See [development/algorithm record](SESSION-PREVIEW.md) for limits, heuristic ranking formula, coordinate epochs, persistence boundaries and actual verification. Those notes preserve the prototype chronology; current user-facing instructions are in README.md.

## Data model and state

Missing numerical data is `NaN` and must be handled with `Number.isFinite`; do not substitute zero. `mean`/`median` expect prefiltered finite arrays. `median` sorts a copy. Record fields:

| Field | Meaning |
|---|---|
| `name` | Exact trimmed target name, case-sensitive |
| `local` | Milliseconds encoding recorded clock components in a UTC-shaped container; not an inferred physical timezone |
| `jd` | Start JD, or MJD + 2400000.5; missing if neither is finite |
| `mag`, `err`, `snr` | Observed magnitude, reported uncertainty in mag, reported SNR |
| `x`, `y` | Reported sensor coordinates in pixels |
| `exp`, `refs` | Exposure seconds and reported reference-star count |
| `source`, `row` | Filename and logical CSV record index + 2 (not physical line number for multiline fields) |
| `t` | Derived chronology coordinate on the recorded-clock anchor scale |
| `display` | Recorded local clock when present, otherwise reconstructed display time |
| `derived` | Whether the recorded local timestamp was unavailable |

State: `raw` is decoded import data; `loaded` contains filename + NUL + full-file-text keys for repeated-file suppression. `all` is a newly derived sorted selected-target timeline; `kept` is its optional quality-filtered subset. `binned`, `motion`, `candidates` are derived results. `view` is null for automatic extents or `{x0,x1,y0,y1}` for the current chart viewport. `plot` stores the latest geometry/transforms. `busy` serializes imports. Pointer state belongs to chart interaction only.

`resetSession` clears data, filters, bins, movement threshold, default chart layers, target, tooltip, and zoom. It preserves the selected theme, import mode, and variability checkbox. Imports with no usable staged rows leave the previous session untouched. A valid replacement batch discards the previous session only after parsing succeeds. A mixed batch can contain both rejected and accepted files; accepted files replace the session and rejection messages remain visible.

## Function map

| Function(s) | Contract / side effects |
|---|---|
| `clock`, `stamp` | Parse/format explicit clock components without device timezone conversion |
| `parseCSV` | CSV state machine supporting BOM, quoted commas/newlines/escaped quotes; throws on unclosed quote |
| `decodeCSV` | Validate schema; convert optional values; count unusable rows; no UI mutation |
| `timeline` | Return copied records, anchored by first paired JD/clock record and sorted by chronology |
| `selected`, `flagged` | Read controls to select target and identify quality flags |
| `importFiles`, `resetSession` | Own import/session mutation and control reset |
| `binData` | Return occupied clock-aligned bins with N, median, mean, sample SD, mean finite SNR |
| `movements` | Detect successive available coordinate steps and local magnitude discontinuity; returns coordinates/events |
| `detectVariability` | Find qualifying monotonic runs; pure relative to its arguments |
| `variabilityText` | Describe current candidates; reads derived state |
| `update`, `renderStats` | Recompute pipeline and summary/table/warning DOM |
| `extent`, `chart`, `drawAll` | Determine ranges; draw main/diagnostic canvases; return geometry for interaction |
| `getView`, `localPoint`, `zoom` | Convert pointer position/viewport; zoom updates state and redraws |
| `download`, `slug`, `image` | Browser-local file delivery, safe filename stem, high-resolution canvas |
| `csvValue`, `processedCSV` | CSV escaping/serialization for all retained bins, regardless of zoom |
| `syntheticEclipseCSV` | Fixed-seed illustrative flux dip with noise; same text as bundled sample |
| `currentTheme`, `THEMES` | Chart palette lookup; CSS variables separately style the surrounding page |

`window.Seestar` exposes selected pure functions for the test harness and developer inspection. It is not a versioned external API. Event bindings at the end connect file inputs, quality controls, layer controls, themes, details expansion, and resize to recomputation/redraw. Individual export handlers build downloadable results; the report includes escaped user-derived content and an embedded PNG.

## Scientific conventions to preserve

### Clock and chronology

`Date.UTC` is used as a container for explicit recorded clock components, not to claim the export is UTC. JD determines relative timing when present: `anchor.local + (jd − anchor.jd) × 86400000`. Without a paired anchor, JD becomes UTC-based milliseconds via `(jd − 2440587.5) × 86400000`. Without JD, use the recorded clock. Bins use `floor(display / binMilliseconds)`. Device locale/timezone must not affect these results. Mixed clock conventions, daylight-saving ambiguity, and inconsistent JD/clock offsets are not corrected automatically; a >2-second discrepancy warns the user.

### Bins and gaps

Defaults: five minutes; supported sizes 1, 2, 5, 10, 15. Each occupied bin stores `start`, chronology `first`/`last`, plotted center `t`, `n`, `median`, `mean`, `sd`, and `snr`. Sample SD is `sqrt(sum((mag − mean)^2) / (N−1))`; singleton SD is NaN. Median centers use the median clock-to-chronology offset within that bin. Empty bins are absent. Median connections require adjacent clock bins and a boundary measurement gap ≤ max(60 seconds, three times the median retained cadence). An occupied bin still summarizes its measurements even if an internal gap exists.

### Tracking

Default threshold: 30 pixels, configurable. Apply Euclidean distance between successive records with both coordinates. Missing coordinates can hide movement and make a step span more than one observation. Event detection uses `all`, independent of filtering; diagnostic plots use `kept`. For a positional event, compare up to five magnitudes before/after. Flag a possible artifact when their median shift exceeds max(0.05 mag, three times median nonnegative reported uncertainty). There is no proof-of-slew or automatic rejection.

### Variability

Runs require at least three consecutive bins, each with ≥3 observations, strictly same-sign median changes, and the same boundary gap rule as the median line. A reversal ends the run and starts another at the turning bin. Qualify when endpoint median change ≥ max(0.05 mag, 3 × median reported uncertainty, 3 × median bin sample SD). Missing uncertainty is noted; the floor and available scatter still apply. Shade observed first-to-last times; textual bounds are the enclosing clock-bin boundaries. Mark overlap with tracking events. No calibrated significance, period search, physical classification, or forecast is computed. This heuristic can miss eclipses or flag instrumental trends.

### Presentation and export

Magnitude increases downward. X/Y diagnostics use ordinary numeric axes. Optional error bars require finite nonnegative uncertainty. Flagged points stay visible unless hide is enabled. The summary always describes `all`; bins/plots/exports use `kept`. CSV exports all retained bins; PNG preserves zoom/layers/theme at 3200 × 1700; report embeds that PNG plus full results/settings/warnings. Theme changes do not recompute scientific data. Median-line rendering computes its cadence/gap threshold once per redraw; the continuity rule is unchanged. Canvas fonts use system fallbacks for macOS. See the user guide and developer tests for Safari API requirements and verification limits.

## Review boundaries and known limitations

- Large sessions are drawn/recomputed on the main thread. No worker, decimation, indexed hover search, or large-file benchmark exists. Array spread in extents can hit engine limits for very large datasets; do not claim unlimited capacity.
- Standard named-log duplicate suppression is whole-file/filename based, retaining overlaps across differently named files. Session audit reports exact overlaps; the tracker skips repeated exposure JDs. It never silently adds audit counterparts to a log.
- CSV targets used in exports are quoted/HTML-escaped, but spreadsheet formula-prefix neutralization is not implemented. Review untrusted CSV content before opening exported text in spreadsheet software.
- Canvas is labeled but is not an accessible data-grid replacement; the numeric table helps. Theme contrast checks are not a full accessibility audit. Pinch/pan and print/download behavior still need broader device/browser checks.
- Canvas labels approximate a recorded-clock axis from the first observation; inconsistent recorded clock offsets are warned about, not reconciled.
- CSS variables and `THEMES` duplicate palette values. Update both and check contrast/exports when adding a theme.
- The simulator is a cosine relative-flux loss plus seeded Gaussian noise. It does not model limb darkening, binary geometry, or an orbital period.

Use `tests/README.md` to distinguish reproducible public checks from historical private-data checks. Changes to any convention above require a changelog entry, focused regression tests, and accurate result disclosures.

### Gallery footprint and disclosure controls — 2026-10-21

Thumbnail caches retain only time/median pairs plus ranking scalars; temporary inputs to binData omit unused record metadata. One SVG marker path with round line caps retains all marker centres, including isolated bins, instead of a circle node per point. The curve path, gap rule, numerical summaries and ranking formulas are unchanged. Generated markup is held by the displayed DOM, not duplicated in each track cache. This trades cheap SVG string regeneration on filter/scale changes for lower retained markup/cache overhead. All qualifying tiles remain available; no decimation or paging was introduced.

Native details/summary, the bottom Collapse button and the main-chart toggle share disclosure state. Optional close-on-selection defaults on; Back to gallery explicitly reopens and returns to the last connected tile. These controls preserve observations, main-chart state and numeric caches. Closing alone hides the DOM rather than releasing its storage. The checkbox preference is session-only.

## Named-track selection — 2026-10-22

`trackSearchKey` normalizes search text only (NFKC, case, whitespace and common HD/HIP/HR/SAO separators), preserving coordinate signs/decimals and original names. Filtering runs before the 500-option limit. `renderTracks(true)` selects a retained matching option or the first match and plots it without scrolling or overwriting the typed query. Explicit dropdown/gallery selection fills the input with reported aliases or the unnamed track ID. Gallery sorting/scaling redraws preserve selection without auto-plotting. `trackTitle` adds reported aliases to the existing scan/coordinate label in derived rows, chart titles and exports; original names, rows and scan IDs remain unchanged. Names never influence coordinate association. View plot focuses/scrolls the existing main section with reduced-motion support and preserves zoom for an already plotted selection. No-match search disables View plot and retains the last valid chart.
