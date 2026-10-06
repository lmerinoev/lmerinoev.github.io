# Reward Math

A static study site on how large language models are trained, focused on the math of reward and preference training. Eight modules, a glossary and a resources page. Plain HTML, CSS and JavaScript with no build step.

Live at **https://lmerinoev.github.io/reward-math/** once this folder is on the `main` branch.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Contents page, progress summary, export and import |
| `neural-networks.html` … `reward-hacking.html` | Modules 1 to 8 |
| `glossary.html` | Every term defined in the modules, linking to where it is introduced |
| `resources.html` | Videos, books and papers in a suggested order |
| `assets/style.css` | All styles and color tokens |
| `assets/site.js` | Theme toggle, math rendering, symbol highlighting, progress, the interactive figures, the cat drawings |
| `assets/modules.js` | The module list and exercise counts used for progress tracking |
| `assets/fonts/` | Charis SIL and IBM Plex Mono (SIL Open Font License, license files included) |

All links are relative, so the folder works under any path.

## Run it locally

```sh
cd lmerinoev.github.io
python3 -m http.server 8000
# open http://localhost:8000/reward-math/
```

Opening the files directly with `file://` also works, except that some browsers block `localStorage` there.

## Editing

- Each page is a complete HTML file. Edit it directly.
- Math is written as TeX in `data-tex` attributes and rendered by KaTeX 0.16.9 from cdnjs (loaded with integrity hashes). Color roles are macros: `\Cw{}` preferred response, `\Cl{}` rejected response, `\Cm{}` model being trained, `\Cf{}` fixed function, `\Cr{}` reference model and penalty terms, `\Cx{}` uncolored but highlightable.
- A symbol key (`<ul class="key" data-for="eq-…">`) highlights matching colored symbols when a row is pointed at, focused or tapped.
- Terms are marked `<dfn id="t-…">`. If you add one, add it to `glossary.html` too.
- If you add or remove an exercise, update that module's `questions` count in `assets/modules.js`, or progress totals will be off.

## Progress and privacy

Progress (exercises ticked, modules finished) and the theme choice are stored in `localStorage` under keys starting with `reward-math:`. Every read and write is wrapped in `try/catch`, and the site works without storage. Because storage is per browser, the contents page has **Export progress** (downloads a JSON file) and **Import progress** (reads one back, replaces current progress, with an Undo). Imported files are validated and anything unknown is dropped.

There is no backend, no accounts, no analytics and no tracking. The only third-party request is KaTeX from cdnjs. Fonts are self-hosted.

## Design notes

- **References.** Textbooks for structure (numbered sections, equations and exercises, notes in the margin); interactive explainers in the style of Bartosz Ciechanowski for figures that sit inside the prose; the site's `DESIGN_SYSTEM.md` for using color sparingly.
- **Color has one job.** The interface is monochrome. Color appears only in mathematics, and each of the five hues always means the same thing.
- **Type.** Charis SIL for everything, IBM Plex Mono for hand calculations.
- **Layout.** A 620px reading column with a 230px margin for symbol keys on wide screens. On phones the key moves below its formula, and wide formulas scroll inside their own box.
- **Boxes.** Only interactive figures get a background.
- **Cats.** A few gray line drawings sit on rules and in margins. They are decorative, hidden from screen readers and ignore the pointer.

## Deployment

This repository is already a GitHub Pages user site, so nothing needs configuring: once `reward-math/` is merged to `main`, it is served at `https://lmerinoev.github.io/reward-math/`.

If Pages is ever turned off, re-enable it under **Settings → Pages → Build and deployment**: set **Source** to "Deploy from a branch", **Branch** to `main` and the folder to `/ (root)`, then save.
