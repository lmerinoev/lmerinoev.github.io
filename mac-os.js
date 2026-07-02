/* ==========================================================================
   Mac OS X Tiger desktop — window manager + Finder + Dock
   Vanilla JS, no dependencies. Powers the main page (index.html).
   ========================================================================== */
(function () {
'use strict';

/* --------------------------------------------------------------------------
   Aqua-style inline SVG icons (recreated, glossy Tiger look)
   -------------------------------------------------------------------------- */
const ICON = {
    // Brushed-metal hard drive, slightly 3D with glossy band and status LED
    hd: `<svg viewBox="0 0 48 48"><defs><linearGradient id="hdBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfefe"/><stop offset="0.16" stop-color="#e3e9ef"/><stop offset="0.49" stop-color="#bcc7d2"/><stop offset="0.51" stop-color="#a7b3c0"/><stop offset="0.84" stop-color="#cdd6df"/><stop offset="1" stop-color="#eef3f7"/></linearGradient><linearGradient id="hdEdge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#94a1b0"/></linearGradient><linearGradient id="hdGloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient><radialGradient id="hdLed" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#3f86d6"/></radialGradient></defs><rect x="5.5" y="13.5" width="37" height="22" rx="4" fill="url(#hdEdge)"/><rect x="6.7" y="14.7" width="34.6" height="19.6" rx="3.2" fill="url(#hdBody)" stroke="#8692a2" stroke-width="0.5"/><rect x="8.4" y="16.2" width="31.2" height="8.4" rx="2.4" fill="url(#hdGloss)"/><rect x="10" y="29.2" width="13" height="2.6" rx="1.3" fill="#9fb0c2" opacity="0.85"/><circle cx="36" cy="30.4" r="1.9" fill="url(#hdLed)" stroke="#5f86b3" stroke-width="0.4"/></svg>`,

    // Glossy Aqua blue folder with tab + sheen
    folder: `<svg viewBox="0 0 48 48"><defs><linearGradient id="fldBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6edff"/><stop offset="1" stop-color="#5ea6e8"/></linearGradient><linearGradient id="fldFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6f4ff"/><stop offset="0.5" stop-color="#a9d1f5"/><stop offset="0.5" stop-color="#74b6ef"/><stop offset="1" stop-color="#3a8ce0"/></linearGradient><linearGradient id="fldSheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs><path d="M5 13.2c0-1.6 1.3-2.9 2.9-2.9h9.4c.9 0 1.7.4 2.3 1.1l2.1 2.5H40c1.6 0 2.9 1.3 2.9 2.9v3.1H5z" fill="url(#fldBack)" stroke="#3c82c8" stroke-width="0.6"/><path d="M5 18.4h38v17.2c0 1.7-1.4 3-3.1 3H8.1c-1.7 0-3.1-1.3-3.1-3z" fill="url(#fldFront)" stroke="#3a82c6" stroke-width="0.6"/><path d="M7.2 19.6h33.6c-.2 2.6-.9 4.8-3.6 4.8H10.8c-2.7 0-3.4-2.2-3.6-4.8z" fill="url(#fldSheen)"/></svg>`,

    // White document with folded corner + soft text ruling
    doc: `<svg viewBox="0 0 48 48"><defs><linearGradient id="docB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef1f6"/></linearGradient></defs><path d="M11 4.5h16.4L37 14.1v28.4a1.5 1.5 0 0 1-1.5 1.5H11A1.5 1.5 0 0 1 9.5 42.5V6a1.5 1.5 0 0 1 1.5-1.5z" fill="url(#docB)" stroke="#a7b2bd" stroke-width="0.8"/><path d="M27.4 4.5v8.1a1.5 1.5 0 0 0 1.5 1.5H37z" fill="#dde4ec" stroke="#a7b2bd" stroke-width="0.7"/><g stroke="#6f97cf" stroke-width="1.5" stroke-linecap="round"><line x1="15" y1="20" x2="31" y2="20"/><line x1="15" y1="25" x2="31" y2="25"/><line x1="15" y1="30" x2="31" y2="30"/><line x1="15" y1="35" x2="25" y2="35"/></g></svg>`,

    // Document with glossy red PDF badge
    pdf: `<svg viewBox="0 0 48 48"><defs><linearGradient id="pdfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef1f6"/></linearGradient><linearGradient id="pdfBadge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4665c"/><stop offset="0.5" stop-color="#df3a2e"/><stop offset="1" stop-color="#c0241a"/></linearGradient></defs><path d="M11 4.5h16.4L37 14.1v28.4a1.5 1.5 0 0 1-1.5 1.5H11A1.5 1.5 0 0 1 9.5 42.5V6a1.5 1.5 0 0 1 1.5-1.5z" fill="url(#pdfB)" stroke="#a7b2bd" stroke-width="0.8"/><path d="M27.4 4.5v8.1a1.5 1.5 0 0 0 1.5 1.5H37z" fill="#dde4ec" stroke="#a7b2bd" stroke-width="0.7"/><rect x="8.5" y="26.5" width="31" height="13.5" rx="2.5" fill="url(#pdfBadge)" stroke="#a51d14" stroke-width="0.5"/><rect x="9.5" y="27.5" width="29" height="4.5" rx="2" fill="#ffffff" opacity="0.22"/><text x="24" y="37.2" font-family="Helvetica, Arial" font-size="8.6" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text></svg>`,

    // Aqua "blue gel" generic application
    app: `<svg viewBox="0 0 48 48"><defs><linearGradient id="appBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="0.5" stop-color="#3f8fe0"/><stop offset="0.5" stop-color="#236fcf"/><stop offset="1" stop-color="#7cc0ff"/></linearGradient><linearGradient id="appGloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs><rect x="6.5" y="6.5" width="35" height="35" rx="9.5" fill="url(#appBody)" stroke="#15568f" stroke-width="0.8"/><path d="M11 9.5h26c2 0 3.5 1.5 3.5 3.5v7c-5 2.6-26 2.6-33 0v-7C7.5 11 9 9.5 11 9.5z" fill="url(#appGloss)"/><circle cx="24" cy="26" r="8.5" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="24" cy="26" r="2.8" fill="#fff"/></svg>`,

    // TextEdit: ruled pad with a glossy pencil laid across
    textedit: `<svg viewBox="0 0 48 48"><defs><linearGradient id="teB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e9edf3"/></linearGradient><linearGradient id="tePencil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe07a"/><stop offset="1" stop-color="#f5a623"/></linearGradient></defs><path d="M10.5 4.5h17L36 13v30.5H10.5A1 1 0 0 1 9.5 42.5V5.5a1 1 0 0 1 1-1z" fill="url(#teB)" stroke="#a7b2bd" stroke-width="0.8"/><path d="M27.5 4.5v7.1a1.5 1.5 0 0 0 1.5 1.5H36z" fill="#dde4ec" stroke="#a7b2bd" stroke-width="0.7"/><g stroke="#566069" stroke-width="1.4" stroke-linecap="round"><line x1="14" y1="20" x2="30" y2="20"/><line x1="14" y1="25" x2="30" y2="25"/><line x1="14" y1="30" x2="26" y2="30"/></g><path d="M27 38.5l11.4-11.4 4.6 4.6L31.6 43l-6.2 1.3z" fill="url(#tePencil)" stroke="#b8821a" stroke-width="0.8" stroke-linejoin="round"/><path d="M38.4 27.1l4.6 4.6 1.4-1.4a1.6 1.6 0 0 0 0-2.3l-2.3-2.3a1.6 1.6 0 0 0-2.3 0z" fill="#f6a0a0" stroke="#b8821a" stroke-width="0.6"/><path d="M25.4 44.3l-1.1.3.3-1.1z" fill="#3a3a3a"/></svg>`,

    // Safari compass with chrome bezel + red/white needle
    safari: `<svg viewBox="0 0 48 48"><defs><linearGradient id="sfRing" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f6fb"/><stop offset="0.5" stop-color="#9fb2c6"/><stop offset="1" stop-color="#e6edf5"/></linearGradient><radialGradient id="sfFace" cx="0.5" cy="0.32" r="0.85"><stop offset="0" stop-color="#eaf4ff"/><stop offset="0.55" stop-color="#bcd9f5"/><stop offset="1" stop-color="#3f86d6"/></radialGradient></defs><circle cx="24" cy="24" r="19.5" fill="url(#sfRing)" stroke="#7d8ea0" stroke-width="0.6"/><circle cx="24" cy="24" r="16.2" fill="url(#sfFace)" stroke="#2f76c4" stroke-width="0.6"/><g stroke="#ffffff" stroke-width="0.7" opacity="0.65"><line x1="24" y1="9" x2="24" y2="39"/><line x1="9" y1="24" x2="39" y2="24"/></g><path d="M24 24L36 12 27 27z" fill="#e8463a"/><path d="M24 24L12 36 21 21z" fill="#ffffff"/><path d="M24 24L36 12 27 27z" fill="#fff" opacity="0.18"/><circle cx="24" cy="24" r="2" fill="#3a3a3a"/><path d="M11 10a23 23 0 0 1 14-3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>`,

    // Glossy photo frame with a little landscape (projects)
    photos: `<svg viewBox="0 0 48 48"><defs><linearGradient id="phFrame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d7dde4"/></linearGradient><linearGradient id="phSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#7fc1f0"/></linearGradient></defs><rect x="5.5" y="9" width="37" height="30" rx="3.5" fill="url(#phFrame)" stroke="#9aa4ad" stroke-width="0.8"/><rect x="8.5" y="12" width="31" height="21" rx="1" fill="url(#phSky)"/><circle cx="16" cy="19" r="3.2" fill="#ffd84d"/><path d="M8.5 33v-3l8.5-8 6 5 7-8 9.5 11v3z" fill="#5aa45f"/><path d="M8.5 12h31v6c-6 2-25 2-31 0z" fill="#ffffff" opacity="0.25"/></svg>`,

    // Tiny CRT running Windows 95 (the Library "VM")
    win95: `<svg viewBox="0 0 48 48"><defs><linearGradient id="w9Case" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f4"/><stop offset="1" stop-color="#bcc4cd"/></linearGradient></defs><rect x="5.5" y="7.5" width="37" height="27" rx="2.5" fill="url(#w9Case)" stroke="#7e8896" stroke-width="0.8"/><rect x="8.5" y="10.5" width="31" height="20.5" rx="1" fill="#0a6cba"/><rect x="8.5" y="10.5" width="31" height="6" rx="1" fill="#ffffff" opacity="0.12"/><g transform="translate(15 15.5)"><rect x="0" y="0" width="6.6" height="6.6" rx="0.6" fill="#f24e4e"/><rect x="8.4" y="0" width="6.6" height="6.6" rx="0.6" fill="#3fbf4b"/><rect x="0" y="8.4" width="6.6" height="6.6" rx="0.6" fill="#3f7fe0"/><rect x="8.4" y="8.4" width="6.6" height="6.6" rx="0.6" fill="#fbbf2e"/></g><rect x="20" y="34.5" width="8" height="3" fill="#9aa4b0"/><rect x="11" y="37.5" width="26" height="4.5" rx="1.4" fill="url(#w9Case)" stroke="#7e8896" stroke-width="0.8"/></svg>`,

    // X / Twitter, glossy black tile
    twitter: `<svg viewBox="0 0 48 48"><defs><linearGradient id="xG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a3a"/><stop offset="1" stop-color="#000000"/></linearGradient></defs><rect x="5" y="5" width="38" height="38" rx="9.5" fill="url(#xG)"/><path d="M9 9.5h7l24 25h2v4h-7l-24-25H9z" fill="none"/><path d="M13 13l8.7 11.7L13 35h2.7l7.1-7.8 5.8 7.8H35.2l-9.2-12.3L33.9 13H31.2l-6.5 7.1L19.4 13z" fill="#fff"/><rect x="6" y="6" width="36" height="13" rx="8" fill="#fff" opacity="0.07"/></svg>`,

    // Translucent wire-mesh trash basket
    trash: `<svg viewBox="0 0 48 48"><defs><linearGradient id="trBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset="1" stop-color="#b6c0ca"/></linearGradient></defs><path d="M13 16.5h22l-1.9 23.6c-.1 1.7-1.5 3-3.2 3H18.1c-1.7 0-3.1-1.3-3.2-3z" fill="url(#trBody)" stroke="#7d8894" stroke-width="0.8" opacity="0.96"/><g stroke="#8893a0" stroke-width="1.3" opacity="0.85"><line x1="18.5" y1="20" x2="19.6" y2="39"/><line x1="24" y1="20" x2="24" y2="39"/><line x1="29.5" y1="20" x2="28.4" y2="39"/><line x1="14.5" y1="24" x2="33.5" y2="24"/><line x1="15" y1="30" x2="33" y2="30"/><line x1="15.5" y1="36" x2="32.5" y2="36"/></g><ellipse cx="24" cy="16.5" rx="11.5" ry="2.6" fill="#cdd6df" stroke="#7d8894" stroke-width="0.8"/><path d="M19.5 14.2l1-3.2h7l1 3.2" fill="none" stroke="#7d8894" stroke-width="1.4"/></svg>`,

    // Finder two-tone smiling face on Aqua tile
    finder: `<svg viewBox="0 0 48 48"><defs><linearGradient id="fnTile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="0.5" stop-color="#2f86e0"/><stop offset="0.5" stop-color="#1f6fcf"/><stop offset="1" stop-color="#7cc0ff"/></linearGradient><linearGradient id="fnGloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs><rect x="6.5" y="6.5" width="35" height="35" rx="9.5" fill="url(#fnTile)" stroke="#15568f" stroke-width="0.8"/><path d="M11 9.5h26c2 0 3.5 1.5 3.5 3.5v6c-6 2.4-27 2.4-33 0v-6C7.5 11 9 9.5 11 9.5z" fill="url(#fnGloss)"/><path d="M24 11c-2.8 2.6-2.8 23.4 0 26-5.5.4-12-2-12-13s6.5-13.4 12-13z" fill="#eef6ff"/><path d="M24 11c2.8 2.6 2.8 23.4 0 26 5.5.4 12-2 12-13s-6.5-13.4-12-13z" fill="#1f4f86"/><ellipse cx="18.5" cy="20" rx="1.5" ry="2.3" fill="#1f4f86"/><ellipse cx="29.5" cy="20" rx="1.5" ry="2.3" fill="#eef6ff"/><path d="M17 30c4 3 10 3 14 0" fill="none" stroke="#9fc2ea" stroke-width="1.6" stroke-linecap="round"/></svg>`,

    home: `<svg viewBox="0 0 48 48"><defs><linearGradient id="hmRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9efff"/><stop offset="1" stop-color="#6fb1ec"/></linearGradient></defs><path d="M24 8 6 23.5h5.5V39h25V23.5H42z" fill="url(#hmRoof)" stroke="#3f86c9" stroke-width="0.8"/><rect x="20" y="28" width="8" height="11" rx="1" fill="#3f86c9"/><rect x="14" y="26" width="6" height="6" rx="0.8" fill="#bfe0fb" stroke="#3f86c9" stroke-width="0.6"/></svg>`,

    // Painter's palette with color dabs + a brush (Sketch.app)
    sketch: `<svg viewBox="0 0 48 48"><defs><radialGradient id="skP" cx="0.4" cy="0.35" r="0.85"><stop offset="0" stop-color="#fffefb"/><stop offset="1" stop-color="#e7e2d4"/></radialGradient><linearGradient id="skH" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#bd812f"/><stop offset="1" stop-color="#f0c477"/></linearGradient></defs><path d="M21 6C11.8 6 4.5 12.3 4.5 20c0 4.1 3.3 6.1 6.8 6.1 2.1 0 2.9-1.3 5-1.3 1.9 0 2.8 1.5 2.8 3.3 0 3.5 3.1 5.2 6.2 5.2C35.7 33.3 43.5 27.4 43.5 19.4 43.5 11.4 32.3 6 21 6z" fill="url(#skP)" stroke="#b1ab98" stroke-width="0.8"/><circle cx="12.5" cy="18" r="2.3" fill="#e8463a"/><circle cx="17.5" cy="12.5" r="2.3" fill="#f5a623"/><circle cx="24.5" cy="11.5" r="2.3" fill="#27ae60"/><circle cx="31.5" cy="14" r="2.3" fill="#2f86e0"/><circle cx="35.5" cy="20.5" r="2.3" fill="#8e44ad"/><ellipse cx="19" cy="27" rx="3.8" ry="3" fill="#c9c2af"/><g transform="rotate(45 35 35)"><rect x="32.8" y="19" width="4.4" height="21" rx="1.6" fill="url(#skH)" stroke="#8f6326" stroke-width="0.5"/><rect x="32.4" y="17.4" width="5.2" height="3" rx="1" fill="#d2d2d2" stroke="#9a9a9a" stroke-width="0.4"/><path d="M32.8 40h4.4l-2.2 5z" fill="#3a3a3a"/></g></svg>`,

    // Friendly robot head with antenna (Ask Luis agent)
    agent: `<svg viewBox="0 0 48 48"><defs><linearGradient id="agB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="0.5" stop-color="#3f8fe0"/><stop offset="0.5" stop-color="#236fcf"/><stop offset="1" stop-color="#7cc0ff"/></linearGradient></defs><line x1="24" y1="5.5" x2="24" y2="11" stroke="#9aa4b0" stroke-width="2"/><circle cx="24" cy="5" r="2.4" fill="#e8463a"/><rect x="9" y="11" width="30" height="24" rx="7.5" fill="url(#agB)" stroke="#15568f" stroke-width="0.8"/><rect x="12" y="13.5" width="24" height="7.5" rx="3.8" fill="#ffffff" opacity="0.25"/><circle cx="18" cy="23" r="3.4" fill="#fff"/><circle cx="30" cy="23" r="3.4" fill="#fff"/><circle cx="18.6" cy="23.6" r="1.5" fill="#1f4f86"/><circle cx="30.6" cy="23.6" r="1.5" fill="#1f4f86"/><path d="M18 29c3 2.3 9 2.3 12 0" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><rect x="14" y="35" width="20" height="6" rx="2.5" fill="#9aa4b0"/><rect x="6" y="20" width="3.5" height="7" rx="1.5" fill="#9aa4b0"/><rect x="38.5" y="20" width="3.5" height="7" rx="1.5" fill="#9aa4b0"/></svg>`,

    // Terminal: dark tile with green prompt >_
    terminal: `<svg viewBox="0 0 48 48"><defs><linearGradient id="tmB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4049"/><stop offset="1" stop-color="#15181d"/></linearGradient></defs><rect x="6" y="8" width="36" height="32" rx="6.5" fill="url(#tmB)" stroke="#0a0c0f" stroke-width="0.8"/><rect x="6.5" y="8.5" width="35" height="10" rx="6" fill="#ffffff" opacity="0.06"/><path d="M12 19.5l7 6-7 6" fill="none" stroke="#4fd14f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="22" y1="31.5" x2="33" y2="31.5" stroke="#e8e8e8" stroke-width="2.6" stroke-linecap="round"/></svg>`
};

/* small sidebar icons */
const SBI = {
    network: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#8fb8e6" stroke="#4f7fb8"/><ellipse cx="8" cy="8" rx="3" ry="7" fill="none" stroke="#fff" stroke-width="0.8"/><line x1="1" y1="8" x2="15" y2="8" stroke="#fff" stroke-width="0.8"/></svg>`,
    hd: `<svg viewBox="0 0 16 16"><rect x="1" y="4" width="14" height="8" rx="1.5" fill="#cfe0f3" stroke="#7d97b8"/><circle cx="12" cy="8" r="1" fill="#6d88ab"/></svg>`,
    desktop: `<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="8" rx="1" fill="#bfe0fb" stroke="#4f7fb8"/><rect x="6" y="11" width="4" height="2" fill="#9bb4cc"/></svg>`,
    apps: `<svg viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" rx="3" fill="#7fb8ee" stroke="#15538f"/><circle cx="8" cy="8" r="3" fill="none" stroke="#fff" stroke-width="1.2"/></svg>`,
    folder: `<svg viewBox="0 0 16 16"><path d="M1 4c0-.6.4-1 1-1h4l1 1.2h6c.6 0 1 .4 1 1V12c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1z" fill="#5fa8ea" stroke="#3f86c9"/></svg>`
};

/* add the sizing class to a raw icon SVG string */
function glyph(svg) { return svg.replace('<svg', '<svg class="icon-glyph"'); }

/* escape user text before inserting as HTML */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* --------------------------------------------------------------------------
   Window Manager
   -------------------------------------------------------------------------- */
const WM = {
    z: 30,
    wins: {},
    active: null,
    drag: null,
    resizeState: null,
    offset: 0,

    isMobile() { return window.innerWidth <= 700; },

    open(id, title, contentEl, opts) {
        opts = opts || {};
        if (this.wins[id]) {
            this.unminimize(id);
            this.focus(id);
            return this.wins[id].el;
        }
        const mobile = this.isMobile();
        const w = opts.width || 620;
        const h = opts.height || 460;
        const x = mobile ? 4 : 100 + this.offset;
        const y = mobile ? 28 : 46 + this.offset;
        this.offset = (this.offset + 26) % 130;

        const el = document.createElement('div');
        el.className = 'win' + (opts.metal ? ' metal' : '');
        el.id = 'win-' + id;
        el.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${++this.z}`;

        const titleIcon = opts.titleIcon ? `<img class="win-title-icon" src="data:image/svg+xml,${encodeURIComponent(opts.titleIcon)}">` : '';

        const bar = document.createElement('div');
        bar.className = 'win-titlebar';
        bar.innerHTML =
            `<div class="traffic">
                <button class="tl-close" title="Close"></button>
                <button class="tl-min" title="Minimize"></button>
                <button class="tl-max" title="Zoom"></button>
            </div>
            <span class="win-title">${titleIcon}${title}</span>
            <span style="width:46px"></span>`;

        const body = document.createElement('div');
        body.className = 'win-body' + (opts.metal ? ' metal-body' : '');
        if (contentEl) body.appendChild(contentEl);

        const resize = document.createElement('div');
        resize.className = 'win-resize';

        el.appendChild(bar);
        el.appendChild(body);
        el.appendChild(resize);
        document.getElementById('desktop').appendChild(el);

        this.wins[id] = { el, body, bar, title, icon: opts.dockIcon || ICON.doc, minimized: false };
        this.bind(id);
        this.focus(id);
        Dock.markRunning(opts.dockKey, true);
        return el;
    },

    bind(id) {
        const w = this.wins[id];
        const el = w.el, bar = w.bar;

        el.addEventListener('mousedown', () => this.focus(id), true);
        el.addEventListener('touchstart', () => this.focus(id), { passive: true, capture: true });

        bar.querySelector('.tl-close').addEventListener('click', e => { e.stopPropagation(); this.close(id); });
        bar.querySelector('.tl-min').addEventListener('click', e => { e.stopPropagation(); this.minimize(id); });
        bar.querySelector('.tl-max').addEventListener('click', e => { e.stopPropagation(); this.zoom(id); });
        bar.addEventListener('dblclick', e => { if (!e.target.closest('.traffic')) this.zoom(id); });

        bar.addEventListener('mousedown', e => {
            if (e.target.closest('.traffic')) return;
            if (this.isMobile() || el.classList.contains('maximized')) return;
            const r = el.getBoundingClientRect();
            this.drag = { id, dx: e.clientX - r.left, dy: e.clientY - r.top };
            e.preventDefault();
        });

        const rz = el.querySelector('.win-resize');
        rz.addEventListener('mousedown', e => {
            if (this.isMobile()) return;
            e.stopPropagation(); e.preventDefault();
            const r = el.getBoundingClientRect();
            this.resizeState = { id, sx: e.clientX, sy: e.clientY, sw: r.width, sh: r.height };
        });
    },

    focus(id) {
        Object.keys(this.wins).forEach(k => this.wins[k].el.classList.add('inactive'));
        const w = this.wins[id];
        if (!w) return;
        w.el.classList.remove('inactive');
        w.el.style.zIndex = ++this.z;
        this.active = id;
        Menu.setApp(w.menuApp || 'Finder');
    },

    close(id) {
        const w = this.wins[id];
        if (!w) return;
        w.el.remove();
        delete this.wins[id];
        Dock.removeMin(id);
        if (w.dockKey) Dock.markRunning(w.dockKey, this.anyOpenFor(w.dockKey));
        if (this.active === id) this.active = null;
    },

    anyOpenFor() { return false; },

    minimize(id) {
        const w = this.wins[id];
        if (!w) return;
        w.el.classList.add('minimized');
        w.minimized = true;
        Dock.addMin(id, w.title, w.icon);
    },

    unminimize(id) {
        const w = this.wins[id];
        if (!w) return;
        w.el.classList.remove('minimized');
        w.minimized = false;
        Dock.removeMin(id);
    },

    zoom(id) {
        const el = this.wins[id].el;
        if (el.classList.contains('maximized')) {
            el.classList.remove('maximized');
            el.style.left = el.dataset.rx; el.style.top = el.dataset.ry;
            el.style.width = el.dataset.rw; el.style.height = el.dataset.rh;
        } else {
            el.dataset.rx = el.style.left; el.dataset.ry = el.style.top;
            el.dataset.rw = el.style.width; el.dataset.rh = el.style.height;
            el.classList.add('maximized');
            el.style.left = '0px';
            el.style.top = '22px';
            el.style.width = '100vw';
            el.style.height = (window.innerHeight - 22 - 78) + 'px';
        }
    }
};

document.addEventListener('mousemove', e => {
    if (WM.drag) {
        const w = WM.wins[WM.drag.id]; if (!w) return;
        let nx = e.clientX - WM.drag.dx;
        let ny = Math.max(22, e.clientY - WM.drag.dy);
        w.el.style.left = nx + 'px';
        w.el.style.top = ny + 'px';
    } else if (WM.resizeState) {
        const r = WM.resizeState, w = WM.wins[r.id]; if (!w) return;
        w.el.style.width = Math.max(300, r.sw + (e.clientX - r.sx)) + 'px';
        w.el.style.height = Math.max(180, r.sh + (e.clientY - r.sy)) + 'px';
    }
});
document.addEventListener('mouseup', () => { WM.drag = null; WM.resizeState = null; });

/* --------------------------------------------------------------------------
   Content data
   -------------------------------------------------------------------------- */
const FOLDERS = {
    research: {
        title: 'Research',
        items: [
            { type: 'doc', id: 'research-decision-making', name: 'Decision-making with Robots' },
            { type: 'doc', id: 'research-trust-teams', name: 'Trust in Human-Machine Teams' },
            { type: 'doc', id: 'research-hri-studies', name: 'HRI Studies' },
            { type: 'doc', id: 'research-conformity', name: 'Conformity with Robot Peers' }
        ]
    },
    writing: {
        title: 'Writing',
        items: [
            { type: 'doc', id: 'blog-resonant-computing', name: 'Resonant Computing' },
            { type: 'doc', id: 'blog-sleeper-agents', name: 'Sleeper Agents' }
        ]
    },
    labs: {
        title: 'Labs',
        items: [
            { type: 'iframe', icon: 'app', name: 'Trust in AI', url: 'trust-demo.html', w: 900, h: 620 },
            { type: 'iframe', icon: 'app', name: 'Emotion Detection', url: 'emotion-detection.html', w: 900, h: 640 },
            { type: 'iframe', icon: 'app', name: 'Pose Estimation', url: 'pose-estimation.html', w: 900, h: 640 },
            { type: 'iframe', icon: 'app', name: 'Object Tracking', url: 'object-tracking.html', w: 900, h: 640 },
            { type: 'iframe', icon: 'app', name: 'Augmented Reality', url: 'ar-demo.html', w: 900, h: 640 },
            { type: 'iframe', icon: 'app', name: 'Personality & AI Trust', url: 'personality-test.html', w: 860, h: 640 },
            { type: 'iframe', icon: 'app', name: 'Drum Machine', url: 'labs/drum-machine.html', w: 900, h: 600 },
            { type: 'iframe', icon: 'app', name: 'Jarvis Face HUD', url: 'labs/jarvis-hud.html', w: 900, h: 640 },
            { type: 'iframe', icon: 'app', name: 'Generative Art', url: 'labs/generative-art.html', w: 820, h: 640 }
        ]
    },
    projects: {
        title: 'Projects',
        items: [
            { type: 'iframe', icon: 'photos', name: 'Photo Challenges', url: 'photography/', w: 980, h: 700 },
            { type: 'iframe', icon: 'photos', name: 'Coffee Photography', url: 'coffee.html', w: 880, h: 620 },
            { type: 'iframe', icon: 'photos', name: 'Creative Design', url: 'creating.html', w: 880, h: 620 },
            { type: 'iframe', icon: 'photos', name: 'Color Studies', url: 'crayons.html', w: 880, h: 620 }
        ]
    }
};

/* sidebar "Places" — folders reachable from any Finder window */
const PLACES = ['research', 'writing', 'labs', 'projects'];

/* --------------------------------------------------------------------------
   Finder
   -------------------------------------------------------------------------- */
const Finder = {
    open(folderId) {
        const winId = 'finder';
        let el = WM.wins[winId] && WM.wins[winId].el;
        if (!el) {
            const shell = document.createElement('div');
            shell.className = 'finder';
            el = WM.open(winId, 'Finder', shell, {
                metal: true, width: 660, height: 460,
                titleIcon: ICON.finder, dockKey: 'finder', dockIcon: ICON.finder
            });
            WM.wins[winId].menuApp = 'Finder';
            WM.wins[winId].shell = shell;
        }
        WM.unminimize(winId);
        WM.focus(winId);
        this.render(folderId || 'home');
    },

    render(viewId) {
        const win = WM.wins['finder']; if (!win) return;
        const shell = win.shell;
        const isHome = viewId === 'home';
        const folder = FOLDERS[viewId];
        const titleText = isHome ? 'Macintosh HD' : (folder ? folder.title : viewId);

        // title bar text
        win.bar.querySelector('.win-title').innerHTML =
            `<img class="win-title-icon" src="data:image/svg+xml,${encodeURIComponent(isHome ? ICON.hd : ICON.folder)}">${titleText}`;

        let items;
        if (isHome) {
            items = PLACES.map(p => ({ type: 'folder', id: p, name: FOLDERS[p].title }))
                .concat([{ type: 'doc', id: 'about', name: 'About Me' }]);
        } else {
            items = folder ? folder.items : [];
        }

        const sidebar = `
            <div class="finder-sidebar">
                <div class="finder-sidebar-group">Network</div>
                <div class="finder-sidebar-item" data-nav="home">${SBI.network}<span>Network</span></div>
                <div class="finder-sidebar-item ${isHome ? 'active' : ''}" data-nav="home">${SBI.hd}<span>Macintosh HD</span></div>
                <div class="finder-sidebar-item" data-nav="home">${SBI.desktop}<span>Desktop</span></div>
                <div class="finder-sidebar-item" data-nav="labs">${SBI.apps}<span>Applications</span></div>
                <div class="finder-sidebar-group">Places</div>
                ${PLACES.map(p => `<div class="finder-sidebar-item ${viewId === p ? 'active' : ''}" data-nav="${p}">${SBI.folder}<span>${FOLDERS[p].title}</span></div>`).join('')}
            </div>`;

        const grid = items.map(it => {
            const ic = ICON[it.icon] || (it.type === 'folder' ? ICON.folder : ICON.doc);
            return `<div class="fitem" data-type="${it.type}" data-id="${it.id || ''}">
                ${glyph(ic)}
                <span class="fitem-label">${it.name}</span>
            </div>`;
        }).join('');

        shell.innerHTML = `
            <div class="finder-toolbar">
                <div class="finder-nav-btns"><button data-back>&#8249;</button><button data-fwd>&#8250;</button></div>
                <span class="finder-toolbar-title">${titleText}</span>
                <div class="finder-toolbar-spacer"></div>
            </div>
            <div class="finder-main">
                ${sidebar}
                <div class="finder-content">${grid}</div>
            </div>
            <div class="finder-status">${items.length} item${items.length === 1 ? '' : 's'}</div>`;

        // sidebar nav
        shell.querySelectorAll('.finder-sidebar-item').forEach(s => {
            s.addEventListener('click', () => this.render(s.dataset.nav));
        });
        shell.querySelector('[data-back]').addEventListener('click', () => this.render('home'));

        // item activation
        const items2 = items;
        shell.querySelectorAll('.fitem').forEach((node, i) => {
            const data = items2[i];
            let lastTap = 0;
            const activate = () => this.activate(data);
            node.addEventListener('dblclick', activate);
            node.addEventListener('click', () => {
                shell.querySelectorAll('.fitem').forEach(n => n.classList.remove('selected'));
                node.classList.add('selected');
                const now = Date.now();
                if (now - lastTap < 400) activate();
                lastTap = now;
            });
        });
    },

    activate(data) {
        if (data.type === 'folder') this.render(data.id);
        else openItem(data);
    }
};

/* --------------------------------------------------------------------------
   Item openers
   -------------------------------------------------------------------------- */
function openItem(data) {
    if (data.type === 'doc') openDoc(data.id);
    else if (data.type === 'iframe') openIframe(data);
    else if (data.type === 'link') window.open(data.url, '_blank', 'noopener');
}

function openDoc(id) {
    const src = document.getElementById('doc-' + id);
    if (!src) return;
    const title = src.dataset.title || id;
    const kicker = src.dataset.kicker || '';
    const subtitle = src.dataset.subtitle || '';
    const meta = src.dataset.meta || '';
    const paper = src.dataset.paper || '';

    const doc = document.createElement('div');
    doc.className = 'doc';
    const metaHtml = meta ? '<div class="doc-meta">' + meta.split('|').map(m => '<span>' + m.trim() + '</span>').join('') + '</div>' : '';
    const paperHtml = paper ? `<a class="doc-paperlink" href="${paper}" target="_blank" rel="noopener">Read the Full Paper &#8599;</a>` : '';
    doc.innerHTML =
        (kicker ? `<div class="doc-kicker">${kicker}</div>` : '') +
        `<h1>${title}</h1>` +
        (subtitle ? `<p class="doc-subtitle">${subtitle}</p>` : '') +
        metaHtml +
        src.innerHTML +
        paperHtml;

    WM.open('doc-' + id, title, doc, {
        width: 640, height: 520, titleIcon: ICON.textedit,
        dockKey: 'textedit', dockIcon: ICON.textedit
    });
    if (WM.wins['doc-' + id]) WM.wins['doc-' + id].menuApp = 'TextEdit';
}

function openIframe(data) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;width:100%;height:100%;';
    const loading = document.createElement('div');
    loading.className = 'iframe-loading';
    loading.textContent = 'Loading ' + data.name + '…';
    const frame = document.createElement('iframe');
    frame.className = 'win-iframe';
    frame.src = data.url;
    frame.setAttribute('allow', 'camera; microphone; accelerometer; gyroscope; magnetometer; autoplay; xr-spatial-tracking');
    frame.setAttribute('allowfullscreen', '');
    frame.addEventListener('load', () => loading.remove());
    wrap.appendChild(frame);
    wrap.appendChild(loading);

    const idKey = 'app-' + data.url.replace(/[^a-z0-9]/gi, '-');
    WM.open(idKey, data.name, wrap, {
        metal: true, width: data.w || 880, height: data.h || 620,
        titleIcon: ICON[data.icon] || ICON.app,
        dockKey: data.dockKey || 'safari', dockIcon: ICON.safari
    });
    if (WM.wins[idKey]) WM.wins[idKey].menuApp = data.name;
}

function openLibrary() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;width:100%;height:100%;';
    const loading = document.createElement('div');
    loading.className = 'iframe-loading';
    loading.textContent = 'Booting Windows 95…';
    const frame = document.createElement('iframe');
    frame.className = 'win-iframe';
    frame.src = 'library/';
    frame.setAttribute('allowfullscreen', '');
    frame.addEventListener('load', () => loading.remove());
    wrap.appendChild(frame);
    wrap.appendChild(loading);
    WM.open('library', 'Library — Windows 95 (Classic)', wrap, {
        metal: true, width: 940, height: 640, titleIcon: ICON.win95,
        dockKey: 'library', dockIcon: ICON.win95
    });
    if (WM.wins['library']) WM.wins['library'].menuApp = 'Library';
}

/* --------------------------------------------------------------------------
   Sketch — a little MacPaint-style drawing app
   -------------------------------------------------------------------------- */
function openSketch() {
    if (WM.wins['sketch']) { WM.unminimize('sketch'); WM.focus('sketch'); return; }
    const wrap = document.createElement('div');
    wrap.className = 'sketch';
    const palette = ['#000000', '#7f7f7f', '#ffffff', '#c0392b', '#e8b931', '#f39c12', '#27ae60', '#2f86e0', '#8e44ad', '#8b5a2b'];
    wrap.innerHTML = `
        <div class="sketch-toolbar">
            <div class="sketch-swatches">${palette.map((c, i) => `<button class="sw${i === 0 ? ' active' : ''}" style="background:${c}" data-color="${c}"></button>`).join('')}</div>
            <span class="sketch-sep"></span>
            <div class="sketch-sizes">
                <button data-size="2">·</button>
                <button data-size="6" class="active">•</button>
                <button data-size="14">●</button>
            </div>
            <span class="sketch-sep"></span>
            <button class="sketch-btn" data-tool="eraser">Eraser</button>
            <button class="sketch-btn" data-act="clear">Clear</button>
            <button class="sketch-btn" data-act="save">Save PNG</button>
        </div>
        <div class="sketch-canvas-wrap"><canvas class="sketch-canvas" width="760" height="460"></canvas></div>`;

    const canvas = wrap.querySelector('.sketch-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    let color = '#000000', size = 6, erasing = false, drawing = false, lx = 0, ly = 0;

    function pos(e) {
        const r = canvas.getBoundingClientRect();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: (cx - r.left) * (canvas.width / r.width), y: (cy - r.top) * (canvas.height / r.height) };
    }
    function start(e) { drawing = true; const p = pos(e); lx = p.x; ly = p.y; dot(p); }
    function dot(p) { ctx.fillStyle = erasing ? '#fff' : color; ctx.beginPath(); ctx.arc(p.x, p.y, (erasing ? size * 2.4 : size) / 2, 0, 7); ctx.fill(); }
    function move(e) {
        if (!drawing) return;
        if (e.cancelable) e.preventDefault();
        const p = pos(e);
        ctx.strokeStyle = erasing ? '#fff' : color;
        ctx.lineWidth = erasing ? size * 2.4 : size;
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.stroke();
        lx = p.x; ly = p.y;
    }
    function end() { drawing = false; }
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    const swWrap = wrap.querySelector('.sketch-swatches');
    swWrap.addEventListener('click', e => {
        const b = e.target.closest('.sw'); if (!b) return;
        color = b.dataset.color; erasing = false;
        swWrap.querySelectorAll('.sw').forEach(s => s.classList.remove('active'));
        b.classList.add('active');
        wrap.querySelector('[data-tool="eraser"]').classList.remove('active');
    });
    wrap.querySelector('.sketch-sizes').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        size = parseInt(b.dataset.size, 10);
        wrap.querySelectorAll('.sketch-sizes button').forEach(s => s.classList.remove('active'));
        b.classList.add('active');
    });
    wrap.querySelector('[data-tool="eraser"]').addEventListener('click', function () {
        erasing = !erasing; this.classList.toggle('active', erasing);
    });
    wrap.querySelector('[data-act="clear"]').addEventListener('click', () => {
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    wrap.querySelector('[data-act="save"]').addEventListener('click', () => {
        const a = document.createElement('a');
        a.download = 'sketch.png'; a.href = canvas.toDataURL('image/png'); a.click();
    });

    WM.open('sketch', 'Sketch', wrap, { metal: true, width: 620, height: 560, titleIcon: ICON.sketch, dockKey: 'sketch', dockIcon: ICON.sketch });
    if (WM.wins['sketch']) WM.wins['sketch'].menuApp = 'Sketch';
}

/* --------------------------------------------------------------------------
   Agent — "Ask Luis": a rule-based desktop guide that can also navigate
   -------------------------------------------------------------------------- */
function openAgent() {
    if (WM.wins['agent']) { WM.unminimize('agent'); WM.focus('agent'); return; }
    const wrap = document.createElement('div');
    wrap.className = 'agent';
    wrap.innerHTML = `
        <div class="agent-log"></div>
        <form class="agent-input"><input type="text" placeholder="Ask about research, writing, labs…" autocomplete="off"><button type="submit">Send</button></form>`;
    const log = wrap.querySelector('.agent-log');
    const input = wrap.querySelector('input');

    function add(role, html) {
        const m = document.createElement('div');
        m.className = 'agent-msg ' + role;
        m.innerHTML = `<span class="agent-bubble">${html}</span>`;
        log.appendChild(m); log.scrollTop = log.scrollHeight;
        return m;
    }

    const rules = [
        { t: /\b(help|what can you|commands?)\b/i, r: 'I can tell you about Luis and open things for you. Try: <em>"show me your research"</em>, <em>"what do you write about?"</em>, <em>"open labs"</em>, <em>"projects"</em>, <em>"who are you?"</em>, or <em>"open the library"</em>.' },
        { t: /\b(hi|hey|hello|yo|sup|howdy)\b/i, r: 'Hey! I’m Luis’s desktop agent. Ask me about his research, writing, labs, or projects — or tell me to open one and I’ll take you there.' },
        { t: /(research|paper|robot|\btrust\b|hri|conformity|decision)/i, r: 'Luis researches human–AI interaction — trust formation, decision-making with humanoid robots, and conformity with robot peers. Opening the Research folder for you.', a: () => Finder.open('research') },
        { t: /(writ|blog|essay|article|sleeper|resonant|safety|alignment)/i, r: 'His writing digs into AI safety and personal computing — like <em>Sleeper Agents</em> and <em>Resonant Computing</em>. Opening Writing.', a: () => Finder.open('writing') },
        { t: /(lab|demo|vision|emotion|pose|object|drum|jarvis|generative|\bar\b|experiment)/i, r: 'The Labs are in-browser experiments — computer vision, audio, and AR. Opening Labs.', a: () => Finder.open('labs') },
        { t: /(project|coffee|photo|design|color|crayon|portfolio)/i, r: 'Personal projects: coffee photography, photography, creative design, and color studies. Opening Projects.', a: () => Finder.open('projects') },
        { t: /(about|who are|who is|yourself|\bluis\b|background|bio)/i, r: 'Luis is a human–AI interaction researcher — trust, collaboration, and decision-making between people and machines. Here’s his About card.', a: () => openDoc('about') },
        { t: /(library|windows|win95|95|classic)/i, r: 'There’s a fully working Windows 95 machine on this site. Booting the Library now — enjoy the nostalgia.', a: () => openLibrary() },
        { t: /(sketch|draw|paint)/i, r: 'Feeling creative? Opening Sketch so you can draw something.', a: () => openSketch() },
        { t: /(terminal|shell|command line|bash)/i, r: 'Opening Terminal — type <em>help</em> in there to see what it can do.', a: () => openTerminal() },
        { t: /(contact|reach|email|hire|collaborat|twitter|\bx\b)/i, r: 'The best way to reach Luis is on X / Twitter, <strong>@HipsterCow</strong>. He’s always up for thoughtful collaborations.' },
        { t: /(thank|thanks|cheers|ty)\b/i, r: 'Anytime. 👋' }
    ];
    function reply(q) {
        for (const rule of rules) if (rule.t.test(q)) return rule;
        return { r: 'I’m a small rule-based guide, so I keep things simple. Ask about <em>research</em>, <em>writing</em>, <em>labs</em>, or <em>projects</em> — or type <em>help</em>.' };
    }

    add('bot', 'Hi, I’m Luis’s desktop agent. Ask me about his research, writing, labs, or projects — or say <em>"open research"</em> and I’ll take you there. Type <em>help</em> for ideas.');

    wrap.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const q = input.value.trim(); if (!q) return;
        add('user', escapeHtml(q));
        input.value = '';
        const typing = add('bot', '<span class="agent-typing">•••</span>');
        const res = reply(q);
        setTimeout(() => {
            typing.querySelector('.agent-bubble').innerHTML = res.r;
            log.scrollTop = log.scrollHeight;
            if (res.a) setTimeout(res.a, 450);
        }, 500);
    });

    WM.open('agent', 'Ask Luis', wrap, { width: 440, height: 520, titleIcon: ICON.agent, dockKey: 'agent', dockIcon: ICON.agent });
    if (WM.wins['agent']) WM.wins['agent'].menuApp = 'Ask Luis';
    setTimeout(() => input.focus(), 120);
}

