# SeeStarApps

An open-source collection of Seestar astronomy tools by **Seabrooke.Astronomy**.

[Browse projects](https://crseabrk.github.io/SeeStarApps/) · [See the analyzer in action](https://crseabrk.github.io/SeeStarApps/photometry/walkthrough/) · [Contribute](CONTRIBUTING.md) · [MIT license](LICENSE) · [AI disclosure](AI-DISCLOSURE.md)

For maintainers: [Changelog](CHANGELOG.md) · [Architecture and algorithms](photometry/ARCHITECTURE.md) · [Tests and verification limits](tests/README.md) · [AI editing instructions](AGENTS.md).

## Projects

| Project | Overview | Tool | Documentation |
|---|---|---|---|
| Seestar Photometry Analyzer | [Explore](https://crseabrk.github.io/SeeStarApps/photometry/) | [Open analyzer](https://crseabrk.github.io/SeeStarApps/photometry/analyzer/) | [Guide](photometry/README.md) |

## Repository layout

- `index.html`: collection directory.
- `photometry/index.html`: photometry project overview.
- `photometry/analyzer/index.html`: self-contained tool.
- `photometry/`: project documentation, preview, and synthetic sample CSV.
- `tests/smoke.cjs`: optional developer check; run `node tests/smoke.cjs` from the repository root.

Open the root page locally to browse projects, or open the analyzer HTML directly. The analyzer requires no server, installation, account, build step, or network connection. Publish the repository root through GitHub Pages (`main`, root directory).

## Add a project

Create a descriptive top-level folder containing a project overview and its app. Add a project card to root `index.html`, update the project count, and add a row to the table above. Keep project-specific code, examples, and documentation in that folder. See [CONTRIBUTING.md](CONTRIBUTING.md).

## AI development disclosure

OpenAI Codex generated and revised the code, analysis heuristics, synthetic data generator, tests, site organization, and documentation under the direction of Chris Seabrooke / Seabrooke.Astronomy. Requirements, real test observations, and feedback came from Chris. See [AI-DISCLOSURE.md](AI-DISCLOSURE.md) for scope and limitations. Automated checks do not constitute independent scientific validation.

## Blogger

Link to the collection or project overview for background. Embed the photometry tool with:

```html
<iframe src="https://crseabrk.github.io/SeeStarApps/photometry/analyzer/"
  title="Seestar Photometry Analyzer"
  style="width:100%;height:1400px;border:0;border-radius:12px"
  loading="lazy"></iframe>
<p><a href="https://crseabrk.github.io/SeeStarApps/photometry/analyzer/"
  target="_blank" rel="noopener">Open analyzer in a full window</a></p>
```

## License

MIT. Fork, modify, and redistribute while retaining the copyright and license notice.
