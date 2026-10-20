# Contributing

Fork this repository, make changes on a branch, and open a pull request describing the behavior change and validation performed. MIT licensing allows modifications and redistribution while retaining the copyright and license notice.

Start with [the changelog](CHANGELOG.md), [the architecture guide](photometry/ARCHITECTURE.md), and [test instructions](tests/README.md). AI assistants should also read [AGENTS.md](AGENTS.md).

## Keep the application standalone

Open `photometry/analyzer/index.html` directly to develop. Keep HTML, CSS, and JavaScript self-contained. Do not introduce runtime CDNs, uploads, API keys, servers, databases, analytics, or required build steps. Keep all observation processing in browser memory.

Preserve recorded clock timestamps, JD chronology, target separation, uncertainty handling, and the inverted magnitude axis. Never silently filter observations using `Is Variable`. Keep synthetic examples and heuristic variability warnings clearly labeled.

## Validation

Run `node tests/smoke.cjs` if Node is available. Node is only a development test tool, not needed by app users. Also open the app manually, download/import the synthetic eclipse data, switch themes and targets, check mouse/touch interaction, and exercise CSV, PNG, and report exports. Check small screens and keyboard navigation. Document any checks you cannot perform.

Run `node tests/analysis.cjs` for the public edge-case/state regressions. Optional `node tests/real-data.cjs <RT-file> <SS-file>` checks the original reference datasets when the owner supplies them. Never claim those private-data checks passed without running them on the actual inputs.

Do not commit personal observation files unless their owners explicitly authorize public redistribution. Use synthetic fixtures for new tests. Reports and downloads should not expose local filesystem paths or credentials.

## AI transparency

The original implementation was generated and revised with OpenAI Codex under Chris Seabrooke’s direction; see [AI-DISCLOSURE.md](AI-DISCLOSURE.md). Please disclose material AI assistance in pull requests, review generated code, and state the checks actually performed.

## Adding another app

Create a top-level folder with a short descriptive name (for example, `photometry/`). Keep its overview in `index.html`, its standalone tool in `analyzer/index.html` or another clearly named subfolder, and its examples and documentation alongside it. Add a card to the collection root `index.html`, update the root README project table and project count, and verify links in both directions. Do not overwrite another project. Clearly disclose material AI assistance and scientific limitations. Keep the collection static and avoid introducing runtime services.

## Review and release checklist

- Explain the user-visible problem/result and any scientific-method changes. Keep unrelated refactors separate.
- Add a dated changelog entry and update affected guides/comments/export descriptions. Do not invent version tags for untagged commits.
- Preserve exact target separation, NaN missing values, JD chronology/recorded-clock binning, inverted magnitudes, original-data ownership, and heuristic warnings.
- Add regression assertions for changed numerical/state behavior. Inspect browser rendering for chart/layout changes; simulated canvas checks alone do not verify pixels.
- State the exact commands and manual checks run, and remaining limitations. Avoid blanket claims of scientific correctness or full accessibility.
- GitHub Pages automatically deploys the `main` root. Wait for the relevant build to succeed, then verify affected live URLs. Forks must enable their own Pages setting and replace repository-specific public links if desired.
- Retain the MIT notice and disclose material AI assistance in the PR/commit description. Do not include private observations, credentials, or personal filesystem paths.
