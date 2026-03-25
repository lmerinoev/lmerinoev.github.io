# Blog Post Outline Structure

Template for writing blog articles about research papers on this site. Each blog post lives in `blog/` and follows this structure.

## Metadata (HTML header area)

- **Title**: The paper's actual title
- **Subtitle**: One sentence, your angle on why to read this (not a question, not clickbait)
- **Date**: Paper's publication month and year
- **Topics**: 3-4 topic keywords

### Authorship rule

You (Luis Merino) are the author of every blog post. The blog is your writing about the research, not the researchers' writing. Never display paper authors in the article header — it implies they wrote the post. Instead, credit the paper and its authors in the sidebar under "Paper Details" and link to the original paper. The header should only contain the title, subtitle, date, and topics.

## Section Structure

### 1. Context (1-2 paragraphs)

What problem does this paper address? What was the state of things before this work? Ground the reader in the background they need without over-explaining. Assume the reader knows what LLMs are but might not know the specific subfield.

### 2. What They Did (2-3 paragraphs)

Describe the experimental setup. What did the researchers build, test, or measure? Be concrete: name the methods, describe the scenarios, explain the variables. This section is factual and descriptive.

### 3. What They Found (2-4 paragraphs)

Present the results. Use subheadings (h3) if there are multiple distinct findings. Stick to what the data shows. Include the key result from the paper as a pull quote (highlight-box).

### 4. Why It Matters (1-2 paragraphs)

Connect the findings to the broader field. What assumptions does this challenge? What does it change about how we should think? Stay grounded in what the paper actually demonstrates. Don't speculate beyond what the results support.

### 5. Open Questions (1-2 paragraphs)

What does this work leave unresolved? What should come next? This section acknowledges limitations and points forward without hand-wraving.

## Sidebar

- **Quick Navigation**: Links to each h2 section
- **Paper Details**: Paper authors, author count, date, arXiv ID (this is where paper authors belong, not the header)
- **Actions**: Link to the original paper

## Key Findings Box

Place one `key-findings` box after the "What They Found" section. Use 4-6 bullet points. Each bullet should be one concrete factual statement. No adjectives, no editorializing.

## Pull Quote

One pull quote per post, placed in the "Context" or "What They Found" section. Use a direct quote from the paper or a tight paraphrase of the central result.

## Writing Rules

Follow `WRITING_STYLE.md` for all prose. Refer to that file for tone, banned patterns, and self-check steps.

## File Naming

Use kebab-case based on the short paper name: `blog/sleeper-agents.html`, `blog/scaling-laws.html`, etc.
