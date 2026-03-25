# Generative Art System

Instructions for producing cover images across the site. Every article, demo, and project gets a unique square SVG composition.

---

## Aesthetic

Minimal geometric. Influenced by:
- Swiss/International style posters
- Bruno Munari's visual experiments
- Karl Gerstner's programmed design
- Josef Muller-Brockmann's grid compositions
- The inspiration images: clean shapes on neutral ground, precise placement, generous whitespace

## Rules

### Canvas
- Square: 600 x 600 px
- Background: `#FAFAF8` (warm white, matching site)
- No visible border

### Palette
- Primary: `#1C1C19` (near-black) for all main shapes
- Accent: `#E8B931` (brand yellow) on ~20% of compositions, one small element max
- No other colors. Ever.

### Shape Vocabulary
Limited set, used in combination:

| Shape | Notes |
|---|---|
| Circle | Filled or 1.5px stroke |
| Half-circle | Filled, any rotation |
| Quarter-circle | Filled, any rotation |
| Line | 1.5px stroke, straight, any angle |
| Rectangle | Filled or stroked, any proportion |
| Arc | 1.5px stroke, partial circle |

### Composition
- 2-5 elements per image. Never more.
- Elements should relate to each other geometrically (tangent, intersecting, parallel, concentric)
- At least 40% of the canvas should be empty space
- Shapes may extend beyond canvas edges (clipped)
- No text. No icons. No logos.
- Grid-aligned placement preferred (divide canvas into 6x6 or 12x12 grid)

### Thematic Connection
Each image should abstractly reference its content:
- Research (trust, collaboration) -> overlapping/touching shapes
- AI/ML topics -> precise geometry, intersecting lines
- Audio/music -> rhythm, repetition, sequence patterns
- Vision/detection -> frames, viewfinders, focal points
- Creative/art -> organic curves, asymmetry

The connection should be subtle. Viewers shouldn't need to "get it."

## Generation Script

`generate-art.js` is a canvas-based module that:
1. Takes a seed string (article slug)
2. Uses a deterministic PRNG seeded from the string
3. Selects 2-5 shapes from the vocabulary
4. Places them on a 600x600 grid
5. Optionally adds one brand yellow accent element
6. Exports as SVG or PNG

### Using the Script

**Browser demo:** Open `labs/generative-art.html` to generate and download art interactively.

**Programmatic:** The `GenerativeArt` class is in `generate-art.js`:
```js
const art = new GenerativeArt('my-seed-string');
const svg = art.toSVG();    // returns SVG string
const canvas = art.toCanvas(); // returns canvas element
```

### Seeds for Site Content

| Content | Seed |
|---|---|
| Decision-making with Robots | `research-decision-making` |
| Trust in AI Teams | `research-trust-teams` |
| HRI Studies | `research-hri-studies` |
| Conformity with Robot Peers | `research-conformity` |
| Sleeper Agents | `blog-sleeper-agents` |
| Trust in AI Demo | `demo-trust` |
| Emotion Detection | `demo-emotion` |
| Pose Estimation | `demo-pose` |
| Object Tracking | `demo-object` |
| Augmented Reality | `demo-ar` |
| Personality & AI Trust | `demo-personality` |
| Drum Machine | `demo-drum` |
| Jarvis Face HUD | `demo-jarvis` |
| Coffee Photography | `project-coffee` |
| Photography | `project-photography` |
| Creative Design | `project-creative` |
| Color Studies | `project-color` |

Run `generate-art.js` with these seeds to reproduce the site images.
