# Design System

The governing design language for the entire site. Every page, component, and subsystem inherits from this document.

---

## Philosophy

Reduced, intentional, tactile. Every element earns its place. If it doesn't serve function, remove it.

**Core influences:**
- Teenage Engineering (playful precision, exposed structure, considered constraints)
- Braun / Dieter Rams (less but better, clarity through reduction)
- Apple (material honesty, typographic confidence, whitespace as structure)
- Brian Eno (generative thinking, ambient presence, oblique process)
- Japanese architecture (ma: the meaningful void, wabi-sabi, natural materials)
- Popeye magazine / city boy aesthetic (effortless curation, quiet taste)
- Specialty coffee culture (craft obsession, ritual, attention to process)

**Design principles:**
1. **Subtract until it breaks.** Then add one thing back.
2. **Quiet confidence.** No decoration for its own sake. Let the work speak.
3. **Tactile presence.** Interfaces should feel like well-made objects, not flat screens.
4. **Measured color.** Yellow is the brand signal. Use it like Braun uses yellow on a watch dial: small, precise, unmistakable.
5. **Typography carries the design.** When in doubt, make the type better instead of adding a graphic.
6. **Honest materials.** Show structure. Don't hide the grid. Let the system breathe.

---

## Color

### Brand Yellow

The signature accent. Never the loudest element on the page. Used for:
- Active states, selected indicators
- Small UI signals (dots, underlines, thin borders)
- Hover accents on interactive elements
- Occasional typographic emphasis (sparingly)

```
--brand:          #E8B931    /* Primary brand yellow, warm and muted like aged brass */
--brand-light:    #F2D166    /* Hover / expanded states */
--brand-subtle:   #E8B93115  /* Background tints, barely there */
--brand-muted:    #E8B93140  /* Borders, dividers with warmth */
```

Think: the yellow second hand on a Braun BN0021. The orange dial on a Teenage Engineering OP-1. A single line of color in a monochrome room.

### Neutrals

The foundation. Warm-tinted grays that feel natural, not clinical.

```
--white:          #FAFAF8    /* Warm white, not pure. Like good paper. */
--gray-50:        #F5F5F3    /* Backgrounds, cards */
--gray-100:       #EBEBE7    /* Borders, dividers */
--gray-200:       #D4D4CF    /* Disabled states, subtle borders */
--gray-300:       #A8A8A3    /* Placeholder text */
--gray-400:       #787873    /* Secondary text, labels */
--gray-500:       #58584F    /* Body text alternative */
--gray-600:       #3A3A35    /* Strong secondary text */
--gray-700:       #2A2A26    /* Headings on light bg */
--gray-800:       #1C1C19    /* Primary text */
--gray-900:       #0D0D0B    /* Darkest, near black */
--black:          #0D0D0B    /* True dark */
```

### Dark Mode

Inverted with care. Not pure black. Deep warm tones.

```
--dm-bg:          #141412    /* Background */
--dm-surface:     #1E1E1B    /* Cards, elevated surfaces */
--dm-border:      #2E2E2A    /* Borders */
--dm-text:        #E8E8E4    /* Primary text */
--dm-muted:       #8A8A85    /* Secondary text */
```

### Functional Colors

Used only when semantically necessary. Never decorative.

```
--success:        #4A7C59    /* Muted sage green */
--error:          #C45B4A    /* Warm terracotta red */
--info:           #5B7B8C    /* Steel blue, understated */
```

---

## Typography

### Font Stack