/* --------------------------------------------------------------------------
   Terminal — a faux Terminal.app that talks to the desktop
   -------------------------------------------------------------------------- */
function openTerminal() {
    if (WM.wins['terminal']) { WM.unminimize('terminal'); WM.focus('terminal'); return; }
    const wrap = document.createElement('div');
    wrap.className = 'term';
    wrap.innerHTML = `<div class="term-screen"><div class="term-out"></div><div class="term-line"><span class="term-prompt">luis@mac ~ % </span><span class="term-input" contenteditable="true" spellcheck="false"></span></div></div>`;
    const screen = wrap.querySelector('.term-screen');
    const out = wrap.querySelector('.term-out');
    const inputEl = wrap.querySelector('.term-input');

    function print(html) { const d = document.createElement('div'); d.innerHTML = html; out.appendChild(d); }
    function echoCmd(cmd) { print('<span class="term-prompt">luis@mac ~ % </span>' + escapeHtml(cmd)); }

    const opens = {
        research: () => Finder.open('research'), writing: () => Finder.open('writing'),
        blog: () => Finder.open('writing'), labs: () => Finder.open('labs'),
        projects: () => Finder.open('projects'), about: () => openDoc('about'),
        library: () => openLibrary(), win95: () => openLibrary(),
        sketch: () => openSketch(), agent: () => openAgent(),
        home: () => Finder.open('home'), hd: () => Finder.open('home'), finder: () => Finder.open('home')
    };

    const commands = {
        help: () => 'Available commands:\n  ls                list items\n  open &lt;name&gt;       open research | writing | labs | projects | about | library | sketch | agent\n  whoami            current user\n  about             short bio\n  date              current date/time\n  echo &lt;text&gt;       print text\n  neofetch          system info\n  clear             clear the screen',
        ls: () => 'Research/   Writing/   Labs/   Projects/   About.txt   Library/',
        whoami: () => 'luis',
        pwd: () => '/Users/luis',
        about: () => 'Luis Merino — human–AI interaction researcher.\nTrust, collaboration, and decision-making between people and machines.\nAlso: coffee, photography, and building things in the browser.',
        date: () => new Date().toString(),
        echo: (args) => escapeHtml(args.join(' ')),
        sudo: () => 'We trust you have received the usual lecture… just kidding. Permission denied 😏',
        neofetch: () => 'luis@mac\n-----------\nOS: Mac OS X 10.4 (Tiger, in a browser)\nHost: lmerinoev.github.io\nShell: zsh (cosplay)\nWM: Aqua\nUptime: since you opened this tab\nTheme: Aqua Blue\nFun fact: there’s a Windows 95 running in the Library.',
        open: (args) => {
            const name = (args[0] || '').toLowerCase();
            if (!name) return 'usage: open &lt;name&gt;';
            if (opens[name]) { setTimeout(opens[name], 200); return 'Opening ' + escapeHtml(name) + '…'; }
            return 'open: ' + escapeHtml(name) + ': no such item. Try: ' + Object.keys(opens).slice(0, 8).join(', ');
        }
    };

    function run(line) {
        const parts = line.trim().split(/\s+/);
        const cmd = (parts.shift() || '').toLowerCase();
        if (!cmd) return null;
        if (cmd === 'clear') { out.innerHTML = ''; return null; }
        if (commands[cmd]) return commands[cmd](parts);
        return cmd + ': command not found. Type "help".';
    }

    inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const line = inputEl.textContent;
            echoCmd(line);
            inputEl.textContent = '';
            const res = run(line);
            if (res !== null) print(res);
            screen.scrollTop = screen.scrollHeight;
        }
    });
    screen.addEventListener('mousedown', e => {
        if (!e.target.closest('.term-input') && window.getSelection().isCollapsed) {
            setTimeout(() => inputEl.focus(), 0);
        }
    });

    print('Welcome to the desktop terminal. Type "help" to get started.');
    WM.open('terminal', 'Terminal — luis@mac', wrap, { width: 600, height: 400, titleIcon: ICON.terminal, dockKey: 'terminal', dockIcon: ICON.terminal });
    if (WM.wins['terminal']) WM.wins['terminal'].menuApp = 'Terminal';
    setTimeout(() => inputEl.focus(), 120);
}

