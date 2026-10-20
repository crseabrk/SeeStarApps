# Contributing

Fork this repository, make changes on a branch, and open a pull request describing the behavior change and validation performed. MIT licensing allows modifications and redistribution while retaining the copyright and license notice.

## Keep the application standalone

Open `index.html` directly to develop. Keep HTML, CSS, and JavaScript self-contained. Do not introduce runtime CDNs, uploads, API keys, servers, databases, analytics, or required build steps. Keep all observation processing in browser memory.

Preserve recorded clock timestamps, JD chronology, target separation, uncertainty handling, and the inverted magnitude axis. Never silently filter observations using `Is Variable`. Keep synthetic examples and heuristic variability warnings clearly labeled.

## Validation

Run `node tests/smoke.cjs` if Node is available. Node is only a development test tool, not needed by app users. Also open the app manually, download/import the synthetic eclipse data, switch themes and targets, check mouse/touch interaction, and exercise CSV, PNG, and report exports. Check small screens and keyboard navigation. Document any checks you cannot perform.

Do not commit personal observation files unless their owners explicitly authorize public redistribution. Use synthetic fixtures for new tests. Reports and downloads should not expose local filesystem paths or credentials.

## AI transparency

The original implementation was generated and revised with OpenAI Codex under Chris Seabrooke’s direction; see [AI-DISCLOSURE.md](AI-DISCLOSURE.md). Please disclose material AI assistance in pull requests, review generated code, and state the checks actually performed.
