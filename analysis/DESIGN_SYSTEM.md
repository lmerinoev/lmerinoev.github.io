# Strategic Intelligence Briefs — Design System

Reference for building new person profiles. All profile pages share `base.css` and `base.js` from the `/analysis/` root.

---

## Architecture

```
analysis/
├── index.html              ← Landing page (card grid, has its OWN inline styles)
├── base.css                ← Shared styles for all profile pages
├── base.js                 ← Shared sidebar toggle JS
├── DESIGN_SYSTEM.md        ← This file
└── {person-slug}/          ← One folder per person (kebab-case)
    ├── index.html          ← Overview
    ├── vision.html         ← AI Vision
    ├── strategy.html       ← Strategic Frameworks
    ├── strengths.html      ← Strengths & Weaknesses
    ├── personality.html    ← Personality Profile
    ├── leadership.html     ← Leadership Style
    ├── replicate.html      ← What to Replicate
    ├── improve.html        ← What to Improve
    ├── quotes.html         ← Key Quotes
    └── playbook.html       ← Action Playbook
```

Every profile has exactly **10 pages**. Same filenames, same nav order, every time.

---

## Design Tokens (CSS Variables)

Defined in `:root` in `base.css`. Use these — never hardcode colors.

| Token             | Value       | Usage                              |
|-------------------|-------------|------------------------------------|
| `--bg`            | `#ffffff`   | Page background                    |
| `--bg-secondary`  | `#f5f5f7`   | Cards, application boxes, hover bg |
| `--text`          | `#1d1d1f`   | Primary text, headings             |
| `--muted`         | `#86868b`   | Labels, subtitles, nav links       |
| `--light`         | `#aeaeb2`   | Footer text, decorative numbers    |
| `--border`        | `#e5e5e5`   | Dividers, sidebar border           |
| `--quote-border`  | `#d2d2d7`   | Blockquote left border             |
| `--sidebar-w`     | `240px`     | Sidebar width                      |
| `--font`          | System stack | `-apple-system, 'Helvetica Neue', 'Segoe UI', sans-serif` |

**Typography scale**: Base is `15px` on `html`, line-height `1.75`.

---

## Page Shell (Required for Every Profile Page)

Every profile page must use this exact structure. Only change the `<title>`, the `sidebar-name`, and which nav link gets `class="active"`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Page Title} — {Person Name}</title>
    <link rel="stylesheet" href="../base.css">
</head>
<body>

<button class="hamburger" aria-label="Toggle navigation">
    <span></span>
    <span></span>
    <span></span>
</button>

<div class="overlay"></div>

<aside class="sidebar">
    <a href="../index.html" class="sidebar-back">&larr; All Profiles</a>
    <div class="sidebar-name">{Person Full Name}</div>
    <nav>
        <a href="index.html">Overview</a>
        <a href="vision.html">AI Vision</a>
        <a href="strategy.html">Strategic Frameworks</a>
        <a href="strengths.html">Strengths &amp; Weaknesses</a>
        <a href="personality.html">Personality Profile</a>
        <a href="leadership.html">Leadership Style</a>
        <a href="replicate.html">What to Replicate</a>
        <a href="improve.html">What to Improve</a>
        <a href="quotes.html">Key Quotes</a>
        <a href="playbook.html">Action Playbook</a>
    </nav>
</aside>

<main class="main">
    <!-- Page content here -->
</main>

<script src="../base.js"></script>
</body>
</html>
```

**Rules:**
- No `id` attributes on hamburger, overlay, or sidebar — JS uses class selectors
- No `onclick` attributes — `base.js` handles all events
- No inline `<style>` blocks — all styling comes from `base.css`
- No inline `<script>` blocks — only `<script src="../base.js"></script>`
- No wrapper `<div class="layout">` — sidebar and main are direct children of `<body>`
- The `<main class="main">` element holds all page content

---

## Page-by-Page Content Patterns

### 1. Overview (`index.html`)

The profile landing page. Hero info, quick facts, executive summary, and section index.

```html
<main class="main">

    <!-- Hero -->
    <h1 class="hero-name">{Person Name}</h1>
    <p class="hero-role">{Title, Company}</p>
    <p class="hero-sources">{Source 1} &middot; {Source 2} &middot; ...</p>

    <hr class="divider">

    <!-- Quick Facts (2-column grid) -->
    <div class="quick-facts">
        <div class="fact-item">
            <span class="label">{Label}</span>
            <span class="fact-value">{Value}</span>
        </div>
        <!-- Repeat for each fact (typically 6) -->
    </div>

    <hr class="divider">

    <!-- Executive Summary -->
    <p class="section-heading">Executive Summary</p>
    <div class="summary">
        <p>...</p>
        <p>...</p>
    </div>

    <hr class="divider">

    <!-- Section Index (links to all other pages) -->
    <p class="section-heading">Sections</p>
    <div class="index-grid">
        <a href="vision.html" class="index-item">
            <div class="index-title">AI Vision</div>
            <div class="index-desc">Brief description of what this section covers</div>
        </a>
        <!-- Repeat for all 9 other sections -->
    </div>

    <!-- Footer -->
    <hr class="divider">
    <div class="footer">For internal use &middot; {Month Year}</div>