/* --------------------------------------------------------------------------
   Dock
   -------------------------------------------------------------------------- */
const Dock = {
    items: [],
    build() {
        const dock = document.getElementById('dock');
        const def = [
            { key: 'finder', label: 'Finder', icon: ICON.finder, action: () => Finder.open('home') },
            { key: 'research', label: 'Research', icon: ICON.folder, action: () => Finder.open('research') },
            { key: 'writing', label: 'Writing', icon: ICON.folder, action: () => Finder.open('writing') },
            { key: 'labs', label: 'Labs', icon: ICON.folder, action: () => Finder.open('labs') },
            { key: 'projects', label: 'Projects', icon: ICON.folder, action: () => Finder.open('projects') },
            { sep: true },
            { key: 'sketch', label: 'Sketch', icon: ICON.sketch, action: openSketch },
            { key: 'agent', label: 'Ask Luis', icon: ICON.agent, action: openAgent },
            { key: 'terminal', label: 'Terminal', icon: ICON.terminal, action: openTerminal },
            { sep: true },
            { key: 'textedit', label: 'About Me', icon: ICON.textedit, action: () => openDoc('about') },
            { key: 'safari', label: 'Analysis', icon: ICON.safari, action: () => openIframe({ name: 'Analysis', url: 'analysis/', w: 980, h: 660, icon: 'safari' }) },
            { key: 'library', label: 'Library (Windows 95)', icon: ICON.win95, action: openLibrary },
            { sep: true },
            { key: 'twitter', label: 'X / Twitter', icon: ICON.twitter, action: () => window.open('https://x.com/HipsterCow', '_blank', 'noopener') },
            { sep: true },
            { key: 'trash', label: 'Trash', icon: ICON.trash, action: () => {} }
        ];
        def.forEach(d => {
            if (d.sep) { const s = document.createElement('div'); s.className = 'dock-sep'; dock.appendChild(s); return; }
            const item = document.createElement('div');
            item.className = 'dock-item';
            item.dataset.key = d.key;
            item.innerHTML = d.icon + `<span class="dock-tooltip">${d.label}</span>`;
            item.addEventListener('click', d.action);
            dock.appendChild(item);
        });
    },
    markRunning(key, on) {
        if (!key) return;
        document.querySelectorAll('.dock-item[data-key="' + key + '"]').forEach(n => n.classList.toggle('running', !!on));
    },
    addMin(id, title, icon) {
        const dock = document.getElementById('dock');
        if (document.getElementById('min-' + id)) return;
        const m = document.createElement('div');
        m.className = 'dock-min';
        m.id = 'min-' + id;
        m.innerHTML = icon;
        m.title = title;
        m.addEventListener('click', () => { WM.unminimize(id); WM.focus(id); });
        // insert before trash separator (last sep) — simplest: before last child group
        dock.appendChild(m);
    },
    removeMin(id) {
        const m = document.getElementById('min-' + id);
        if (m) m.remove();
    }
};

