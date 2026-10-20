# Session and field analysis: implementation notes

This document describes the owner-authorized integration of the local prototypes into SeeStarApps. Prepared with substantial OpenAI Codex assistance. Private observation files, catalogue records and data-derived test statistics are not included. The user workflow is in [README.md](README.md).

## Session audit

CSV files are read sequentially, with a 16 MiB per-file limit. The scanner counts FITS/JPEG files without reading their contents. A staged cancelled/entirely unreadable scan preserves accepted results; individual file failures are labelled partial. Session enumeration is capped at 100,000 entries.

`decodeCSV(..., true)` accepts valid unnamed rows for the scanner. Standard log import counts/skips unnamed rows separately from invalid magnitude/time rows. Exact numeric JD, RA, DEC and sensor X/Y form one exported observation's key. A blank frame Name is permitted when comparing a named-log counterpart; other field differences are reported. Duplicate matches and duplicate anchors remain ambiguous. Matched frame rows never add points to the imported log. Audit JSON retains bounded provenance examples and error examples.

## Provisional coordinate tracks

A unit-sphere spatial hash associates observations within 3 arcseconds of a running mean direction. Matches require a unique candidate and one-to-one per-exposure assignment. Same-frame competing neighbours are withheld. Names and magnitudes do not influence association. Multi-exposure logs and repeated exposure JDs are skipped for tracking.

Missing candidates start new tracks; ambiguities remain unassigned. No retrospective merge is attempted. Track fragments can overlap and cause additional ambiguity. Counts are not a census of unique physical stars. IDs and initial coordinate labels are fixed within a scan; new scans rebuild them. Exported catalogue snapshots are not resumable sessions. A 1.5 million retained-observation limit labels further omissions as partial. Field tracking retains points in browser memory.

## Gallery and ranking

All tracks meeting search/minimum-count filters appear as static SVG curves; the dropdown separately caps its list at 500. Four CSS tile sizes do not recalculate curves. Numerical summaries and the last-used SVG scale are cached per track.

Thumbnails use unfiltered 5-minute medians, a common session time extent and magnitude offsets from each track's median, increasing downward. Gaps over 15 minutes are disconnected. JD-derived UTC bins provide a shared physical axis where available; recorded-clock fallback applies only without JD. Main-chart recorded-clock bins remain unchanged. Shared scale spans all thumbnail medians; outliers can compress it. Individual auto-scale can exaggerate small changes.

Review priority is the 90th-minus-10th percentile of binned medians divided by max(0.02 mag, median finite within-bin SD), multiplied by min(1, qualified bins / 12). At least five bins with >=3 points are required; otherwise the score is zero. This heuristic can rank fragments/instrumental trends highly and miss brief events. It is not a probability or matching-quality score. Alternative sorts use observation count or robust binned range.

## Explicit catalogue queries

The optional reader implements ASTAP Appendix 3: current .1476 cells with a 110-byte header and 5/6-byte records. It was exercised on an owner-held D80 database; other variants require verification. Installers/ZIPs, .290 and .001 are unsupported. No ASTAP executable is required or launched. See https://www.hnsky.org/astap.htm#1476.

Attachment indexes filenames/handles only. A user click requests a 10-arcsecond cone search around the plotted or selected position. Nearby cells are decoded in bounded chunks; up to 100 nearest candidates are retained. Missing cells, parse errors and cancellation are reported. Compact records have no designations: file/record labels are provenance, not names. Header epoch/band are displayed; proper motion and measurement-coordinate epoch differences are not corrected. A nearby result is not an identification.

The selected-position SIMBAD link uses a 10-arcsecond radius; per-candidate links use 5 arcseconds around the catalogue position. Explicit clicks open external navigation with no referrer. No online query, track renaming or identity acceptance is automatic.

## Remembered folders

IndexedDB stores session/catalogue directory handles, not absolute paths, observations or analysis results. Separate picker IDs let supporting browsers remember picker locations. Startup restores handles only; no read or permission request occurs. Reopen controls explicitly request read permission and initiate the corresponding workflow.

Storage failures leave current-session folder selection usable. Forget clears this app's handle store without deleting source files, changing results or revoking browser permissions. Private browsing, cleared browser data, disconnected drives and origin policy can affect persistence. Hosted and local-file storage are separate.

## Verification and tomorrow's handoff

Run `node tests/run-all.cjs` for nine public synthetic/simulated-DOM suites. These cover import/state behavior, matching/crowding/wrap/poles, gap/ranking rules, catalogue decoding, explicit-only lookup and folder-memory logic. Owner-held data checks were also performed locally; their inputs and derived results remain private.

The owner reported successful normal-Chrome folder workflow and supplied UI/lookup screenshots, without an exact browser version. This is targeted observation, not universal compatibility. Codex embedded folder selection returned AbortError on confirmation; ordinary file selection is the fallback.

Next: verify hosted HTTPS in normal Chrome; record OS/browser/revision; check gallery/tile scales, plot/return, audit/catalogue exports and explicit links; verify folder persistence across reload/restart, denial, disconnected drives and forgetting. Native new-workflow checks on Safari/Firefox, Windows and iOS/iPadOS remain pending. Improve association fragmentation only with truth-labelled validation. Polling remains off.
