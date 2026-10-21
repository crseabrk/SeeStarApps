# Cross-environment handoff for Windows, Mac, and cloud Codex

Updated 2026-10-20. Applies to the Safari/macOS compatibility change accompanying this file, based on morning commit `3aebd17`. After pulling, record `git rev-parse HEAD` with any new results. Do not assume tests of earlier code cover later changes.

## Note to Windows Codex

The owner requires all supported environments to be tested. If you cannot perform a check yourself, leave precise instructions here for the appropriate Codex session and tell the owner to continue there. Do not equate passing JavaScript tests with passing native browser, file-dialog, gesture, or printing checks. Read `AGENTS.md` and `photometry/VALIDATION.md` before continuing.

The cloud compatibility edits were recovered on the Mac. They add system fonts, a keyboard-operable file-picker button, pinch-to-pan resumption, delayed download-link cleanup, and one cadence calculation per redraw. Scientific formulas and export schemas are unchanged.

## Current coverage

| Environment | Status for this change | Remaining work |
|---|---|---|
| macOS 27.0.1 / Safari 27.0.1 | Local HTML and HTTPS morning baseline imported 1,081 synthetic rows with identical 73 bin counts/medians; themes, filtering, actual downloads, offline report, and selected desktop/narrow screenshots checked | Native mouse/trackpad, keyboard picker/Finder drop, iCloud, permission dialogs, print/PDF pagination. WebDriver native reset clicks were unreliable; DOM activation worked. Diagnose manually rather than declaring an app defect. Recheck published changed version after deployment. |
| macOS / Chrome and Firefox | Not tested | Full browser checklist below |
| Windows / Edge or Chrome, plus Firefox | Morning development results exist; recovered compatibility changes not tested natively on Windows | Pull this change and run full checklist, especially new fonts and file-picker button |
| iOS/iPadOS / Safari | Not tested; pinch transition only covered by simulated DOM regression | Files selection, real touch pinch → one finger → pan, downloads/report, narrow layout; test hosted HTTPS and document local HTML restrictions |
| Cloud / Linux | Historical Node checks passed; WebKit download blocked | Useful for regression tests only; cannot certify native Mac/Windows dialogs |

## Reproducible checks for the next session

1. Pull the latest repository without discarding local work; record commit, OS, browser version, and date. Run `node tests/smoke.cjs`, `node tests/analysis.cjs`, and `node tests/browser-compat.cjs` from repository root.
2. Open `photometry/analyzer/index.html` locally and the hosted analyzer at https://crseabrk.github.io/SeeStarApps/photometry/analyzer/. Import `photometry/SIM_Eclipse_Demo.csv`. Expect 1,081 retained rows, zero invalid rows, 73 default five-minute bins, two exploratory candidate intervals, and the recorded span 2026-10-19 21:00 through 2026-10-20 03:00.
3. Follow every manual check in `tests/README.md`: replacement/append/duplicates/invalid import, target separation, filters, layers, all themes, diagnostics, zoom/pan/reset, keyboard focus, and responsive layout. On touch hardware check pinch, lift one finger, then pan without a jump.
4. Select the CSV through the native picker using keyboard and mouse; drop from Finder/Explorer. On Mac try an owner-selected iCloud file only after it is downloaded. Keep private observations out of commits.
5. Download PNG, processed CSV, and report. Confirm PNG dimensions 3200 × 1700 and 73 CSV data rows at default settings. Open the HTML report offline, inspect its embedded chart, and test Print / Save as PDF for clipping and pagination.
6. Verify hub → project → analyzer and return links. Record results here and in `photometry/VALIDATION.md`, with exact revision and unresolved failures. If another platform is inaccessible, tell the owner which device/session to use and preserve its pending checklist.

Private reference files were not rerun in that historical Mac compatibility follow-up. Use synthetic data unless the owner supplies the original files; never claim private-data validation without those inputs.

## Session/field/gallery/catalogue/persistence upgrade — 2026-10-20

Nine public synthetic/simulated-DOM suites passed via `node tests/run-all.cjs`. Owner reported normal-Chrome success and supplied gallery/chart/candidate-lookup/SIMBAD screenshots. Exact Chrome version was not supplied. The Codex embedded-browser directory picker returned AbortError on confirmation; use normal Chrome or ordinary file selection. Older platform results above do not cover this upgrade. Private observation-derived results remain in owner-held records.

Tomorrow on this Mac: open the published HTTPS analyzer in normal Chrome, record version and revision, import a target log, scan a completed folder, inspect gallery/tile sizes/scales/sorts, select and plot a track, return to log, check audit/export and catalogue/SIMBAD controls. Attach extracted .1476 database files/folder, check no lookup occurs until clicked, test unsupported files and cancellation. Reload/restart and test remembered session/database folders, permission denial, disconnected drives and Forget. Hosted storage is separate from the local preview.

Native new-workflow Safari/Firefox on Mac, Windows Edge/Chrome/Firefox and iOS/iPadOS checks remain pending. Repeat standard import/gesture/export tests too. Continue those environments when the owner resumes them; Windows stays paused. Do not restart polling. See photometry/SESSION-PREVIEW.md for algorithms, limits and exact fixture scope.

## Workflow navigation update — 2026-10-21

Owner reports folder memory held; origin/restart conditions and browser version were not recorded. Verify the numbered steps and target selector beside import in native Chrome. Import after a previous scan and confirm the step-2 rescan instruction. Collapse/expand the gallery, select a tile, use Back to gallery and confirm return to the same tile; change filters to remove that tile and verify fallback to the gallery heading. Check corner Back to top, keyboard focus, mobile width and reduced-motion settings. Nine simulated suites pass; native navigation/layout checks and other supported environments remain pending. Scientific algorithms are unchanged.

## Lighter thumbnails and gallery controls — 2026-10-21

Native Chrome: check sparse/singleton thumbnail dots and gaps, curve/gallery agreement, all tile sizes/scales, and memory/responsiveness on a large session. Verify auto-close enabled/disabled, close from gallery bottom, main-chart Open/Close label and aria-expanded after both header/footer toggles, reopening to selected tile and preserved chart zoom/filters. Nine simulated suites and a synthetic old/new markup comparison pass; native SVG pixels, heap and supported-environment checks remain pending. Closing the disclosure hides rather than discards the gallery.

Selected-tile follow-up: verify the accent outline and Selected label in each theme, keyboard activation, return navigation and gallery sorting/filtering. VM selection-state regressions pass; native visual checks remain pending.

## Screenshot walkthrough — 2026-10-21

Test `photometry/walkthrough/` on native Chrome/Edge, Safari, Firefox and mobile: all seven images load; Previous/Next, numbered dots and arrow/Home/End keys navigate with correct disabled bounds; captions are legible at narrow/wide widths; relative overview/analyzer links work from local files and hosted Pages. Captures came from the actual hosted analyzer in the Codex browser using synthetic CSVs; this does not validate native slideshow layout. Static asset hashes/link targets and simulated navigation checks pass. Analyzer runtime is unchanged.