</main>
```

---

### 2. AI Vision (`vision.html`)

Long-form analysis with sections separated by dividers. Uses `page-label` for the person's name above the title.

```html
<main class="main">

    <div class="page-label">{Person Name}</div>
    <h1>AI Vision</h1>
    <p class="subtitle">{One-sentence description}</p>

    <section class="section">
        <h2>{Section Title}</h2>
        <p>Body text...</p>
        <blockquote>
            <p>"Quote text"</p>
        </blockquote>
        <p>More body text...</p>
    </section>

    <hr class="divider">

    <!-- Repeat section + divider pattern -->

</main>
```

**Blockquote with source attribution** (used when citing specific interviews):
```html
<blockquote>
    <p>"Quote text here."</p>
    <div class="source">&mdash; {Person Name}, {Source}</div>
</blockquote>
```

---

### 3. Strategic Frameworks (`strategy.html`)

Numbered frameworks with large decorative numbers and application boxes.

```html
<main class="main">

    <h1 class="page-title">Strategic Frameworks</h1>
    <p class="page-subtitle">{N} mental models that shape how {Name} thinks about...</p>

    <hr class="divider">

    <p class="section-heading">Overview</p>
    <p class="intro">{Introductory paragraph}</p>

    <!-- Repeat for each framework -->
    <hr class="framework-separator">
    <div class="framework">
        <div class="framework-header">
            <span class="framework-number">01</span>
            <h2 class="framework-title">{Framework Name}</h2>
        </div>
        <div class="framework-body">
            <p>Explanation...</p>
            <blockquote><p>"Supporting quote"</p></blockquote>
            <p>More explanation...</p>

            <div class="application">
                <div class="application-label">Application</div>
                <p>Practical takeaway for the reader.</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <hr class="divider" style="margin-top: 80px;">
    <div class="footer">For internal use &middot; {Month Year}</div>

</main>
```

---

### 4. Strengths & Weaknesses (`strengths.html`)

Capability meter bars followed by numbered strength/weakness items.

```html
<main class="main">

    <h1 class="hero-name">Strengths &amp; Weaknesses</h1>
    <p class="hero-subtitle">Capability assessment, core strengths, and critical gaps</p>

    <hr class="divider">

    <!-- Capability Assessment (meter bars) -->
    <p class="section-heading">Capability Assessment</p>
    <div class="meters">
        <div class="meter-row">
            <span class="meter-label">{Capability Name}</span>
            <div class="meter-track"><div class="meter-fill" style="width: {N}%"></div></div>
            <span class="meter-value">{N/10}</span>
        </div>
        <!-- Repeat, ordered high to low -->
    </div>

    <div class="section-gap"></div>

    <!-- Strengths -->
    <p class="section-heading">Strengths</p>

    <div class="item">
        <div class="item-number">01</div>
        <div class="item-title">{Strength Name}</div>
        <p class="item-body">{Explanation with evidence}</p>
    </div>
    <!-- Repeat -->

    <div class="section-gap"></div>

    <!-- Weaknesses -->
    <p class="section-heading">Weaknesses</p>

    <div class="item">
        <div class="item-number">01</div>
        <div class="item-title">{Weakness Name}</div>
        <p class="item-body">{Explanation with evidence}</p>
    </div>
    <!-- Repeat -->

    <hr class="divider">
    <div class="footer">For internal use &middot; {Month Year}</div>

