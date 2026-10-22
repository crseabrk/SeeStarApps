# Collection workflow and triage implementation

Current release: 22 October 2026. Substantial OpenAI Codex assistance. The authoritative runtime is the single standalone `analyzer/index.html`; development preview builders and stress tools are not release dependencies.

## State and import

`collection` owns objects, source runs, source metadata, errors and partial state. Each object owns run-specific pieces. `activeObjectId`, `activeRunIds` and `markedObjects` own selection and review state. `readCollection` stages a replacement or clone for explicit add. Cancellation/unusable imports preserve accepted observations; partial readable imports report failures. File contents are never changed. Refresh discards observations/marks; IndexedDB holds optional directory handles only.

Each input CSV is bounded to 16 MiB; enumeration caps at 100,000 entries; the collection budgets 1.5 million valid absolute-JD input rows, including duplicate source exports. Field CSV records are staged for chronological association, rather than streaming an arbitrarily ordered directory directly into tracks. This can increase peak memory. No tenfold stress workload or larger development cap ships.

Explicit target import classifies files as target histories. Mixed import recognises a Photometry path, single-exposure field filenames, or multi-epoch named histories. Ambiguous layouts ask for explicit target import. Absolute JD (or decoded MJD) is required; unsupported clock-only rows are counted/reported, never guessed into a night. Dedicated target files remain separate run coverage; segmentation uses a configurable gap (default 30 minutes, minimum 5) or a >30-arcsecond target-position change. Field segmentation uses directory changes, the gap, or >0.5-degree catalogue-centroid motion. Detection changes can move that centroid, so segmentation is a suggestion. There is no manual run split/merge UI.

## Identity and overlap

Field association reuses unit-sphere 3-arcsecond unique one-to-one tracking per exposure. Each run's completed tracks or target pieces attach to an object only when there is a unique eligible positional candidate. One field track per run can join an object. Names are aliases, never matching keys. Object IDs remain fixed in the collection but rebuild on import. Fragmentation and mistaken associations remain possible; ambiguous associations are flagged.

`combinePieces` keys observations by exact finite JD/RA/DEC/X/Y, preferring target-source rows but retaining source pieces. Finite disagreements in magnitude, uncertainty, SNR, exposure or reference count are conflicts. Incomplete keys are not deduplicated. Repeated non-identical detections at a JD are ambiguous. A target/field duplicate is one observation, not independent corroboration. Reference roles and reference magnitude are retained as reports, not independent catalogue truth.

## Views and diagnostics

Run selection creates object adapters for the existing gallery/plot renderer. Chronology still comes from JD, while recorded clocks retain the existing main-chart bin convention. Run IDs survive bin summaries and thumbnail caches; median paths do not bridge runs. Movement checks and exploratory variability screening run separately per source run. Cross-night zero-point offsets remain unchanged. Thumbnail curves use unfiltered five-minute summaries; main-chart quality filters do not alter gallery thumbnails or ranking.

Quality distributions use 24 equal-width bins over finite nonnegative values for the current object/included runs. Sliders span min/max; exact numeric entry is retained with out-of-range warnings. Histograms show unfiltered data even when hiding is enabled. Missing values appear only in counts. Striped portions represent the actual failing count within each bin, including bins crossing the cutoff. Theme CSS variables drive solid/flag/axis/slider colours immediately without recomputing measurements. The combined flagged count is a union; SNR, uncertainty and intersection counts are reported separately. Threshold logic is unchanged.

All major sections use native details disclosures, except the internal hidden legacy binding panel. Chart/object/gallery review controls share mark/note state. Setup contains catalogue selection and remembered-folder controls; lookup remains explicit in the analysis area. CSV fields used as HTML are escaped; user notes/results use escaped text or textContent.

## Specialist handoff

VStar output uses simple-format JD,magnitude,optional uncertainty rows and `#` comments. It exports individual selected-object observations for included runs, optionally applying the current quality thresholds independently of the chart Hide checkbox. Conflicts, ambiguous epochs and ambiguous multi-run identity block export until the user narrows/resolves selection. No timestamp midpoint, HJD/BJD, passband or magnitude calibration is fabricated. Native loading of ordinary and quality-filtered exports was tested in VStar 2.25.0 on macOS; there is no automated VStar launch/IPC or claim of scientific validation.

Review JSON `seestar-candidate-review-1` stores marked IDs/aliases/positions/notes and source/run metadata, not a complete observation workspace. It cannot restore a session. PNG, binned CSV and offline report retain their existing output schemas; run colours aid visual separation but those older exports are not replacements for detailed run provenance. The provisional catalogue remains a snapshot. Historical single-target audit internals remain for regression/renderer reuse; current collection overlap review supersedes their visible workflow.

For period/time-series work, use exported measurements in VStar. For independent brightness measurement or calibration, select the original FITS exposures in a dedicated photometry tool. FITS pixels, not just headers, are required to remeasure flux. The analyzer does not read FITS pixels or remeasure apertures. Triage prioritises human inspection and traceable follow-up, not complete eclipse detection.

## Verification and limitations

`node tests/run-all.cjs` runs twelve suites against the actual runtime. `collection.cjs` covers mixed import, positional association, run boundaries, exact duplicate/conflict handling, cancellation/replacement/add, reference provenance and start-JD export. `collection-layout.cjs` covers disclosure structure/navigation, shared marks/notes, setup placement, quality distributions/thresholds, overlap counts and theme-variable bindings. Existing parser/numerical/tracker/catalogue/persistence and walkthrough regressions remain. Legacy name-based import ownership tests were replaced by current collection-state tests; core clock-only parser behavior remains tested separately.

Local import, gallery and quality controls were tested successfully in normal Chrome, and exports were tested in VStar. The Chrome version was not recorded. These are targeted observations. Simulated DOM/canvas tests do not establish painted contrast, native picker permissions, actual gestures, screen-reader behavior or all browsers. See `../tests/ENVIRONMENT-HANDOFF.md` for native work still needed. No private observations or derived capture statistics are bundled.