/* --------------------------------------------------------------------------
   Menu bar
   -------------------------------------------------------------------------- */
const Menu = {
    setApp(name) {
        const el = document.getElementById('menu-app');
        if (el) el.textContent = name;
    },
    clock() {
        const el = document.getElementById('menu-clock');
        if (!el) return;
        const d = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let h = d.getHours();
        const m = String(d.getMinutes()).padStart(2, '0');
        const ap = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        el.textContent = `${days[d.getDay()]} ${h}:${m} ${ap}`;
    },
    initDropdowns() {
        const appleItems = [
            { label: 'About This Mac', action: () => openDoc('about') },
            { sep: true },
            { label: 'Research', action: () => Finder.open('research') },
            { label: 'Writing', action: () => Finder.open('writing') },
            { label: 'Labs', action: () => Finder.open('labs') },
            { label: 'Projects', action: () => Finder.open('projects') },
            { sep: true },
            { label: 'Library (Windows 95)…', action: openLibrary }
        ];
        const apple = document.getElementById('menu-apple');
        const dd = document.getElementById('apple-dropdown');
        dd.innerHTML = appleItems.map(it => it.sep ? '<div class="menu-dropdown-sep"></div>' : `<div class="menu-dropdown-item">${it.label}</div>`).join('');
        const nodes = dd.querySelectorAll('.menu-dropdown-item');
        let n = 0;
        appleItems.forEach(it => { if (!it.sep) { const node = nodes[n++]; node.addEventListener('click', () => { it.action(); closeAll(); }); } });

        function closeAll() { dd.classList.remove('show'); apple.classList.remove('open'); }
        apple.addEventListener('click', e => {
            e.stopPropagation();
            const open = dd.classList.toggle('show');
            apple.classList.toggle('open', open);
            const r = apple.getBoundingClientRect();
            dd.style.left = r.left + 'px';
        });
        document.addEventListener('click', closeAll);
    }
};

