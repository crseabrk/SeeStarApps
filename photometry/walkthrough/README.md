# Analyzer walkthrough

Open index.html in a browser. Seven slides with real unmodified JPEG screenshots of the hosted analyzer, captions, buttons, keyboard arrows and numbered dot navigation. No runtime dependencies or network calls are required; the optional About link navigates externally only on click. No autoplay.

Captured 2026-10-21 in Codex in-app browser at its default narrow viewport. These are real app captures, not generated mockups. Synthetic target and field CSVs were selected through actual file chooser controls. Folder permission/listing and FITS/JPEG reads were not exercised. No private observations, catalogue database or stress-test data used. No automatic catalogue lookup or SIMBAD contact occurred. Export controls were enabled; downloads were not tested as part of this walkthrough.

Synthetic fixture: 180 exposures at a two-minute cadence across 358 minutes, 24 widely separated fixed positions, 4,320 measurements, a target log for SIM Demo 01, deliberately generated dips/waves/trends/flat profiles with seeded noise and a sensor-coordinate step. All 180 target rows reconciled exactly; 24 tracks and 4,320 assigned measurements; no ambiguous/invalid rows. This easy fixture is demonstrative, not a benchmark of real crowded-field completeness. Shapes are invented, not astrophysical models or detection evidence.

An actual full curve, gallery, auto-close, highlighted return and export-control state were inspected. Browser console returned no error logs at the end of capture. Existing screenshot limitations (narrow layout, clipped long chart titles and table overflow) are retained rather than retouched. A local slideshow source/asset check and navigation-state check accompany the build. Native Chrome/Windows/Safari slideshow rendering remains unverified.

Published at https://crseabrk.github.io/SeeStarApps/photometry/walkthrough/ and linked from the project introduction and guides. Screenshots and captions only are shipped; the local stress tool, raw observation files and synthetic fixture ZIP are excluded. Substantial OpenAI Codex assistance under Chris Seabrooke’s direction.

## Maintenance

Keep captions aligned with the actual captured UI. Regenerate screenshots through supported browser controls using fictional data only; never retouch results or fabricate intermediate states. Preserve synthetic labels and the limits on detection, associations and validation. Update manifest image hashes when replacing captures. The underlying analyzer snapshot is a09a270ca8ae31c3bb2738364550b013dec50074. Run `node tests/walkthrough.cjs` to check asset hashes, link targets and navigation state. No build step is needed to serve the walkthrough.

## Capture age

These screenshots predate the 2026-10-22 name-selection update. The current app uses View plot in place of Plot selected star, automatically updates the curve on dropdown/matching-search selection and includes reported aliases in track titles. The screenshots remain a labelled historical UI snapshot; their underlying measurement workflow is unchanged.


The 22 October collection-triage release changes import/object/run selection, quality histograms and shortlist/Setup. These screenshots predate that layout. They remain an illustration of the gallery/curve/export idea; use the current introduction and guide for exact steps. Recapture with synthetic data on a future documentation pass.
