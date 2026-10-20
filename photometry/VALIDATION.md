# Validation and limits

## Public regression checks

Run `node tests/run-all.cjs` from the repository root. Nine suites pass: smoke, analysis, browser-compat, session-audit, folder-access, star-tracks, gallery, catalogue and folder-memory. They execute the embedded runtime in a simulated DOM/canvas; they do not establish native browser permissions, storage persistence, layout, gestures or downloads.

Synthetic fixtures cover chronology/missing values/binning, import/reset/append state, named-target separation, tracking/variability false-positive cases, explicit picker/download plumbing, audit duplicate/conflict handling, star-association ambiguity/RA wrap/poles, gallery gaps/ranking/outliers, binary catalogue decoding and remembered-folder access logic.

## Targeted native observations

Earlier Safari 27.0.1/macOS 27.0.1 testing covered the prior runtime's synthetic import, chart/filter behavior, actual CSV/PNG/HTML downloads and offline report. Local and hosted morning-baseline synthetic bin results agreed. A fresh hosted interaction check of the subsequent compatibility release was unavailable; matching served bytes established source delivery, not a new native test.

The owner subsequently reported successful normal-Chrome folder scanning and supplied screenshots of gallery/chart/local-catalogue lookup and SIMBAD navigation. Exact browser version was not supplied. Codex embedded-browser directory selection returned AbortError on confirmation; ordinary file selection is the fallback.

Chrome reload/restart folder persistence, hosted new workflows, full native export/input/print verification, other Mac browsers, Windows and iOS/iPadOS remain pending. Earlier Safari results do not cover these new workflows. Follow tests/ENVIRONMENT-HANDOFF.md before declaring platform support complete.

## Owner-held checks

Additional owner-held observation and local-catalogue checks ran locally, including an independent binary decoder comparison. Input-specific measurements, coordinates, counts and derived statistics are retained privately. No raw inputs or catalogue records are included in this release. Historical numerical reference results previously documented publicly remain in Git history; this current report keeps private-input details out of the new publication.

## Scientific limits

Field associations are provisional and may fragment tracks or misassociate detections. Track counts are not unique physical-star counts. Review priority is an exploratory heuristic, not a calibrated probability, eclipse detector, classification or forecast. Catalogue proximity is a candidate association and does not confirm identity; proper-motion corrections and measurement-coordinate epoch are unverified. Binned magnitudes, exposure metadata and comparison-star behavior require independent assessment before scientific use.

See SESSION-PREVIEW.md for methods, limits and the next handoff. OpenAI Codex assisted development; these checks are not independent scientific validation.
