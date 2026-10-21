# Developer verification

See [cross-environment coverage and Codex handoffs](ENVIRONMENT-HANDOFF.md) before declaring platform compatibility complete.

Run all nine suites from the repository root with a modern Node.js installation using `node tests/run-all.cjs`. Individual baseline suites are also listed below:

```text
node tests/smoke.cjs
node tests/analysis.cjs
node tests/browser-compat.cjs
```

No npm packages or install/build commands are needed. Node is only used for development checks. The browser app does not depend on it.

## What these checks establish

Tests read the actual embedded script in `photometry/analyzer/index.html`, execute it in Node's VM with a deliberately small simulated DOM/canvas, and test its exported functions/state. This catches syntax errors and numerical/state regressions. It does not render actual pixels, open native dialogs, implement browser layout, or establish scientific significance.

- `smoke.cjs`: deterministic synthetic CSV import, count, timeline across midnight, median bins, both variability directions, tracking, quoted CSV, invalid date, and singleton SD.
- `analysis.cjs`: additional CSV edge cases, missing values, MJD fallback, exact clock-bin boundaries, sample SD, variability false-positive fixtures, gaps, tracking overlap, replace/append behavior, and source-data preservation during filtering.
- Optional `real-data.cjs`: the original owner-supplied reference fixtures using their existing assertions. It prints counts/results without writing or publishing the inputs.

```text
node tests/real-data.cjs "path/to/RT.csv" "path/to/SS.csv"
```

The original reference inputs are not included. Optional real-data checks require those original fixtures; input-specific results are retained privately. Do not state that private-data checks passed unless they ran against the actual required files.

## Manual browser checks

1. Open `photometry/analyzer/index.html` as a local file. Also check the deployed HTTPS URL after publication.
2. Download/import the synthetic sample. Expect 1,081 retained observations, midnight crossing, fading/recovery shading, no default-threshold tracking jump, and a smaller magnitude at the top.
3. Test replacement reset, append multiple targets, repeated import, invalid import preserving the previous session, filters on/off, and no-filter recovery of counts.
4. Check points/median/uncertainty/event/variability toggles, wheel zoom, drag pan, reset, hover labels, touch drag/pinch where available.
5. Inspect all five themes and expanded diagnostic charts at desktop/mobile widths; check keyboard access, focus rings, readable labels, and numeric table.
6. Download PNG (title/axes/legend at 3200 × 1700), CSV (retained bins and schema), and HTML report. Open report offline and inspect print preview.
7. Verify hub → overview → analyzer and both return links, sample/source downloads, and Blogger iframe behavior.

Record which browsers/devices and actions were actually checked. The initial HTTPS deployment was tested for synthetic import/chart display and navigation; it was not a complete gesture, export-dialog, print, or accessibility test.

## Source-only changes

For documentation/comment/formatting changes, compare executable script tokens to the parent revision, run the automated checks, and avoid changing algorithms in the same patch. Static navigation-only changes need link checks; they do not require inventing new numerical tests. Any unresolved limitation belongs in the final change description and validation record.

## Safari/macOS review — 2026-10-20

`browser-compat.cjs` checks native-button picker delegation, pinch-to-one-finger panning/cancellation, and delayed link/Blob URL cleanup in the simulated DOM. It does not test WebKit, OS file permissions, or actual downloads. Public smoke/analysis/compatibility checks passed. Additional timezone runs: `TZ=America/Los_Angeles node tests/analysis.cjs` and `TZ=Europe/Berlin node tests/smoke.cjs` passed.

The cloud environment could not download WebKit. The edits were recovered on macOS and all three suites passed. The gesture regression now checks finite viewport coordinates and expected pan distance. Native Safari 27.0.1 testing subsequently succeeded after the owner enabled remote automation; see [the validation record](../photometry/VALIDATION.md) for the precise coverage and limitations. Downloads were verified on disk, and local-file bin results match the deployed morning baseline. Physical input, Finder/iCloud dialogs, printing, and iOS remain manual checks. Safari 15.4 is the API baseline because the application uses `Array.prototype.at`; it is not a claim of tested support for that release.

Session-evidence prototype regression: `node tests/session-audit.cjs`. See [preview limits and real-data result](../photometry/SESSION-PREVIEW.md).

## Optional screenshot walkthrough

`node tests/walkthrough.cjs` verifies the seven synthetic-data screenshot assets against their hashes, required slide DOM IDs, relative links and navigation bounds/keys using a simulated DOM. Included in `run-all.cjs`. This checks static assets and logic, not native layout, assistive technology or browser painting. See `photometry/walkthrough/README.md` for actual capture provenance and `ENVIRONMENT-HANDOFF.md` for native checks.
