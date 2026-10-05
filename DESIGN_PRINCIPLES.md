# Design Principles

How to make decisions when designing any page, app, or UI in this repo. `DESIGN_SYSTEM.md` says what things look like (tokens, type, color). This file says how to decide. When they conflict, the user's own words win, then `DESIGN_SYSTEM.md` (or a sub-project's own design notes), then this file.

Sources: Apple Human Interface Guidelines, [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles); Dieter Rams, ten principles of good design; Jakob Nielsen, [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/); [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Apple HIG: the eight principles, as rules

**Purpose**
- Before designing, write down what the thing is for in one sentence. Cut anything that doesn't serve it.
- Make the few most-used features excellent instead of adding more.
- Look at how existing products solve the problem. Don't copy them; decide what makes this one different.

**Agency**
- Get people straight to the task or content. No splash screens, intros, or forced tours.
- Don't lock people into flows or modes. Any guided flow needs a visible skip or exit.
- Make actions reversible (undo, back, confirm destructive actions inline). Never lose someone's work or state.

**Responsibility**
- Say plainly what the product does and what data it stores, and where.
- Collect only what's needed. Default to local storage, no tracking, no analytics, no accounts.

**Familiarity**
- Use patterns people already know: standard links, buttons, checkboxes, back navigation.
- Once a component looks or behaves a certain way, keep it that way everywhere.
- Give clear feedback for every action: hover, pressed, focus, loading, saved, error.

**Flexibility**
- Treat accessibility as a requirement from the start, not a later pass.
- Keep controls and content in the same place across pages and screen sizes.
- Support touch, mouse, and keyboard. Every interactive element is reachable and usable by keyboard.
- Design phone and desktop with equal care. Neither is the afterthought.

**Simplicity**
- Simplicity is not minimalism. Keep what's important close at hand and let the rest fall away.
- Use the fewest, plainest words that do the job, especially on labels and buttons.
- Build a clear hierarchy so people always know where they are and what comes next.

**Craft**
- Every detail counts: spacing, alignment, wording, motion. Be deliberate with each one.
- Prototype early and throw away what doesn't work. Test in real conditions (real phone width, real content, both themes).
- Keep the quality bar after shipping.

**Delight**
- Pick the one feeling the product should create (calm, focused, energized) and let it drive choices.
- Put character into a few defining moments (an empty state, a completion, an error message).
- Delight is not decoration. Nothing decorative may get in the way of the task.

## Dieter Rams (fits this site's existing system)

Good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally friendly, and as little design as possible. In practice: less, but better.

## Nielsen's usability heuristics (use as a review checklist)

1. Show system status (progress, saved, loading).
2. Match the real world: the user's words and concepts, not internal names.
3. User control and freedom: easy undo and exit.
4. Consistency and standards.
5. Prevent errors before they happen.
6. Recognition over recall: show options instead of making people remember them.
7. Flexibility and efficiency: shortcuts for frequent users that don't confuse new ones.
8. Aesthetic and minimalist design: every extra element competes with the important ones.
9. Help people recognize, diagnose, and recover from errors in plain language.
10. Help and documentation where it's needed, short and task-focused.

## Concrete checks before shipping any UI

- Text contrast at least 4.5:1 (3:1 for large text and UI component edges) in both light and dark mode.
- Touch targets at least 44×44 px.
- Visible keyboard focus on every interactive element.
- No horizontal page scroll at 360 px wide. Wide tables, code, and formulas scroll inside their own box.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`. Offer a manual theme toggle when there is a dark mode.
- Body text 16 px or larger on phones, lines around 60 to 75 characters.
- Every page works with the real content in it, not just placeholder text.
- Check every page at desktop and phone widths in both themes before calling it done.
