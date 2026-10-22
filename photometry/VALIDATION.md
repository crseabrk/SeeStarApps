# Validation and limits

## Public regression checks

Run `node tests/run-all.cjs` from the repository root. Nine suites pass: smoke, analysis, browser-compat, session-audit, folder-access, star-tracks, gallery, catalogue and folder-memory. They execute the embedded runtime in a simulated DOM/canvas; they do not establish native browser permissions, storage persistence, layout, gestures or downloads.

Synthetic fixtures cover chronology/missing values/binning, import/reset/append state, named-target separation, tracking/variability false-positive cases, explicit picker/download plumbing, audit duplicate/conflict handling, star-association ambiguity/RA wrap/poles, gallery gaps/ranking/outliers, binary catalogue decoding and remembered-folder access logic.

## Targeted native observations

Earlier Safari 27.0.1/macOS 27.0.1 testing covered the prior runtime's synthetic import, chart/filter behavior, actual CSV/PNG/HTML downloads and offline report. Local and hosted morning-baseline synthetic bin results agreed. A fresh hosted interaction check of the subsequent compatibility release was unavailable; matching served bytes established source delivery, not a new native test.

Successful normal-Chrome folder scanning was reported, with screenshots of gallery/chart/local-catalogue lookup and SIMBAD navigation. Exact browser version was not supplied. Codex embedded-browser directory selection returned AbortError on confirmation; ordinary file selection is the fallback.

Chrome reload/restart folder persistence, hosted new workflows, full native export/input/print verification, other Mac browsers, Windows and iOS/iPadOS remain pending. Earlier Safari results do not cover these new workflows. Follow tests/ENVIRONMENT-HANDOFF.md before declaring platform support complete.

## Private checks

Additional private observation and local-catalogue checks ran locally, including an independent binary decoder comparison. Input-specific measurements, coordinates, counts and derived statistics are retained privately. No raw inputs or catalogue records are included in this release. Historical numerical reference results previously documented publicly remain in Git history; this current report keeps private-input details out of the new publication.

## Scientific limits

Field associations are provisional and may fragment tracks or misassociate detections. Track counts are not unique physical-star counts. Review priority is an exploratory heuristic, not a calibrated probability, eclipse detector, classification or forecast. Catalogue proximity is a candidate association and does not confirm identity; proper-motion corrections and measurement-coordinate epoch are unverified. Binned magnitudes, exposure metadata and comparison-star behavior require independent assessment before scientific use.

See SESSION-PREVIEW.md for methods, limits and the next handoff. OpenAI Codex assisted development; these checks are not independent scientific validation.

## 2026-10-21 navigation follow-up

Remembered folders were reported to persist; exact origin/reload conditions and browser version were not supplied. Workflow numbering, import/rescan guidance, native gallery disclosure and return navigation were added. Nine simulated suites pass; gallery tests verify click-to-main, return to original tile, removed-tile fallback, back-to-top and reduced-motion behavior without changing measurements. Native layout/focus checks remain pending.

## 2026-10-21 thumbnail footprint and gallery controls

Nine suites pass with new checks for compact markers/caches, optional close-on-selection, bottom/main controls, native disclosure synchronization and analysis-state preservation. A development comparison using 500 synthetic tracks with 360 samples each retained identical numerical summaries/ranks, curve paths and marker centres. Serialized SVG size fell from 1,339,984 to 679,484 bytes (49.3%); SVG drawing elements fell from 19,500 to 2,000 (89.7%). Duplicate per-track SVG strings were removed; cached per-bin objects now retain only time/median. These are synthetic markup/structure measurements, not native browser heap or whole-app memory savings. Actual image pixels and browser heap remain unmeasured.

## 2026-10-21 screenshot walkthrough

Seven unmodified screenshots were captured from the hosted analyzer in the Codex in-app browser using fictional target/frame CSVs through the file chooser. Target import, completed scan, gallery, selected full curve, highlighted return and enabled export controls were observed. This is demonstration evidence only; folder-picker permissions, catalogue lookup, downloaded exports and cross-platform compatibility were not established by the captures. A static-asset/hash and simulated slideshow-navigation suite passes. Analyzer runtime and scientific methods are unchanged; local stress-test code is excluded from the walkthrough and release.

## 2026-10-22 named-track search integration

Integrated the contributed name-selection patch against cacf0ef. All ten automated suites pass on the Mac checkout, including normalized HD aliases, search before the 500-option cap, immediate plotting, reported-alias display, View plot focus/zoom retention and no-match preservation. Reviewed changes leave coordinate association and scientific formulas intact. Native browser, actual private sessions, shared-alias and export rendering checks remain in the environment handoff; no native compatibility result is inferred from the simulated DOM.


## 22 October 2026 — Collection triage release

Twelve synthetic/simulated-DOM suites passed against the release runtime via `node tests/run-all.cjs`. New tests cover import/run/identity/duplicate/conflict state, original-JD VStar output, reference provenance, shared shortlist controls, disclosures/setup and histogram quality counts/theme bindings. Local workflow checks and Mac VStar 2.25.0 imports (ordinary and quality-filtered) provide targeted native evidence; a test screenshot shows an imported file with JD, magnitudes and error bars. Exact browser versions were not recorded. No scientific calibration, false-positive completeness or all-platform pass is claimed. Current native matrix and follow-up steps are in tests/ENVIRONMENT-HANDOFF.md.
