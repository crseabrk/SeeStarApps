# Seestar Photometry Analyzer

Maintainers: [Architecture and data model](ARCHITECTURE.md) · [Changelog](../CHANGELOG.md) · [Developer tests](../tests/README.md) · [AI editing instructions](../AGENTS.md).

Branded **Seabrooke.Astronomy**.

## Purpose and expectations

> Explore your Seestar measurements, assess their consistency, and identify observations worth investigating further.

For Seestar owners, clubs and educators seeking accessible photometry without paid analysis software. The analyzer explores existing measurements and prepares useful evidence for dedicated measurement tools; it does not confirm eclipses, guarantee discovery, or automatically produce calibrated scientific magnitudes. An explained inconclusive result is valid.

Read [audience, scope and development boundaries](PRODUCT-SCOPE.md). The app supports named-target logs, exact target/frame reconciliation, and an experimental field scan with provisional coordinate tracks and a miniature-curve gallery. General scanning can fragment tracks or leave measurements unassigned; it is an exploration aid. Cross-session identities, independent image photometry and calibrated discovery assessment remain future work.

[Repository](https://github.com/crseabrk/SeeStarApps) · [Project website](https://crseabrk.github.io/SeeStarApps/photometry/) · [Open analyzer](https://crseabrk.github.io/SeeStarApps/photometry/analyzer/) · [Contributing](../CONTRIBUTING.md) · [MIT license](../LICENSE)

The collection lives at `/SeeStarApps/`, this project overview at `/SeeStarApps/photometry/`, and its interactive tool at `/SeeStarApps/photometry/analyzer/`. Fork this repository to adapt the app; retain the MIT copyright and license notice.

 Open `analyzer/index.html` directly in a modern browser, then select or drop Seestar CSV files. No installation, server, internet connection, account, API key, library, or build step is required. The only essential application file is `analyzer/index.html`.

## See it in action

[Browse the seven-slide walkthrough](https://crseabrk.github.io/SeeStarApps/photometry/walkthrough/) for real app screenshots using clearly labelled fictional observations: target import, frame reconciliation, gallery, full curve, selected-tile return and export controls. It runs offline from `walkthrough/index.html` with its images folder. Use buttons or arrow keys. Captures use the CSV-selection fallback in the Codex browser; native folder selection, catalogue lookup and export downloads are not demonstrated. See [capture provenance and maintenance](walkthrough/README.md). The local stress experiment is excluded from the release.

## AI development disclosure

This project was developed with substantial **OpenAI Codex** assistance under the direction of **Chris Seabrooke / Seabrooke.Astronomy**. Codex generated and revised the application code, analysis heuristics, themes, synthetic data generator, tests, and documentation. Chris supplied requirements, real test observations, feedback, and publication direction. See [AI-DISCLOSURE.md](../AI-DISCLOSURE.md) for the scope of AI involvement and verification limits. Automated checks do not constitute independent scientific validation.

## Session folders, field stars and lookup

The page marks the working order: **1. Load a target log** (optional), **2. Scan the session folder**, **3. Browse the gallery**, **4. Inspect the selected curve**. For general exploration, start at step 2. Import a target log before scanning; importing/replacing it afterwards invalidates reconciliation and requires step 2 again. Replacing the log clears the previous field scan/gallery. The target selector is beside the import controls.

The gallery heading and bottom button collapse its native disclosure without clearing curves. **Close gallery when selecting a curve** is enabled initially and can be switched off at the top. An **Open gallery / Close gallery** button above the main chart also controls it. The current tile has an accent outline and a Selected label, retained across gallery redraws when visible. A gallery tile opens the main chart; **Back to gallery** reopens the gallery and returns focus/scroll to that tile where still available. **Back to top** is available in the main view and as a fixed corner control. Navigation respects reduced-motion preferences.

1. For targeted analysis, load the dedicated target CSV and select its target. Then use **Read session folder**, or **Select frame CSVs instead** where directory access is unavailable. Scanning without a log gives an inventory and, with tracking enabled, field-star curves.
2. The audit counts CSV/FITS/JPEG files and field rows, and reconciles exact log identities without adding duplicate light-curve points. Blank names are counted separately from invalid magnitude/time rows. FITS and JPEG contents are not read.
3. **Build provisional star tracks** associates coordinates within 3 arcseconds only for unambiguous one-to-one matches per exposure. Search a track or filter by observation count. Searches ignore case and whitespace, including `HD39951`, `HD 39951` and `HD-39951`; coordinate signs and decimal points are preserved. Search covers all tracks before the dropdown is limited to 500 results. Choosing a dropdown star automatically updates the plot and fills the search field with its reported name (or scan ID when unnamed). Typing a matching search automatically plots the selected matching result without moving the page; choose **View plot** to jump to the chart. With several matches, choose the intended track from the list. Clear the search to browse all names again. Reported names appear alongside scan IDs in the plot and exports, and remain unverified aliases rather than independent identifications. **Return to target log** restores the imported target data. IDs and coordinate labels are fixed within this scan; another scan rebuilds them. Track fragments are not a census of unique stars.
4. Browse the **Light-curve gallery**. Choose Small/Medium/Large/Extra large tiles, shared or individual scales, and review-priority/count/range sorting. Click a tile to open the full chart. Thumbnails use compact SVG paths and numeric-only caches, preserving plotted points while avoiding per-point DOM circles and duplicate stored SVG markup. Collapsing hides the gallery; it does not discard measurement data. Thumbnails use unfiltered 5-minute medians, a shared session timeline and median-centred magnitudes; sparse bins and track fragments can mislead. Review priority is a heuristic, not a probability. Main-chart bin/filter settings do not change thumbnails.
5. For optional offline candidate lookup, choose an extracted ASTAP .1476 database folder or individual database files, then click **Look up plotted star locally**. No ASTAP application is required. Actual D80 support was checked; other variants require verification. Position/magnitude entries lack object names. Missing cells are reported; epoch/proper motion differences are not corrected.
6. Click **SIMBAD: find identifier** or a local candidate's SIMBAD link to open a coordinate search externally. Only an explicit click contacts that service. Inspect possible matches before copying a name; no automatic identification or renaming is performed.
7. Session and catalogue directory handles are remembered in this browser when storage is available. **Reopen** explicitly requests read access and starts the workflow; no files are read automatically on startup. **Forget remembered folders** clears these preferences without changing files or loaded results. This uses IndexedDB, not cookies. A hosted URL has different storage from the downloaded HTML; permission renewal and browser restrictions may apply.

Source files are read-only. Copy a completed session locally with Finder/Explorer first. Scans show progress and can be cancelled; cancellation retains previous accepted results. Individual file failures are labelled partial. Limits: 16 MiB per CSV, 100,000 session entries, 1.5 million retained track observations; reaching the tracking limit is explicitly partial. Field tracking and gallery caching use browser memory and can be demanding on large sessions. The local catalogue reader uses bounded chunks of nearby cells. Refresh clears observations/results, while saved directory handles can remain.

Use normal desktop Chrome for the folder workflow demonstrated by the owner. The Codex embedded browser returned a cancelled/denied folder selection; ordinary file selection is the fallback. Safari/Firefox/mobile folder and persistence behavior has not been established. The older Safari chart/export checks do not cover these new features. See [validation](VALIDATION.md), [environment handoff](../tests/ENVIRONMENT-HANDOFF.md), and the [development record](SESSION-PREVIEW.md).

## Using the analyzer

For a worked example, use **Download simulated eclipse CSV** on the page, then import the downloaded file. The downloadable release package also includes `SIM_Eclipse_Demo.csv`; the repository app generates the same data from its download button. It shows a fictional six-hour sequence with a complete 0.65 mag dip and recovery across midnight. See `SAMPLE-DATA.md` for the simulation parameters and expected results. The generator is embedded in `analyzer/index.html`; hosting the CSV separately is optional.

- Import one or several UTF-8 CSVs. The default **Replace session** mode replaces the current observations and resets quality filters, bin size, movement threshold, chart layers, and zoom. Select **Add to session** to combine files from different sessions; matching target names combine and different targets stay separate. Multiple files selected together form one import batch. An import with no usable rows leaves the existing session intact. An identical file with the same filename is skipped on repeated import. Clear session removes imported data from browser memory. Refreshing the page also clears it.
- Select a target before analysis. Targets are grouped by the exact trimmed `Name`; different names never share a curve. Files for the same target combine. Overlapping observations from differently named files are retained intentionally; they are not silently deduplicated.
- Choose 1, 2, 5 (default), 10, or 15 minute bins. Bins align to recorded clock boundaries. Points use exposure start times, not assumed exposure cadence. Median points are plotted at bin centers. Empty bins are not fabricated. Lines break at missing bins and between adjacent bins when the intermeasurement gap exceeds the larger of 60 seconds or three times the median retained cadence. A median still summarizes all measurements within its occupied bin.
- Wheel to zoom both axes around the pointer; drag to pan, double-click or select Reset zoom to restore. Touch supports dragging and two-finger pinch zoom. Toggle points, median, uncertainties, or movement markers independently. Choose a coordinated page/chart palette: **Starlight** (navy with a white publication chart), **Midnight Nebula** (violet night), **Mars Watch** (red-light palette), **Event Horizon** (black/white high contrast with bright cyan points and yellow medians), or **Aurora Borealis** (teal and pale green). Theme changes preserve imported data, filters, and zoom. PNG exports and report charts use the selected palette; the printable report body stays light. Mars Watch changes screen colors but does not control device brightness or operating-system dialogs.
- Quality thresholds flag low/missing SNR and high/missing/negative uncertainty. Flagged points appear amber. Only **Hide flagged measurements** excludes them from bins and exports. The default retains all valid timed magnitudes. `Is Variable` is never a rejection criterion. Original file contents are never modified.
- Expand Tracking Diagnostics for X/time, Y/time, magnitude/X, coordinate ranges, net displacement, maximum successive step, and event times. The threshold is a Euclidean sensor-coordinate distance in pixels, default 30. Detection uses all valid observations of the selected target, independent of quality filtering. Plots use retained observations.

The summary panel describes all valid, timed magnitudes for the selected target, while the result table and exports use retained observations. Duration means first-to-last exposure start; it is not summed exposure time. Sample SD uses N−1 and is undefined for singleton bins (shown as a dash; blank in CSV). Missing SNR is omitted from its averages. Reported reference-star counts are summarized as a count or range.

## Safari and macOS

Use a current Safari release (15.4 or later is the API baseline, not a claim of testing every version), or current Chrome/Firefox/Edge. The app uses JavaScript, not Java; no Java installation is needed. Open the HTML directly in Safari or use the hosted analyzer. Standard CSV import needs no directory access or web server. Optional folder/reopen workflows use feature-detected read-only File System Access APIs; ordinary file selection remains available. Recorded clocks are parsed explicitly, independent of Mac regional date formatting and timezone.

Use **Select CSV files** for Finder or iCloud Drive files; ensure cloud-only files have downloaded if selection/drop cannot read them. The picker intentionally filters to `.csv` files. Imports are held in memory: save exports before closing or refreshing the page. Safari may request permission to download from the site; exports go to its configured download location. Open the downloaded HTML report in a browser, then choose Print / Save as PDF. Actual CSV/PNG/HTML downloads and offline report opening were verified in Safari 27.0.1 on macOS. Finder/iCloud dialogs and print output remain unverified; see `VALIDATION.md`.

Charts use system fonts and cap display scaling at 2× for Retina screens. Trackpad scrolling zooms over the chart; drag pans. Touch pinch supports returning to one-finger panning. The 3200 × 1700 PNG export is independent of screen density. See the developer verification notes for tested behavior and limits.

## Time handling and data validation

The parser supports BOM, quoted commas, escaped quotes, quoted newlines, CRLF/LF/CR, and missing fields. Required columns are `Name`, `Mag(obs)`, and at least one start-time column. Rows without finite magnitude or usable time are excluded with a count. Standard log import counts and skips unnamed rows; the session scanner accepts them for inventory and provisional tracking. Invalid optional values remain missing; negative measurement uncertainties are not drawn as error bars.

`YYYY.MM.DD HH:MM:SS` is parsed into a timezone-neutral clock representation. Browser timezone conversion is never used for recorded local times. JD (or MJD + 2400000.5) sets chronological order and relative elapsed time when available. A paired recorded-time/JD anchor places JD values on the recorded-clock axis. Without JD, recorded clock times provide the timeline. Missing local timestamps are reconstructed using the anchor; if none exists they are shown as UTC, with a warning. Clock/JD disagreement above two seconds produces a warning. Binning uses recorded local times where available. This does not infer a timezone, resolve daylight-saving ambiguity, or calculate barycentric corrections. Keep files in a consistent recorded clock convention.

The observed magnitude range is not a confirmed astrophysical amplitude. A positional jump does not establish a slew or invalidate data. The instrumental-artifact warning is heuristic: compare medians of up to five observations before/after a movement event, requiring a shift larger than max(0.05 mag, three times the median reported uncertainty). It does not classify eclipses.

## Local exports

### Possible variability screening

**Highlight possible variability** lightly shades candidate sustained brightening/fading intervals. Screening uses retained data and the selected bin size: at least three consecutive bins with three observations per bin, strictly same-direction median changes, and endpoint change exceeding max(0.05 mag, 3 × median reported uncertainty, 3 × median within-bin sample SD). Gaps use the same continuity rule as the median curve. Missing uncertainty is noted. Overlap with a detected positional movement is reported. Shading spans observed measurements in candidate bins; displayed summary times are bin boundaries, not fitted event times. PNG and report exports carry the shading, and the report includes the screening summary.

This is an exploratory heuristic, not a calibrated significance test, astrophysical classification, or forecast. It may miss real variability and may flag instrumental trends. Changing filters/bin size changes results. A non-detection does not establish constancy.

- **PNG:** 3200 × 1700 pixels, current zoom and layer settings, title, axes, legend, and branding.
- **Processed CSV:** all retained bins for the selected target (not cropped to the zoom viewport), including target, bin start, N, median, mean, sample SD, and mean SNR. UTF-8 BOM and quoted fields aid spreadsheet import.
- **Report:** a standalone HTML document with an embedded PNG of the current chart, summary, full retained bin table, settings, tracking summary/event times, warnings, and import log. Open it and use Print / Save as PDF. It needs no external files.

## Publish on ordinary static hosting

For the full collection, upload the repository's root `index.html` and the `photometry/` folder, preserving their layout. For only this project, upload the contents of `photometry/` to your public web directory. The root is the project overview; `analyzer/` contains the standalone application. For an analyzer-only installation, upload `analyzer/index.html` to the desired directory. HTTPS is recommended for normal public hosting but the application also runs from a local file. No special server configuration is required. Publish only the app files; observation CSVs are not required or bundled.

### GitHub Pages

1. Create a repository and upload `analyzer/index.html` at its root (optionally add this README).
2. In repository Settings → Pages, select deployment from a branch and the root directory of that branch, then save.
3. Once deployment finishes, open the Pages URL shown by GitHub. A project repository commonly uses `https://crseabrk.github.io/SeeStarApps/`.

### Optional Blogger embed

Host the application first, then add this in a Blogger post's HTML editor, substituting your URL:

```html
<iframe src="https://crseabrk.github.io/SeeStarApps/photometry/analyzer/"
  title="Seestar Photometry Analyzer"
  style="width:100%;height:1200px;border:0;border-radius:12px"
  loading="lazy"></iframe>
<p><a href="https://crseabrk.github.io/SeeStarApps/photometry/analyzer/" target="_blank" rel="noopener">Open analyzer in a full window</a></p>
```

Your hosting provider must permit framing. Avoid an iframe sandbox unless configured to allow scripts and downloads. A full-window link is useful on mobile.

## Validation

The actual embedded JavaScript was executed using a local Node test harness solely during development. Node is not an application dependency. Both supplied CSV files were read unchanged; no observations are embedded in the app. See `VALIDATION.md` for results and verification limits.
