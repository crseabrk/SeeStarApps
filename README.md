# Seestar Photometry Analyzer

Branded **Seabrooke.Astronomy**.

[Repository](https://github.com/crseabrk/SeeStarApps) · [GitHub Pages](https://crseabrk.github.io/SeeStarApps/) · [Contributing](CONTRIBUTING.md) · [MIT license](LICENSE)

The Pages address becomes available after GitHub Pages is enabled for the `main` branch root. Fork this repository to adapt the app; retain the MIT copyright and license notice.

 Open `index.html` directly in a modern browser, then select or drop Seestar CSV files. No installation, server, internet connection, account, API key, library, or build step is required. The only essential application file is `index.html`.

## Using the analyzer

For a worked example, use **Download simulated eclipse CSV** on the page, then import the downloaded file. The downloadable release package also includes `SIM_Eclipse_Demo.csv`; the repository app generates the same data from its download button. It shows a fictional six-hour sequence with a complete 0.65 mag dip and recovery across midnight. See `SAMPLE-DATA.md` for the simulation parameters and expected results. The generator is embedded in `index.html`; hosting the CSV separately is optional.

- Import one or several UTF-8 CSVs. The default **Replace session** mode replaces the current observations and resets quality filters, bin size, movement threshold, chart layers, and zoom. Select **Add to session** to combine files from different sessions; matching target names combine and different targets stay separate. Multiple files selected together form one import batch. An import with no usable rows leaves the existing session intact. An identical file with the same filename is skipped on repeated import. Clear session removes imported data from browser memory. Refreshing the page also clears it.
- Select a target before analysis. Targets are grouped by the exact trimmed `Name`; different names never share a curve. Files for the same target combine. Overlapping observations from differently named files are retained intentionally; they are not silently deduplicated.
- Choose 1, 2, 5 (default), 10, or 15 minute bins. Bins align to recorded clock boundaries. Points use exposure start times, not assumed exposure cadence. Median points are plotted at bin centers. Empty bins are not fabricated. Lines break at missing bins and between adjacent bins when the intermeasurement gap exceeds the larger of 60 seconds or three times the median retained cadence. A median still summarizes all measurements within its occupied bin.
- Wheel to zoom both axes around the pointer; drag to pan, double-click or select Reset zoom to restore. Touch supports dragging and two-finger pinch zoom. Toggle points, median, uncertainties, or movement markers independently. Choose a coordinated page/chart palette: **Starlight** (navy with a white publication chart), **Midnight Nebula** (violet night), **Mars Watch** (red-light palette), **Event Horizon** (black/white high contrast with bright cyan points and yellow medians), or **Aurora Borealis** (teal and pale green). Theme changes preserve imported data, filters, and zoom. PNG exports and report charts use the selected palette; the printable report body stays light. Mars Watch changes screen colors but does not control device brightness or operating-system dialogs.
- Quality thresholds flag low/missing SNR and high/missing/negative uncertainty. Flagged points appear amber. Only **Hide flagged measurements** excludes them from bins and exports. The default retains all valid timed magnitudes. `Is Variable` is never a rejection criterion. Original file contents are never modified.
- Expand Tracking Diagnostics for X/time, Y/time, magnitude/X, coordinate ranges, net displacement, maximum successive step, and event times. The threshold is a Euclidean sensor-coordinate distance in pixels, default 30. Detection uses all valid observations of the selected target, independent of quality filtering. Plots use retained observations.

The summary panel describes all valid, timed magnitudes for the selected target, while the result table and exports use retained observations. Duration means first-to-last exposure start; it is not summed exposure time. Sample SD uses N−1 and is undefined for singleton bins (shown as a dash; blank in CSV). Missing SNR is omitted from its averages. Reported reference-star counts are summarized as a count or range.

## Time handling and data validation

The parser supports BOM, quoted commas, escaped quotes, quoted newlines, CRLF/LF/CR, and missing fields. Required columns are `Name`, `Mag(obs)`, and at least one start-time column. Rows without a target, finite magnitude, or usable time are excluded with a count in the import log. Invalid optional values remain missing; negative measurement uncertainties are not drawn as error bars.

`YYYY.MM.DD HH:MM:SS` is parsed into a timezone-neutral clock representation. Browser timezone conversion is never used for recorded local times. JD (or MJD + 2400000.5) sets chronological order and relative elapsed time when available. A paired recorded-time/JD anchor places JD values on the recorded-clock axis. Without JD, recorded clock times provide the timeline. Missing local timestamps are reconstructed using the anchor; if none exists they are shown as UTC, with a warning. Clock/JD disagreement above two seconds produces a warning. Binning uses recorded local times where available. This does not infer a timezone, resolve daylight-saving ambiguity, or calculate barycentric corrections. Keep files in a consistent recorded clock convention.

The observed magnitude range is not a confirmed astrophysical amplitude. A positional jump does not establish a slew or invalidate data. The instrumental-artifact warning is heuristic: compare medians of up to five observations before/after a movement event, requiring a shift larger than max(0.05 mag, three times the median reported uncertainty). It does not classify eclipses.

## Local exports

### Possible variability screening

**Highlight possible variability** lightly shades candidate sustained brightening/fading intervals. Screening uses retained data and the selected bin size: at least three consecutive bins with three observations per bin, strictly same-direction median changes, and endpoint change exceeding max(0.05 mag, 3 × median reported uncertainty, 3 × median within-bin sample SD). Gaps use the same continuity rule as the median curve. Missing uncertainty is noted. Overlap with a detected positional movement is reported. Shading spans observed measurements in candidate bins; displayed summary times are bin boundaries, not fitted event times. PNG and report exports carry the shading, and the report includes the screening summary.

This is an exploratory heuristic, not a calibrated significance test, astrophysical classification, or forecast. It may miss real variability and may flag instrumental trends. Changing filters/bin size changes results. On RT And, default five-minute analysis flags the eight-bin brightening sequence (about 0.43056 mag); SS And has insufficient consecutive bins. A non-detection does not establish constancy.

- **PNG:** 3200 × 1700 pixels, current zoom and layer settings, title, axes, legend, and branding.
- **Processed CSV:** all retained bins for the selected target (not cropped to the zoom viewport), including target, bin start, N, median, mean, sample SD, and mean SNR. UTF-8 BOM and quoted fields aid spreadsheet import.
- **Report:** a standalone HTML document with an embedded PNG of the current chart, summary, full retained bin table, settings, tracking summary/event times, warnings, and import log. Open it and use Print / Save as PDF. It needs no external files.

## Publish on ordinary static hosting

Upload `index.html` to your hosting account's public web directory, or a subfolder such as `/photometry/`. Visit that folder's URL. HTTPS is recommended for normal public hosting but the application also runs from a local file. No special server configuration is required. Publish only the app files; observation CSVs are not required or bundled.

### GitHub Pages

1. Create a repository and upload `index.html` at its root (optionally add this README).
2. In repository Settings → Pages, select deployment from a branch and the root directory of that branch, then save.
3. Once deployment finishes, open the Pages URL shown by GitHub. A project repository commonly uses `https://crseabrk.github.io/SeeStarApps/`.

### Optional Blogger embed

Host the application first, then add this in a Blogger post's HTML editor, substituting your URL:

```html
<iframe src="https://crseabrk.github.io/SeeStarApps/"
  title="Seestar Photometry Analyzer"
  style="width:100%;height:1200px;border:0;border-radius:12px"
  loading="lazy"></iframe>
<p><a href="https://crseabrk.github.io/SeeStarApps/" target="_blank" rel="noopener">Open analyzer in a full window</a></p>
```

Your hosting provider must permit framing. Avoid an iframe sandbox unless configured to allow scripts and downloads. A full-window link is useful on mobile.

## Validation

The actual embedded JavaScript was executed using a local Node test harness solely during development. Node is not an application dependency. Both supplied CSV files were read unchanged; no observations are embedded in the app. See `VALIDATION.md` for results and verification limits.
