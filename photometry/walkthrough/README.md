# Analyzer walkthrough

Eight slides show the current collection workflow: import, object/source runs, miniature gallery, full curve, SNR/uncertainty sliders, shortlist notes, quality-filtered VStar export and optional tools / next steps. Captions follow the project introduction’s focus on visual triage and traceable specialist follow-up.

Open `index.html` directly or visit https://crseabrk.github.io/SeeStarApps/photometry/walkthrough/. No runtime dependencies or automatic requests are required. Previous/Next, numbered dots and arrow/Home/End keys navigate; there is no autoplay. Click a screenshot to open its full-size original. Overview/analyzer links navigate only when clicked.

## Capture provenance

Captured 22 October 2026 from the hosted analyzer at revision `76c81073b29e31f29d352a78401ebb36bba86392`, in the Codex browser at its normal viewport. All eight images are unmodified browser JPEG captures. No private observations, catalogue records or stress repetitions appear. The source application and screenshot layout are real; January 2026 observations and their shapes are fictional.

Synthetic input: 180 field CSVs, each with 24 widely separated positions, plus a matching 180-row target CSV. The collection contains two source runs and 24 provisional objects. The selected target shows 180 unique observations and excludes 180 exact duplicate exports. Artificial SNR variation and uncertainty values demonstrate the filters; these are not a physical instrument noise model or a validation of crowded-field association.

The file-picker fallback was exercised through actual browser controls, first target import then explicit Add of field CSVs. Directory permission prompts, device access and FITS/JPEG inventory were not exercised. Catalogue services were not queried.

For the quality capture, minimum SNR20 and maximum uncertainty0.06 flag58 and55 observations, with55 in both groups. The unique total is58 and the filtered curve retains122 of180. Solid/striped histogram portions and labelled axes explain the distribution. A mark and shared review note were added through the main chart.

The VStar export checkbox was enabled and the actual download completed. The file contains122 numeric rows with JD,magnitude,uncertainty and source comments. This walkthrough did not reopen that file in native VStar; ordinary and quality-filtered VStar2.25.0/macOS import was already tested separately. No passband calibration, AAVSO submission or complete eclipse detection is claimed. The final slide describes independent FITS follow-up; it does not depict FITS processing in this app.

No browser errors were logged at the end of capture. The slideshow asset/manifest/navigation regressions pass. Native Windows/macOS browser and mobile layout/accessibility checks remain in `../../tests/ENVIRONMENT-HANDOFF.md`. Browser captures do not establish scientific significance or full platform compatibility.

## Maintenance

The eight current images replace the earlier seven-slide historical sequence. Keep captions aligned with captured UI and the focused introduction. Regenerate through supported browser controls using clearly fictional data; do not retouch outcomes. Update `manifest.json` hashes, capture revision and evidence. `node tests/walkthrough.cjs` checks valid document structure, required DOM IDs, caption/manifest agreement, all image hashes and navigation boundaries. No build step is needed for hosting.

Substantial OpenAI Codex assistance under Chris Seabrooke’s direction. Analyzer runtime is unchanged by this walkthrough update.
