# Seestar Photometry Analyzer

Maintainers: [Architecture and data model](ARCHITECTURE.md) · [Changelog](../CHANGELOG.md) · [Developer tests](../tests/README.md) · [AI editing instructions](../AGENTS.md).

Branded **Seabrooke.Astronomy**.

## Purpose and expectations

> Explore your Seestar measurements, assess their consistency, and identify observations worth investigating further.

For Seestar owners, clubs and educators seeking accessible photometry without paid analysis software. The analyzer explores existing measurements and prepares useful evidence for dedicated measurement tools; it does not confirm eclipses, guarantee discovery, or automatically produce calibrated scientific magnitudes. An explained inconclusive result is valid.

Read [audience, scope and development boundaries](PRODUCT-SCOPE.md). The app supports named-target logs, exact target/frame reconciliation, and an experimental field scan with provisional coordinate tracks and a miniature-curve gallery. General scanning can fragment tracks or leave measurements unassigned; it is an exploration aid. Verified permanent cross-session identities, independent image photometry and calibrated discovery assessment remain outside current capability.

[Repository](https://github.com/crseabrk/SeeStarApps) · [Project website](https://crseabrk.github.io/SeeStarApps/photometry/) · [Open analyzer](https://crseabrk.github.io/SeeStarApps/photometry/analyzer/) · [Contributing](../CONTRIBUTING.md) · [MIT license](../LICENSE)

The collection lives at `/SeeStarApps/`, this project overview at `/SeeStarApps/photometry/`, and its interactive tool at `/SeeStarApps/photometry/analyzer/`. Fork this repository to adapt the app; retain the MIT copyright and license notice.

 Open `analyzer/index.html` directly in a modern browser, then select or drop Seestar CSV files. No installation, server, internet connection, account, API key, library, or build step is required. The only essential application file is `analyzer/index.html`.

## See it in action

[Browse the eight-slide walkthrough](https://crseabrk.github.io/SeeStarApps/photometry/walkthrough/) for current app screenshots using fictional observations: collection import, object/run overlap, miniature gallery, full curve, quality sliders and histograms, shortlist notes, filtered VStar export and specialist follow-up. Buttons, numbered dots and arrow keys navigate; screenshots open at full size when clicked. A synthetic VStar download was exercised. Folder permissions and FITS processing are not demonstrated. See [capture provenance and maintenance](walkthrough/README.md). The stress experiment remains excluded.

## AI development disclosure

This project was developed with substantial **OpenAI Codex** assistance under the direction of **Chris Seabrooke / Seabrooke.Astronomy**. Codex generated and revised the application code, analysis heuristics, themes, synthetic data generator, tests, and documentation. Chris supplied requirements, real test observations, feedback, and publication direction. See [AI-DISCLOSURE.md](../AI-DISCLOSURE.md) for the scope of AI involvement and verification limits. Automated checks do not constitute independent scientific validation.

## Collection workflow

1. **Import observations:** read a completed MyWorks folder, a field/subs folder, or target CSVs. Use **Replace collection** or explicit **Add to collection**. Import target and field data in either order; adding target data no longer requires rescanning the field. Use file selection when folder access is unavailable. Download the fictional eclipse CSV here to try the tool.
2. **Choose an object and its runs:** search reported names, provisional IDs or coordinates. Choose all runs, one run or custom checkboxes. A named target CSV starts its own source coverage; long gaps/large position changes can suggest additional segments. Field folders are split on directory changes, long gaps or large catalogue-centroid shifts. These are review hints, not definitive observing-session boundaries.
3. **Gallery filters / gallery:** select minimum coverage or reference-only objects, compare miniature curves and sort by review priority, count or binned range. Four tile sizes, shared/individual scales, optional auto-close and selected-tile return remain available. Main chart settings do not filter the unfiltered thumbnail curves.
4. **Inspect the curve:** review per-run colours, original offsets, uncertainty, tracking and possible variability. Quality controls and observation summaries have their own collapsible sections. Main-chart bins, movement checks and screening preserve run boundaries; data is never silently normalised across nights.
5. **Further analysis:** mark an object beside its selector, gallery tile or full chart; add a shared review note. The shortlist opens objects for inspection. Export the current object’s included runs to VStar or download shortlist notes/provenance.
6. **Setup:** configure optional ASTAP .1476 catalogue access, remembered folders and VStar installation guidance. Lookup results and click-only SIMBAD links stay beside the analysis. No ASTAP executable or VStar installation is needed to use the analyzer itself.

All major sections collapse independently, with Collapse all / Expand all controls. Navigation opens its destination, Back to gallery returns to the selected tile where visible, and Back to top avoids manual scrolling.

### What Seestar collects

The dedicated **Photometry / PhotoMetry** CSVs contain histories for selected targets; the folder may retain old observations. In the inspected exports, selected-target histories included earlier measurements made before their names appeared in frame catalogues. Subs CSVs contain many stars per exposure, including rows labelled `reference star`. A subs folder named for the centred object, or `Unknown`, is field context, not the identity of every measured star. Exposure duration is not measurement cadence.

Each target file remains distinct source coverage. Objects can have observations from several runs, but a matching name alone never combines them. A unique candidate within 3 arcseconds permits a provisional positional association. Ambiguities can create separate groups and are flagged; there is no verified permanent cross-night catalogue identity. Exact JD/RA/DEC/X/Y observation overlap is counted once, with target rows preferred and both source records retained in provenance. Conflicting magnitude/uncertainty/SNR/exposure/reference-count values are reported. Without the complete identity key, observations are not silently deduplicated.

Collection imports require absolute start JD or MJD. Clock-only rows are unsupported and reported, rather than assigned an invented night. The lower-level parser still understands recorded clocks. Source-row limits and partial import warnings apply. IDs are collection-local and can change after reimport; review JSON is a record, not a resumable workspace.

### Quality controls

SNR and magnitude-uncertainty histograms show **all measurements for the current object and included runs**, before filtering. Height is the number of measurements; the horizontal axis is the reported quality value. Sliders span the observed minimum–maximum, with exact numeric entry retained. Missing/invalid values are counted in text rather than plotted. Constant distributions disable the slider but permit typed cutoffs. An out-of-range typed cutoff is retained with a warning.

Solid bar portions pass that particular cutoff; striped portions fail it. A bin crossing the cutoff can contain both. Low SNR flags values below the minimum; uncertainty flags values above the maximum (and missing/invalid values when that filter is active). A solid observation can still fail the other filter. The total counts unique flagged observations, with SNR, uncertainty, missing/invalid and overlap breakdowns. **Hide flagged measurements** excludes flagged points from chart/bins and ordinary analysis exports. Without it, flags remain visible. **No cutoff** disables a metric. Theme colours, patterned flags and a dashed cutoff distinguish the histogram states without relying on colour alone.

Magnitude uncertainty (σ mag) is measurement error, not the object’s brightness. Original measurements remain unchanged. `Is Variable` is never a rejection criterion. Filters persist when changing objects/runs, so inspect the range warning; Clear collection resets analysis controls.

### Triage and specialist handoff

The gallery and shortlist help decide **what deserves a closer look**. Interesting shapes, high review rank or reported reference roles do not confirm astrophysical variability. Preserve source runs, inspect noise and shared effects, and retain uncorrected offsets between nights.

**VStar export** writes individual original exposure-start JD, magnitude and optional nonnegative uncertainty in simple format, with comment provenance and notes. It exports the current object and included runs, not all marked objects. **Apply current quality filters to VStar export** independently applies the current thresholds, regardless of whether flagged points are hidden in the browser. Duplicate conflicts, non-identical detections at one epoch or an ambiguous multi-run association block export until the selection is narrowed/resolved. Start times are not converted to exposure midpoints, HJD or BJD. No standard passband or calibration is invented; this is not an AAVSO submission file. Ordinary and quality-filtered exports have been tested in VStar 2.25.0 on macOS, including uncertainty bars. Other native environments remain unverified.

Use VStar for deeper time-series/period exploration. For **independent FITS photometry**, use the original exposures in a dedicated tool such as AstroImageJ: image calibration, aperture selection, comparison-star choice and measurement quality require their own checks. Header metadata alone cannot remeasure brightness. This app does not read FITS pixels or apply image calibration. It remains useful as a free first inspection and preparation step without paid software.

**Review notes / provenance** JSON contains marked IDs, aliases, coordinates, notes, runs and source metadata. Download it before refresh: notes are memory-only, and there is no restore importer. **Processed CSV** exports retained bins; **PNG** saves the current chart at 3200×1700; the **HTML report** embeds the chart, settings and retained-bin table for offline viewing. The provisional catalogue is a snapshot. Exact overlap evidence now appears per object; the old single-target audit control is superseded by collection review.

### Files, lookup and persistence

Sources stay read-only. Read directly from an accessible completed device folder when convenient, or copy locally with Finder/Explorer first. Device/filesystem/browser support varies; no live-acquisition monitoring is promised. CSV processing uses browser memory: 16 MiB per file, 100,000 folder entries, 1.5 million valid JD input rows including duplicate exports. Exceeding the budget or encountering file failures labels accepted results partial. Cancellation or an unusable replacement preserves accepted observations. Field catalogues are staged before chronological association, so large imports can demand substantial memory. No stress-test controls ship.

ASTAP attachment indexes local .1476 files only. A lookup happens on request, in nearby cells; no ASTAP application is required. Compact records have positions/magnitudes but no names. Missing cells and epoch/proper-motion limitations are reported. SIMBAD receives coordinates only after an explicit clicked link; proximity does not confirm identity.

Remembered session/catalogue directory handles use IndexedDB, not cookies or observation storage. Startup does not read files or request permissions. Reopen may request read access again; Forget affects saved handles, never source files. Local HTML and hosted HTTPS have different storage. Refresh clears observations, shortlist and results.

The local workflow has been tested in normal Chrome; the exact browser version was not recorded. Native Safari/Firefox, Windows and iOS checks of this upgrade remain pending. Ordinary file selection remains the fallback. See [validation](VALIDATION.md), [environment handoff](../tests/ENVIRONMENT-HANDOFF.md), and [implementation details](COLLECTION-WORKFLOW.md).

## Charts and diagnostics

Choose 1, 2, 5, 10 or 15 minute clock-aligned bins. Magnitudes increase downward. Zoom with the wheel, drag to pan, double-click or Reset zoom to restore; touch interactions retain the existing implementation and need current native testing. Toggle points, medians, uncertainty bars, movement and variability shading. Empty bins are not fabricated and median lines do not bridge run boundaries.

Tracking Diagnostics includes sensor X/time, Y/time and magnitude/X. The default movement threshold is 30 pixels. Events use all observations within each run; plots use retained measurements. Positional changes are diagnostic hints, not proof of a slew or grounds for automatic rejection. Multiple-run sensor offsets are not interpreted as continuous drift.

Five themes coordinate page, charts, quality histograms and sliders. Mars Watch does not control device brightness or system dialogs. Theme changes preserve scientific data and zoom. Summaries describe all selected-object observations; result bins and ordinary exports use the retained subset. Duration is first-to-last exposure start, not summed exposure.

## Time handling and data validation

The parser supports BOM, quoted commas, escaped quotes, quoted newlines, CRLF/LF/CR, and missing fields. Required columns are `Name`, `Mag(obs)`, and at least one start-time column. Rows without finite magnitude or usable time are excluded with a count. Collection field import accepts unnamed valid rows; dedicated target import requires names. Invalid optional values remain missing; negative measurement uncertainties are not drawn as error bars.

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
