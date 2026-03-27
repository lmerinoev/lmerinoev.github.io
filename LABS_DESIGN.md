# Labs Design System

Guidelines for creating and displaying labs (interactive experiments) on the site.

## Terminology

Use "Labs" everywhere. Not "Demos", "Interactive Experiments", or "Experiments". A lab is a browser-based interactive project.

## Lab Gallery (labs/index.html)

The gallery uses `.lab-gallery` (CSS grid) with `.lab-card` items. Each card shows the generative art icon, a tag, title, description, and status indicator.

### Card structure

```html
<a href="lab-url.html" class="lab-card" data-tags="vision ai">
    <div class="lab-card-art">
        <img src="../images/art/seed-name.svg" alt="">
    </div>
    <div class="lab-card-body">
        <div class="lab-card-tag">Vision</div>
        <div class="lab-card-title">Lab Name</div>
        <div class="lab-card-meta">One sentence description.</div>
        <div class="lab-card-status">Live</div>
    </div>
</a>
```

### Featured card

Add `.lab-card--featured` for the first/highlighted lab. It renders as a horizontal layout on tablet+ (art on left, content on right) and spans the full grid width.

### Filters

Filter buttons use `.lab-filter` with `data-filter` attributes. Tags on cards use `data-tags` (space-separated). Current categories: vision, audio, ai, generative.

### Grid layout

- Mobile: 1 column
- Tablet (640px+): 2 columns
- Desktop (1024px+): 3 columns

## Lab Page Template

Each lab page follows this structure:

```html
<!-- Nav (shared) -->
<nav class="nav">...</nav>

<!-- Hero -->
<section class="hero">
    <div class="container">
        <div class="hero-label"><span class="hero-label-dot"></span>Lab</div>
        <h1 class="hero-title">Lab Name</h1>
        <p class="hero-subtitle">One sentence about what this does.</p>
    </div>
</section>

<!-- Lab content -->
<section class="section">
    <div class="container">
        <!-- Lab-specific interactive content goes here -->
    </div>
</section>

<!-- Footer (shared) -->
<footer class="footer">...</footer>
```

### Requirements for every lab

1. Use the shared `styles.css` stylesheet
2. Include the favicon link
3. Include the shared nav with Labs as the active link
4. Include the shared footer
5. Hero label should say "Lab" (not "Demo")
6. Generate a unique art icon using the generative art script with seed `demo-{name}`
7. Add the lab to `labs/index.html` gallery with appropriate tags
8. Add the lab to the main page Labs section
9. Add the lab to `sitemap.xml` and `llms.txt`
10. Include Open Graph and Twitter Card meta tags (see `DESIGN_SYSTEM.md` > Social Meta Tags). Set `og:type` to `website` and `twitter:card` to `summary_large_image`

### Art icon

Every lab gets a generated SVG icon:

```bash
node -e "const GA = require('./generate-art.js'); const fs = require('fs'); fs.writeFileSync('images/art/demo-{name}.svg', new GA('demo-{name}').toSVG());"
```

## Status indicators

- **Live**: Lab is functional and accessible
- Use the green dot indicator (`.lab-card-status::before`)

## Naming

- File: `labs/{name}.html` or root-level `{name}.html` for legacy labs
- Art seed: `demo-{name}`
- URL: Keep kebab-case
