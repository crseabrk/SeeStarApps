# Instructions for AI coding assistants

These repository-wide instructions supplement the human user's request. Read `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, and the relevant project's architecture/validation notes before editing. The photometry implementation guide is `photometry/ARCHITECTURE.md`.

## Scope and architecture

- Root `index.html` is the project directory. Each project belongs in its own top-level folder.
- Photometry overview: `photometry/index.html`; tool: `photometry/analyzer/index.html`.
- Keep the photometry tool self-contained, browser-local, and usable from a local file. No runtime CDN, telemetry, file upload, API key, server, database, build system, or installation requirement.
- Do not replace the collection homepage with one app. For new apps, add a directory, project card, project count, and README table row; keep navigation reciprocal.

## Scientific invariants

- Preserve original imported observations; filtering derives new views. Do not reject rows using `Is Variable`.
- Keep target names separate. Same-name files combine within a single multi-file batch; combining with previously imported data requires explicit Add to session mode.
- JD/MJD establish chronology when available. Recorded clock timestamps determine clock-aligned bins. Do not apply browser-local timezone conversions or assume exposure equals cadence.
- Magnitudes are inverted. Sample SD uses N−1 and is undefined for one row. Missing numerical values remain missing, not zero.
- Never interpolate missing data silently. Preserve gap rules, legends, warnings, and measurement counts.
- Variability flags and tracking warnings are exploratory heuristics. Do not present them as probabilities, confirmed eclipses, forecasts, or proof of a slew.

## Editing and review

- Prefer focused changes. Keep source readable and explain scientific assumptions and state ownership in comments.
- Changes to formulas, clocks, gap rules, rejection rules, and synthetic generation need explicit regression checks and updated scientific documentation.
- Keep CSV field names/export schemas compatible unless the user requests a change; document migrations.
- Treat CSV content as untrusted data. Use textContent or HTML escaping for user-derived strings.
- Update `CHANGELOG.md` and affected docs with substantive changes. Do not fabricate release tags, test results, citations, or independent review.
- Disclose material AI assistance in the change description. Preserve MIT license notices and `AI-DISCLOSURE.md`.
- Use synthetic fixtures by default. Do not commit real observation files or private local paths without explicit redistribution authorization.

## Verification and publication

- From repository root run `node tests/smoke.cjs` and `node tests/analysis.cjs`. Node is a developer tool only.
- If real CSVs are supplied, use `node tests/real-data.cjs <RT-file> <SS-file>`; do not upload those inputs.
- Follow the manual checks in `tests/README.md` when relevant. A simulated canvas does not verify visual output, gestures, native downloads, or print rendering.
- GitHub Pages serves `main` at repository root. Use the user's authorized publication scope; a request to review code alone does not authorize deployment.
- Inspect current remote head and preserve unrelated work. Do not force-push. Wait for Pages deployment success before claiming a published change is live.
- Report what was tested and what was not. Documentation makes the code easier to review; it does not guarantee scientific correctness or accessibility compliance.