</main>
```

---

### 5. Personality Profile (`personality.html`)

Big Five trait bars followed by personality analysis sections.

```html
<main class="main">

    <h1 class="page-title">Personality Profile</h1>
    <p class="page-subtitle">{Short summary}</p>

    <hr class="divider">

    <!-- Big Five Traits -->
    <div class="section">
        <p class="section-heading">Big Five Traits</p>
        <ul class="trait-list">
            <li class="trait-item">
                <div class="trait-header">
                    <span class="trait-name">{Trait}</span>
                    <span class="trait-level">{Very High|High|Moderate|Low-Moderate|Low}</span>
                </div>
                <div class="trait-bar-track"><div class="trait-bar-fill" style="width: {N}%"></div></div>
                <div class="trait-desc">{Evidence-based explanation}</div>
            </li>
            <!-- Repeat for all 5 traits -->
        </ul>
    </div>

    <hr class="divider">

    <!-- Additional personality sections as needed -->
    <div class="section">
        <h2>{Section Title}</h2>
        <p>...</p>
    </div>

</main>
```

---

### 6. Leadership Style (`leadership.html`)

Long-form analysis with standard section/divider pattern. Same structure as Vision.

```html
<main class="main">

    <div class="page-label">{Person Name}</div>
    <h1>Leadership Style</h1>
    <p class="subtitle">{Archetype name} &mdash; {brief description}</p>

    <section class="section">
        <h2>{Archetype Name}</h2>
        <p>...</p>
    </section>

    <hr class="divider">

    <!-- Repeat section + divider for each aspect of leadership -->

</main>
```

---

### 7. What to Replicate (`replicate.html`)

Numbered items with quotes and "How to apply" callouts.

```html
<main class="main">

    <h1 class="hero-name">What to Replicate</h1>
    <p class="hero-subtitle">{N} patterns worth adopting from {Name}'s approach</p>

    <hr class="divider">

    <div class="item">
        <div class="item-number">01</div>
        <div class="item-title">{Pattern Name}</div>
        <p class="item-body">{Explanation with evidence}</p>
        <blockquote class="item-quote">"Supporting quote"</blockquote>
        <div class="item-apply-label">How to apply</div>
        <p class="item-apply">{Practical advice}</p>
    </div>
    <!-- Repeat -->