```
--font-sans:      'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:      'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

Inter for everything. Monospace for code, data labels, and technical details where the fixed-width grid adds meaning.

### Scale

Modular scale based on 1rem = 16px. Use `rem` for sizing, never `px` for text.

```
--text-xs:        0.75rem     /* 12px — footnotes, legal */
--text-sm:        0.875rem    /* 14px — labels, captions, metadata */
--text-base:      1rem        /* 16px — body text */
--text-lg:        1.125rem    /* 18px — lead paragraphs, emphasis */
--text-xl:        1.25rem     /* 20px — section intros */
--text-2xl:       1.5rem      /* 24px — h3 */
--text-3xl:       1.875rem    /* 30px — h2 */
--text-4xl:       2.25rem     /* 36px — h1 */
--text-5xl:       3rem        /* 48px — hero, display */
--text-6xl:       3.75rem     /* 60px — large display, numbers */
```

### Weights

```
--font-light:     300         /* Large display text only */
--font-regular:   400         /* Body text */
--font-medium:    500         /* Labels, buttons, nav */
--font-semibold:  600         /* Headings, emphasis */
```

No bold (700) in regular use. Semibold is the ceiling. Confidence comes from size and spacing, not weight.

### Line Height

```
--leading-tight:  1.2         /* Headings, display text */
--leading-normal: 1.6         /* Body text */
--leading-loose:  1.8         /* Long-form reading, analysis pages */
```

### Letter Spacing

```
--tracking-tight: -0.02em    /* Large headings (2xl and above) */
--tracking-normal: 0          /* Body text */
--tracking-wide:  0.05em     /* All-caps labels, small text */
```

---

## Spacing

8px base grid. Every spatial decision is a multiple of 8.

```
--space-1:   0.25rem    /* 4px — micro adjustments only */
--space-2:   0.5rem     /* 8px — tight internal padding */
--space-3:   0.75rem    /* 12px — compact spacing */
--space-4:   1rem       /* 16px — standard internal padding */
--space-6:   1.5rem     /* 24px — section internal spacing */
--space-8:   2rem       /* 32px — component gaps */
--space-12:  3rem       /* 48px — section spacing */
--space-16:  4rem       /* 64px — major section breaks */
--space-24:  6rem       /* 96px — hero / large section padding */
--space-32:  8rem       /* 128px — page-level vertical rhythm */
```

Whitespace is structure. Generous spacing signals confidence. Cramped layouts signal uncertainty.

---

## Layout

### Container

```
--container-sm:   640px      /* Blog posts, long-form reading */
--container-md:   768px      /* Analysis pages, focused content */
--container-lg:   1024px     /* General pages */
--container-xl:   1200px     /* Homepage, wide layouts */
```

### Grid

CSS Grid as the primary layout tool. Flexbox for component internals only.

Standard content grid:
```css
.grid {
    display: grid;
    gap: var(--space-6);
}
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
```

Collapse to single column at `768px`.

---

## Components

### Tactile Elements

The skeuomorphic thread. Used sparingly for interactive components. These should feel like physical controls: buttons that depress, knobs that turn, surfaces with material weight.

**Principles for tactile elements:**
- Subtle shadows suggest depth, not flashy 3D effects
- Borders have slight radius (4-8px), like machined edges
- Active/pressed states shift shadow inward
- Surfaces have micro-texture through subtle gradients, not images

```css
/* Tactile button base */
.btn-tactile {
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 6px;
    box-shadow:
        0 1px 2px rgba(0,0,0,0.08),
        inset 0 1px 0 rgba(255,255,255,0.6);
    transition: all 120ms ease;
}
.btn-tactile:active {
    box-shadow:
        inset 0 1px 3px rgba(0,0,0,0.12);
    transform: translateY(0.5px);
}
```

**Brand-accented tactile button:**
```css
.btn-brand {
    /* Same tactile base, but with the yellow signal */
    border-bottom: 2px solid var(--brand);
}
```

### Cards

Flat. No heavy shadows. Differentiated by background color shift and thin border.

```css
.card {
    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: 8px;
    padding: var(--space-6);
}
.card:hover {
    border-color: var(--gray-200);
}
```

### Navigation

Minimal. Text-based preferred over icons. Active state indicated by brand yellow underline or dot, never a background fill.

```css
.nav-link.active {
    color: var(--gray-800);
    border-bottom: 2px solid var(--brand);
}
```

### Dividers

Thin, warm gray. Never heavy. A whisper, not a shout.

```css
.divider {
    border: none;
    border-top: 1px solid var(--gray-100);
    margin: var(--space-12) 0;
}
```

---

## Motion

Minimal. Functional only. No animation for entertainment.

```
--duration-fast:    80ms      /* Button press, toggle */
--duration-normal:  160ms     /* Hover states, color changes */
--duration-slow:    300ms     /* Layout shifts, reveals */
--easing:           cubic-bezier(0.25, 0.1, 0.25, 1)
```

**Rules:**
- Hover transitions: `160ms ease`
- No bounce, no spring, no elastic. Clean mechanical movement.
- Page transitions: fade only, `300ms`
- Scroll behavior: `smooth` with `scroll-padding-top` set
- Reduced motion: respect `prefers-reduced-motion` always

---

## Imagery

- Photography: high contrast, desaturated. People or objects in context, never stock.
- Illustrations: line-based, single weight. Think technical drawings, not cartoons.
- Icons: stroke-based, 1.5px weight, consistent grid. No filled icons unless active state.
- Screenshots / UI: displayed in device frames with subtle shadow. Let the work be the focus.

---

## Borders and Radius

```
--radius-sm:   4px       /* Small elements, tags, badges */
--radius-md:   8px       /* Cards, buttons, inputs */
--radius-lg:   12px      /* Modals, large containers */
--radius-xl:   16px      /* Hero sections, feature cards */
--radius-full: 9999px    /* Pills, avatars */
```

Prefer `8px` as the default. The Teenage Engineering OP-1 radius: not sharp, not soft. Precise.

---

## Responsive Behavior

### Breakpoints

```
--bp-sm:   480px     /* Small mobile */
--bp-md:   768px     /* Tablet / large mobile */
--bp-lg:   1024px    /* Small desktop */
--bp-xl:   1280px    /* Standard desktop */
```

### Rules

- Mobile first. Base styles are mobile, layer up.
- At `768px`: collapse grids to single column, increase touch targets to 44px minimum.
- At `1024px`: introduce multi-column layouts, sidebar nav where applicable.
- Typography scales down on mobile: display text caps at `2.25rem`, body stays at `1rem`.
- Spacing compresses proportionally but never below `--space-4` for section gaps.

---

## Brand Usage

The yellow is the signature. It's the red dot on a Leica. The orange dial on an OP-1. The yellow seconds hand on a Braun watch.

**Do:**
- Use for active navigation indicators (thin underline or dot)
- Use for a single accent element per section (one link, one border, one dot)
- Use for interactive feedback (button hover border, toggle active)
- Use in monospace/technical contexts (code highlights, data emphasis)

**Don't:**
- Fill large areas with brand yellow
- Use as background color for sections
- Apply to body text or headings
- Combine with other saturated colors in the same view
- Use more than 2-3 instances of yellow per viewport

The ratio: 95% neutral, 5% brand. If yellow is noticeable before the content, you've used too much.

---

## Subsystem Inheritance

All subsystems (analysis profiles, blog, labs, research) inherit these foundations. Subsystem-specific design documents may extend tokens but must not override core values.

**What subsystems inherit:**
- Color palette (neutrals and brand yellow)
- Typography scale and font stack
- Spacing system
- Motion values
- Responsive breakpoints
- Design principles

**What subsystems may define:**
- Layout structure specific to their content type
- Additional component patterns
- Content-specific tokens (e.g., analysis meter colors)
- Navigation patterns appropriate to their depth

Subsystem guidelines reference this document as the source of truth.

---

## Code Standards

- CSS custom properties for all design tokens. Never hardcode.
- No inline `<style>` blocks except landing/index pages with unique layouts.
- No inline `onclick` or event attributes. JS in external files.
- Class selectors only. No IDs for styling.
- BEM-style naming: `.component`, `.component-element`, `.component--modifier`.
- Mobile-first media queries: `@media (min-width: ...)`.
- Prefer `rem` for sizing, `em` for component-internal relative sizing.

---

## Social Meta Tags

Every HTML page must include Open Graph and Twitter Card meta tags in the `<head>`. These control how links appear when shared on Twitter/X, LinkedIn, Slack, iMessage, and other platforms.

### Required tags

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="One-sentence description.">
<meta property="og:image" content="https://full-url-to-image.jpg">
<meta property="og:type" content="article">  <!-- or "website" for index/landing pages -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@HipsterCow">
<meta name="twitter:image" content="https://full-url-to-image.jpg">
```

### Rules

- `og:title`: Use the page's `<title>` content (without the " - Luis Merino" suffix).
- `og:description`: One sentence. Match the existing `<meta name="description">` if present.
- `og:image` and `twitter:image`: Must be an absolute URL (not a relative path). Use the page's hero image if it has one. For pages without a hero image, use a relevant Unsplash image at `w=1200&q=80`.
- `twitter:card`: Always `summary_large_image`. Never `summary`.
- `og:type`: Use `article` for blog posts, research, and analysis pages. Use `website` for index pages, landing pages, and labs.
- Place these tags after `<meta name="author">` and before stylesheet links.

### Image guidelines for social cards

- Minimum 1200x630px for best rendering across platforms.
- Unsplash images work well. Append `&w=1200&q=80` to the URL.
- Do not use SVGs. Social platforms do not render them as card images.

### Checklist for new pages

Before publishing any new page, verify:
1. All seven meta tags are present in `<head>`.
2. `og:image` and `twitter:image` URLs load correctly in a browser.
3. `twitter:card` is set to `summary_large_image`.
4. Test with the Twitter Card Validator if possible.
