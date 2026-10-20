# Developer verification

Run from the repository root with a modern Node.js installation:

```text
node tests/smoke.cjs
node tests/analysis.cjs
```

No npm packages or install/build commands are needed. Node is only used for development checks. The browser app does not depend on it.

## What these checks establish

Tests read the actual embedded script in `photometry/analyzer/index.html`, execute it in Node's VM with a deliberately small simulated DOM/canvas, and test its exported functions/state. This catches syntax errors and numerical/state regressions. It does not render actual pixels, open native dialogs, implement browser layout, or establish scientific significance.

- `smoke.cjs`: deterministic synthetic CSV import, count, timeline across midnight, median bins, both variability directions, tracking, quoted CSV, invalid date, and singleton SD.
- `analysis.cjs`: additional CSV edge cases, missing values, MJD fallback, exact clock-bin boundaries, sample SD, variability false-positive fixtures, gaps, tracking overlap, replace/append behavior, and source-data preservation during filtering.
- Optional `real-data.cjs`: explicit user-supplied RT And and SS And files, with the historical reference assertions below. It prints counts/results without writing or publishing the inputs.

```text
node tests/real-data.cjs "path/to/RT.csv" "path/to/SS.csv"
```

The two original observation files are not in this public repository. Historical verification against them is recorded in `photometry/VALIDATION.md`: RT And 1,243 rows; 23:45 bin N=40, median 8.7609725; 00:20 bin N=46, median 8.3304125; SS And seven rows. Do not state that a contributor reran these checks unless they actually had those files.

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