</main>
```

---

### 8. What to Improve (`improve.html`)

Numbered items with "The gap" and "The opportunity" sub-sections.

```html
<main class="main">

    <h1 class="hero-name">What to Improve Upon</h1>
    <p class="hero-subtitle">{N} gaps and opportunities for those learning from {Name}'s approach</p>

    <hr class="divider">

    <div class="item">
        <div class="item-number">01</div>
        <div class="item-title">{Gap Name}</div>
        <div class="item-section-label">The gap</div>
        <p class="item-body">{What's missing or weak}</p>
        <div class="item-section-label">The opportunity</div>
        <p class="item-body">{How to do it better}</p>
    </div>
    <!-- Repeat -->

</main>
```

---

### 9. Key Quotes (`quotes.html`)

Quotes grouped by theme.

```html
<main class="main">

    <h1 class="page-title">Key Quotes</h1>

    <hr class="divider">

    <div class="quote-section">
        <p class="quote-section-title">{Theme: e.g., "On Vision"}</p>

        <div class="quote-block">
            <p class="quote-text">"{Quote}"</p>
            <p class="quote-source">{Source and year}</p>
        </div>
        <!-- Repeat for each quote in this theme -->
    </div>

    <!-- Repeat quote-section for each theme -->

    <hr class="divider">
    <div class="footer">For internal use &middot; {Month Year}</div>

</main>
```

---

### 10. Action Playbook (`playbook.html`)

Numbered actionable items with source references, ending with a closing quote.

```html
<main class="main">

    <h1 class="page-title">Action Playbook</h1>
    <p class="page-subtitle">What to do Monday morning</p>

    <hr class="divider">

    <div class="playbook-item">
        <div class="playbook-number">01</div>
        <div class="playbook-content">
            <p class="playbook-heading">{Action Title}</p>
            <p class="playbook-text">{Detailed advice}</p>
            <p class="playbook-source">Source: {Framework or principle name}</p>
        </div>
    </div>
    <!-- Repeat -->

    <!-- Closing quote -->
    <div class="closing">
        <hr class="divider">
        <p class="closing-quote">"{Defining quote}"</p>
        <p class="closing-attr">&mdash; {Person Name}</p>
    </div>

    <hr class="divider">
    <div class="footer">For internal use &middot; {Month Year}</div>

</main>
```

---

## Component Reference

### Dividers

Use between major sections. Two options:

```html
<!-- As <hr> (preferred) -->
<hr class="divider">

<!-- As <div> (alternate) -->
<div class="section-divider"></div>
```

Both render as a 1px `--border` line with `64px` vertical margin.

### Blockquotes

```html
<!-- Simple -->
<blockquote>
    <p>"Quote text here."</p>
</blockquote>

<!-- With source -->
<blockquote>
    <p>"Quote text here."</p>
    <div class="source">&mdash; Person Name, Source</div>
</blockquote>
```

### Labels / Section Headings

Small uppercase labels that introduce a section:

```html
<p class="section-heading">Section Name</p>    <!-- 11px, uppercase, muted -->
<p class="page-label">Person Name</p>          <!-- 11px, uppercase, muted -->
<div class="section-label">Category</div>      <!-- Same styling -->
<span class="label">Field Name</span>          <!-- Same styling -->
```

### Timeline

Vertical timeline with circle markers:

```html
<div class="timeline">
    <div class="timeline-item">
        <div class="timeline-era">Era Label &middot; Date Range</div>
        <h4>Phase Title</h4>
        <p>Description...</p>
        <blockquote><p>"Quote"</p></blockquote>
    </div>
    <!-- Repeat -->
</div>
```

### Progression (Step Indicator)

Horizontal steps with arrows:

```html
<div class="progression">
    <span class="progression-step">Step 1</span>
    <span class="progression-arrow">&rarr;</span>
    <span class="progression-step">Step 2</span>
    <span class="progression-arrow">&rarr;</span>
    <span class="progression-step">Step 3</span>
</div>
```

### Clean List (Custom Bullets)

Replaces default `<ul>` with small circle markers:

```html
<ul class="clean-list">
    <li>Item text</li>
    <li>Item text</li>
</ul>
```

### Application Box

Gray callout box for practical takeaways (used in strategy pages):

```html
<div class="application">
    <div class="application-label">Application</div>
    <p>Practical advice text.</p>
</div>
```

---

## Responsive Behavior

Two breakpoints:

| Breakpoint    | What happens                                                        |
|---------------|---------------------------------------------------------------------|
| `<= 840px`   | Sidebar hides off-screen, hamburger button appears, main goes full-width |
| `<= 480px`   | Headings shrink, padding tightens, grids go single-column           |

No media queries needed in individual pages — `base.css` handles everything.

---

## Adding a New Person

1. **Create the folder**: `analysis/{firstname-lastname}/` (kebab-case)
2. **Create all 10 HTML files** using the page shell and content patterns above
3. **Add a card** to `analysis/index.html`:
   ```html
   <a href="./{firstname-lastname}/index.html" class="card">
       <div class="card-name">{Full Name}</div>
       <div class="card-role">{Title, Company}</div>
       <div class="card-desc">{One sentence about why they're worth studying}</div>
       <span class="card-link">Read brief &rarr;</span>
   </a>
   ```
4. **Do not** add inline styles or scripts to any profile page
5. **Do not** change class names or HTML structure — consistency is the point

---

## Content Guidelines

- **Tone**: Analytical, direct, no filler. Write like a senior analyst briefing a CEO.
- **Evidence**: Every claim backed by a quote, data point, or specific example.
- **Quotes**: Use `&mdash;` for attribution dashes, `&middot;` for separator dots, `&ndash;` for ranges, `&amp;` for ampersands.
- **Numbers**: Spell out one through nine, use numerals for 10+. Use `$19B` not `$19 billion`.
- **Footer**: Every page ends with `<hr class="divider">` then `<div class="footer">For internal use &middot; {Month Year}</div>`.

---

## What NOT to Do

- Do not add page-specific `<style>` blocks. If you need a new component, add it to `base.css`.
- Do not use `id` attributes for JS targeting — use classes only.
- Do not use `onclick` or other inline event handlers.
- Do not wrap content in a `.layout` div.
- Do not create a different mobile nav approach (no top bars, no dropdown menus).
- Do not change the nav link order or page filenames.
- Do not use colors outside the design token palette.
