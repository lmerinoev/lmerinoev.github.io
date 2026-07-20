# ◆ Terradex

A Pokédex for places. A private, offline-first PWA styled like a limited-color
e-ink display (think Pebble Time 2 / pocket e-ink readers): paper, ink, one
gray, and red + green accents. No gradients, no eased motion — pages swap
instantly, like an e-ink partial refresh.

Live at `/terradex/` on the site. Unlisted and `noindex`, like Habitat.

## What it does

- **DEX** — numbered entries for places visited, en route, and wanted.
  Each entry has an engraved-style SVG "field plate" (fine line art with
  hatch/stipple shading — the kind of image a real e-ink panel renders
  beautifully), type chips, stats, flavor text, and three tabs: **FACTS**,
  **HISTORY** (human timeline), and **DEEP TIME** (geology and paleontology
  back to the Precambrian).
- **MAP** — a dot-matrix world map. Diamonds mark entries: solid red =
  collected, green outline = en route, ink outline = uncharted.
- **◆ MARK COLLECTED** — tap when you've stood on the ground. Stored in
  `localStorage` on the device, stamped with the date.

## Adding an entry (the workflow)

Entries are authored in code, with Claude, so each one is researched and
shipped as a commit:

1. Ask Claude for a new place ("add Kyoto to the terradex").
2. Claude researches facts / history / deep time, draws a sprite, and appends
   an object to `DEX` in `data.js` (schema documented at the top of that file).
3. Bump `CACHE` in `sw.js` (e.g. `terradex-v1` → `terradex-v2`) so installed
   phones pick up the new entry.
4. Commit and push. The PWA updates on next open (network-first SW).

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell: styles, router, all views |
| `data.js` | The dex entries — the only file that changes per entry |
| `map-data.js` | Generated dot-grid world land mask |
| `sw.js` | Service worker (offline cache, network-first) |
| `manifest.webmanifest`, `icon*` | PWA install metadata |

`map-data.js` is generated from Natural-Earth-derived GeoJSON by a small
Python rasterizer (point-in-polygon over a 120×50 grid, Antarctica omitted).

## Someday

Port to a real pocket e-ink panel. The palette, instant refresh model, and
dot-matrix rendering are already designed for that constraint.
