# How to Build a Person Analysis

Step-by-step guide for creating new person profiles in the Strategic Intelligence Briefs project. Follow this process and the [parent DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) to ensure consistency.

---

## Phase 1: Research

### What to research

The goal is **philosophical depth**, not biography. You're analyzing how this person thinks, not just what they've done. Focus on:

1. **Core philosophy** — What does this person believe about their domain? What are their first principles? What do they think "great" looks like?
2. **Taste / judgment formation** — How did they develop their perspective? What influences shaped them? How do they evaluate quality?
3. **Mental models / frameworks** — What recurring patterns, metaphors, or frameworks do they use to make decisions?
4. **Specific examples** — Product decisions, strategic choices, public statements that reveal the philosophy in action
5. **Strengths and weaknesses** — Where the approach excels and where critics identify failures
6. **Leadership style** — How they run teams, make decisions, and build culture
7. **Key quotes** — The most revealing statements, sourced and dated

### Where to research

Search broadly. Prioritize primary sources (their own words) over secondary analysis:

- **Long-form interviews** — Podcasts (Lex Fridman, Tim Ferriss, Joe Rogan, etc.), Charlie Rose, conference talks
- **Written work** — Essays, books, forewords, blog posts, letters
- **Profiles** — New Yorker, Vanity Fair, Wired, Fast Company, Fortune deep profiles
- **Conference talks** — TED, SXSW, industry conferences, keynotes
- **Documentaries** — If they appear in any
- **Quote databases** — Goodreads, BrainyQuote, Wikiquote (verify sourcing)
- **Biographies** — Authorized and unauthorized, for anecdotes and context
- **Criticism** — What do detractors say? Where has the approach failed?

### Research output

Compile research into a structured markdown file organized by topic (not chronologically). Include direct quotes with source attribution. Aim for enough material to write 10 full pages. Delete the research file after the pages are built.

---

## Phase 2: Plan the 10 Pages

Every profile has exactly 10 pages with the same filenames. The **nav labels can be adapted** to fit the person's domain, but the filenames stay the same.

| File | Default Label | Adapt For |
|------|--------------|-----------|
| `index.html` | Overview | Always "Overview" |
| `vision.html` | AI Vision | The person's domain vision (e.g., "Design Vision", "Creative Vision", "Production Philosophy") |
| `strategy.html` | Strategic Frameworks | Their mental models (e.g., "Taste & Philosophy", "Creative Frameworks", "Production Principles") |
| `strengths.html` | Strengths & Weaknesses | Always "Strengths & Weaknesses" |
| `personality.html` | Personality Profile | Always "Personality Profile" |
| `leadership.html` | Leadership Style | Always "Leadership Style" |
| `replicate.html` | What to Replicate | Always "What to Replicate" |
| `improve.html` | What to Improve | Always "What to Improve" |
| `quotes.html` | Key Quotes | Always "Key Quotes" |
| `playbook.html` | Action Playbook | Always "Action Playbook" |

**Before writing any HTML**, decide what the adapted nav labels will be. These must be consistent across all 10 files in the sidebar nav.

---

## Phase 3: Build the Pages

### Setup

1. Create the folder: `analysis/{firstname-lastname}/` (kebab-case)
2. Reference the parent `DESIGN_SYSTEM.md` in the repo root for design tokens and principles
3. Every page links to `../base.css` and `../base.js` — no inline styles or scripts

### Page-by-page content guide

#### Overview (`index.html`)
- Hero: name, role, source list
- Quick facts: 6 items in a 2-column grid (adapt to the person — age, role, notable works, education, tenure, honors, etc.)
- Executive summary: 2-3 paragraphs explaining **why this person's thinking is worth studying**. Not biography — philosophy.
- Section index: linked cards to all 9 other pages with brief descriptions

#### Vision (`vision.html`)
- The person's **worldview about their domain**
- What do they believe "great" looks like? What are they optimizing for?
- Use the `page-label` + `h1` + `subtitle` header pattern
- Sections separated by `<hr class="divider">`
- Rich with blockquotes from primary sources

#### Frameworks (`strategy.html`)
- **Numbered mental models** using the `.framework` component
- Each framework gets: large number, title, explanation, supporting quote, and an `.application` box with practical takeaway
- Use `<hr class="framework-separator">` between frameworks
- Aim for 8-12 frameworks

#### Strengths & Weaknesses (`strengths.html`)
- Capability meter bars (`.meter-row`) — 8-10 capabilities, scored /10, ordered high to low
- Numbered strength items (`.item`) — 5-7 strengths with evidence
- Numbered weakness items (`.item`) — 5-7 weaknesses with evidence
- Be honest. Every person has real weaknesses. The analysis is useless if it's hagiography.

#### Personality Profile (`personality.html`)
- Big Five trait bars with descriptions and evidence
- Additional sections on formative experiences, psychological patterns, key relationships
- The goal is to understand **how this person thinks and feels**, not just what they do

#### Leadership Style (`leadership.html`)
- Long-form analysis using the section/divider pattern
- How they build teams, make decisions, handle conflict
- Key relationships and partnerships
- Team structure and rituals

#### What to Replicate (`replicate.html`)
- 6-8 numbered items using the `.item` pattern
- Each item: title, explanation with evidence, supporting quote, "How to apply" section
- Actionable patterns others can adopt

#### What to Improve (`improve.html`)
- 5-7 numbered items using the `.item` pattern
- Each item: title, "The gap" section, "The opportunity" section
- Honest assessment of where the approach falls short

#### Key Quotes (`quotes.html`)
- Quotes grouped by theme using `.quote-section`
- Each quote: text in `.quote-text`, source in `.quote-source`
- 30-50 quotes across 6-10 themes
- Always include source and year when known

#### Action Playbook (`playbook.html`)
- 6-8 numbered items using `.playbook-item`
- Each: heading, detailed actionable text, source reference
- End with a closing quote (`.closing`)
- These should be things someone can do **Monday morning**

### Content standards

- **Tone**: Analytical, direct, no filler. Write like a senior analyst briefing a CEO.
- **Evidence**: Every claim backed by a quote, data point, or specific example.
- **HTML entities**: `&mdash;` for em dashes, `&middot;` for dots, `&ndash;` for ranges, `&amp;` for ampersands
- **Footer**: Every page ends with `<hr class="divider">` then `<div class="footer">For internal use &middot; {Month Year}</div>`

---

## Phase 4: Update the Landing Page

1. Add a card to the appropriate section in `analysis/index.html`
2. If a new section is needed (e.g., "Music Production"), add a `<div class="section-break">` with a `<div class="section-label">`
3. Card format:
```html
<a href="./{person-slug}/index.html" class="card">
    <div class="card-name">{Full Name}</div>
    <div class="card-role">{Title / Role}</div>
    <div class="card-desc">{One sentence on why their thinking is worth studying}</div>
    <span class="card-link">Read brief &rarr;</span>
</a>
```

---

## Phase 5: Verify

- All 10 HTML files exist and link to `../base.css` and `../base.js`
- No inline `<style>` or `<script>` blocks
- Sidebar nav is identical across all 10 pages (except the `class="active"` link)
- Landing page card links correctly
- Clean up any research working files

---

## Common Mistakes

- Writing biography instead of philosophy. The question is always "how does this person think?" not "what did they do?"
- Hagiography. Every person has real weaknesses. Include them with evidence.
- Surface-level quotes. Dig for the revealing statements, not the polished soundbites.
- Inconsistent nav labels. Decide the adapted labels once and use them identically in all 10 files.
- Missing source attribution on quotes. Always include source and year when known.
- Using inline styles. Everything goes through `base.css`.