/* --------------------------------------------------------------------------
   Desktop icons
   -------------------------------------------------------------------------- */
function buildDesktopIcons() {
    const c = document.getElementById('desktop-icons');
    const icons = [
        { icon: ICON.hd, label: 'Macintosh HD', action: () => Finder.open('home') }
    ];
    // Project folders live on the desktop
    FOLDERS.projects.items.forEach(p => {
        icons.push({ icon: ICON.folder, label: p.name, action: () => openItem(p) });
    });
    icons.push({ icon: ICON.win95, label: 'Library', action: openLibrary });
    icons.forEach(d => {
        const el = document.createElement('div');
        el.className = 'desktop-icon';
        el.innerHTML = glyph(d.icon) + `<span class="icon-label">${d.label}</span>`;
        let last = 0;
        el.addEventListener('click', () => {
            document.querySelectorAll('.desktop-icon').forEach(n => n.classList.remove('selected'));
            el.classList.add('selected');
            const now = Date.now();
            if (now - last < 400) d.action();
            last = now;
        });
        el.addEventListener('dblclick', d.action);
        c.appendChild(el);
    });
    document.getElementById('desktop').addEventListener('click', e => {
        if (e.target.id === 'desktop' || e.target === document.getElementById('desktop')) {
            document.querySelectorAll('.desktop-icon').forEach(n => n.classList.remove('selected'));
        }
    });
}

/* --------------------------------------------------------------------------
   Init
   -------------------------------------------------------------------------- */
function init() {
    buildDesktopIcons();
    Dock.build();
    Menu.initDropdowns();
    Menu.clock();
    setInterval(() => Menu.clock(), 15000);

    const wc = document.getElementById('welcome');
    if (wc) {
        wc.querySelector('.welcome-close').addEventListener('click', () => wc.remove());
    }
    // expose for any inline handlers
    window.MacOS = { Finder, openDoc, openLibrary, openIframe, openSketch, openAgent, openTerminal };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
