# Instructions for AI coding assistants

These repository-wide instructions supplement the human user's request. Read `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, and the relevant project's architecture/validation notes before editing. The photometry implementation guide is `photometry/ARCHITECTURE.md`.

## Scope and architecture

- Root `index.html` is the project directory. Each project belongs in its own top-level folder.
- Photometry overview: `photometry/index.html`; tool: `photometry/analyzer/index.html`.
- Keep the photometry tool self-contained, browser-local, and usable from a local file. No runtime CDN, telemetry, observation upload, API key, server, required database, build system, or installation requirement. Optional user-selected local catalogue files and browser-stored directory handles are allowed; external SIMBAD navigation must remain explicit-click only.
- Do not replace the collection homepage with one app. For new apps, add a directory, project card, project count, and README table row; keep navigation reciprocal.

## Scientific invariants

- Preserve original imported observations; filtering derives new views. Do not reject rows using `Is Variable`.
- Collection objects use conservative positional association, never name-only identity. Keep source runs/provenance separate, deduplicate exact observation keys and flag conflicts. Adding to accepted observations requires explicit Add to collection. See photometry/COLLECTION-WORKFLOW.md.
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

- From repository root run `node tests/smoke.cjs` and `node tests/analysis.cjs`, plus `node tests/browser-compat.cjs`. Node is a developer tool only.
- If real CSVs are supplied, use `node tests/real-data.cjs <RT-file> <SS-file>`; do not upload those inputs.
- Follow the manual checks in `tests/README.md` when relevant. A simulated canvas does not verify visual output, gestures, native downloads, or print rendering.
- GitHub Pages serves `main` at repository root. Use the user's authorized publication scope; a request to review code alone does not authorize deployment.
- Inspect current remote head and preserve unrelated work. Do not force-push. Wait for Pages deployment success before claiming a published change is live.
- Report what was tested and what was not. Documentation makes the code easier to review; it does not guarantee scientific correctness or accessibility compliance.

## Cross-environment testing and Codex handoffs

The owner requires coverage across the supported environments, regardless of where a change is developed. This applies to Windows Codex, Mac Codex, and cloud sessions alike.

- Maintain an explicit matrix in `tests/ENVIRONMENT-HANDOFF.md`: Windows (Edge/Chrome and Firefox), macOS (Safari and Chrome/Firefox), and iOS/iPadOS Safari for the advertised touch controls. Check both standalone local HTML where supported and hosted HTTPS. Record actual OS/browser versions, revision, actions, results, and limitations. A Node test or Linux WebKit run does not establish native Windows, macOS Safari, or iOS compatibility.
- Before declaring cross-platform compatibility complete, test every supported environment affected by the change. Do not silently mark an unavailable environment as passed or treat another platform's results as a substitute.
- If you cannot test an environment yourself, leave actionable instructions for another Codex session in `tests/ENVIRONMENT-HANDOFF.md`: the revision to use, required environment, commands, manual steps, expected results, and remaining failures or unknowns. Preserve existing results and identify what needs retesting after new changes.
- Tell the owner explicitly which environment is needed and ask them to continue in that environment (for example, Windows Codex on the PC or local Mac Codex). Do not stop with an unexplained test limitation or suggest cloud testing proves native OS behavior.
- A user-authorized publication may proceed with disclosed outstanding checks; publication does not turn those checks into passes. Keep the handoff and validation record current as work progresses.

## Photometry product promise

For photometry changes, read `photometry/PRODUCT-SCOPE.md` and preserve its audience, scientific limits and browser-only/read-only boundaries. The promise is to explore Seestar measurements, assess consistency and identify observations worth investigating further. Keep planned capabilities distinct from shipped behaviour. Every substantive change must explain its user need, evidence limits, provenance/source safety and actual validation. No complete eclipse detection, discovery confirmation or automatic calibrated-magnitude claims. Do not reinterpret this scope document as an instruction to implement its roadmap immediately.
