// ---- WINDOW MANAGER ----
const WM = {
    zIndex: 10,
    windows: {},
    activeId: null,
    dragState: null,
    nextOffset: 0,

    open(id, title, contentHtml, opts = {}) {
        if (this.windows[id]) {
            this.unminimize(id);
            this.focus(id);
            return;
        }

        const isMobile = window.innerWidth <= 600;
        const w = opts.width || (isMobile ? window.innerWidth - 4 : 640);
        const h = opts.height || (isMobile ? window.innerHeight - 40 : 460);
        const x = isMobile ? 2 : 60 + this.nextOffset;
        const y = isMobile ? 2 : 30 + this.nextOffset;
        this.nextOffset = (this.nextOffset + 28) % 140;

        const win = document.createElement('div');
        win.className = 'win';
        win.id = 'win-' + id;
        win.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${++this.zIndex}`;

        const iconSvg = opts.icon || '';
        const bodyClass = opts.bodyClass || 'win-body';

        win.innerHTML = `
            <div class="title-bar" data-win="${id}">
                ${iconSvg ? `<span class="title-bar-icon">${iconSvg}</span>` : ''}
                <span class="title-bar-text">${title}</span>
                <div class="title-bar-controls">
                    <button data-action="minimize" aria-label="Minimize">_</button>
                    <button data-action="maximize" aria-label="Maximize">☐</button>
                    <button data-action="close" aria-label="Close">✕</button>
                </div>
            </div>
            ${opts.menuBar ? `<div class="menu-bar">${opts.menuBar}</div>` : ''}
            <div class="${bodyClass}">${contentHtml}</div>
            ${opts.statusText ? `<div class="status-bar"><span class="status-bar-field">${opts.statusText}</span></div>` : ''}
        `;

        document.getElementById('desktop').appendChild(win);
        this.windows[id] = { el: win, title, icon: iconSvg, minimized: false };
        this.addTaskbarBtn(id, title);
        this.focus(id);
        this.bindWindowEvents(id);
    },

    close(id) {
        const w = this.windows[id];
        if (!w) return;
        w.el.remove();
        delete this.windows[id];
        this.removeTaskbarBtn(id);
        if (this.activeId === id) this.activeId = null;
    },

    minimize(id) {
        const w = this.windows[id];
        if (!w) return;
        w.el.classList.add('minimized');
        w.minimized = true;
        const tb = document.querySelector(`.taskbar-btn[data-win="${id}"]`);
        if (tb) tb.classList.remove('active');
        if (this.activeId === id) this.activeId = null;
    },

    unminimize(id) {
        const w = this.windows[id];
        if (!w) return;
        w.el.classList.remove('minimized');
        w.minimized = false;
    },

    maximize(id) {
        const w = this.windows[id];
        if (!w) return;
        const el = w.el;
        if (el.classList.contains('maximized')) {
            el.classList.remove('maximized');
            el.style.left = el.dataset.restoreX || '60px';
            el.style.top = el.dataset.restoreY || '30px';
            el.style.width = el.dataset.restoreW || '640px';
            el.style.height = el.dataset.restoreH || '460px';
        } else {
            el.dataset.restoreX = el.style.left;
            el.dataset.restoreY = el.style.top;
            el.dataset.restoreW = el.style.width;
            el.dataset.restoreH = el.style.height;
            el.classList.add('maximized');
        }
    },

    focus(id) {
        Object.values(this.windows).forEach(w => w.el.classList.add('inactive'));
        const w = this.windows[id];
        if (!w) return;
        w.el.classList.remove('inactive');
        w.el.style.zIndex = ++this.zIndex;
        this.activeId = id;
        document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
        const tb = document.querySelector(`.taskbar-btn[data-win="${id}"]`);
        if (tb) tb.classList.add('active');
    },

    bindWindowEvents(id) {
        const w = this.windows[id];
        const el = w.el;

        el.addEventListener('mousedown', () => this.focus(id));
        el.addEventListener('touchstart', () => this.focus(id), { passive: true });

        el.querySelectorAll('.title-bar-controls button').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const action = btn.dataset.action;
                if (action === 'close') this.close(id);
                else if (action === 'minimize') this.minimize(id);
                else if (action === 'maximize') this.maximize(id);
            });
        });

        const titleBar = el.querySelector('.title-bar');
        titleBar.addEventListener('dblclick', () => this.maximize(id));

        titleBar.addEventListener('mousedown', e => {
            if (e.target.closest('.title-bar-controls')) return;
            if (window.innerWidth <= 600) return;
            if (el.classList.contains('maximized')) return;
            const rect = el.getBoundingClientRect();
            this.dragState = { id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
            e.preventDefault();
        });
    },

    addTaskbarBtn(id, title) {
        const btn = document.createElement('button');
        btn.className = 'taskbar-btn active';
        btn.dataset.win = id;
        btn.innerHTML = `<span class="btn-text">${title}</span>`;
        btn.addEventListener('click', () => {
            const w = this.windows[id];
            if (!w) return;
            if (w.minimized) { this.unminimize(id); this.focus(id); }
            else if (this.activeId === id) { this.minimize(id); }
            else { this.focus(id); }
        });
        document.getElementById('taskbar-windows').appendChild(btn);
    },

    removeTaskbarBtn(id) {
        const btn = document.querySelector(`.taskbar-btn[data-win="${id}"]`);
        if (btn) btn.remove();
    }
};

document.addEventListener('mousemove', e => {
    if (!WM.dragState) return;
    const w = WM.windows[WM.dragState.id];
    if (!w) return;
    w.el.style.left = (e.clientX - WM.dragState.offsetX) + 'px';
    w.el.style.top = (e.clientY - WM.dragState.offsetY) + 'px';
});
document.addEventListener('mouseup', () => { WM.dragState = null; });


// ---- ICONS ----
const FILE_ICON_SMALL = `<svg viewBox="0 0 32 32" style="width:16px;height:16px"><path d="M6 2h12l8 8v20H6z" fill="#fff" stroke="#808080" stroke-width="1"/><path d="M18 2v8h8" fill="#ddd" stroke="#808080" stroke-width="1"/></svg>`;
const FOLDER_ICON_SMALL = `<svg viewBox="0 0 32 32" style="width:16px;height:16px"><path d="M2 7h28v21H2z" fill="#FFD442" stroke="#BF9900" stroke-width="1"/><path d="M2 4h11l2 3H2z" fill="#FFD442" stroke="#BF9900" stroke-width="1"/></svg>`;
const IMG_ICON_SMALL = `<svg viewBox="0 0 32 32" style="width:16px;height:16px"><rect x="2" y="4" width="28" height="24" fill="#fff" stroke="#808080"/><rect x="4" y="6" width="24" height="20" fill="#87CEEB"/><circle cx="22" cy="12" r="3" fill="#FFD700"/><path d="M4 22L12 14L18 20L22 16L28 22V26H4z" fill="#228B22"/></svg>`;
const FILE_ICON_32 = `<svg viewBox="0 0 32 32" style="width:32px;height:32px"><path d="M6 2h12l8 8v20H6z" fill="#fff" stroke="#808080" stroke-width="1"/><path d="M18 2v8h8" fill="#ddd" stroke="#808080" stroke-width="1"/><line x1="10" y1="14" x2="22" y2="14" stroke="#ccc"/><line x1="10" y1="18" x2="22" y2="18" stroke="#ccc"/><line x1="10" y1="22" x2="18" y2="22" stroke="#ccc"/></svg>`;
const PDF_ICON_32 = `<svg viewBox="0 0 32 32" style="width:32px;height:32px"><path d="M6 2h12l8 8v20H6z" fill="#fff" stroke="#808080" stroke-width="1"/><path d="M18 2v8h8" fill="#ddd" stroke="#808080" stroke-width="1"/><rect x="5" y="18" width="22" height="9" fill="#C8202B"/><text x="16" y="25" font-family="Arial,Helvetica,sans-serif" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text></svg>`;
const PDF_ICON_SMALL = `<svg viewBox="0 0 32 32" style="width:16px;height:16px"><path d="M6 2h12l8 8v20H6z" fill="#fff" stroke="#808080" stroke-width="1"/><path d="M18 2v8h8" fill="#ddd" stroke="#808080"/><rect x="5" y="18" width="22" height="9" fill="#C8202B"/><text x="16" y="25" font-family="Arial" font-size="7" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text></svg>`;
const APP_ICON_32 = `<svg viewBox="0 0 32 32" style="width:32px;height:32px"><rect x="3" y="4" width="26" height="24" rx="2" fill="#1b2330" stroke="#808080"/><circle cx="10" cy="12" r="2.4" fill="#5aa469"/><circle cx="22" cy="10" r="2.4" fill="#c0566f"/><circle cx="23" cy="21" r="2.4" fill="#3f7cb8"/><circle cx="12" cy="22" r="2.4" fill="#c08a3e"/><line x1="10" y1="12" x2="22" y2="10" stroke="#67708a"/><line x1="22" y1="10" x2="23" y2="21" stroke="#67708a"/><line x1="23" y1="21" x2="12" y2="22" stroke="#67708a"/><line x1="12" y1="22" x2="10" y2="12" stroke="#67708a"/></svg>`;
const APP_ICON_SMALL = `<svg viewBox="0 0 32 32" style="width:16px;height:16px"><rect x="3" y="4" width="26" height="24" rx="2" fill="#1b2330" stroke="#808080"/><circle cx="10" cy="12" r="2.4" fill="#5aa469"/><circle cx="22" cy="10" r="2.4" fill="#c0566f"/><circle cx="23" cy="21" r="2.4" fill="#3f7cb8"/><circle cx="12" cy="22" r="2.4" fill="#c08a3e"/></svg>`;


// ---- DESKTOP ICON BEHAVIOR ----
let lastTap = {};
document.querySelectorAll('.desktop-icon').forEach(icon => {
    const action = icon.dataset.action;
    const target = icon.dataset.target;

    function activate() {
        if (action === 'open-folder') openFolder(target);
        else if (action === 'open-file') openFile(target);
        else if (action === 'open-image') openImage(target);
    }

    icon.addEventListener('dblclick', e => { e.preventDefault(); activate(); });
    icon.addEventListener('touchend', e => {
        const now = Date.now();
        if (lastTap[target] && now - lastTap[target] < 400) {
            e.preventDefault(); activate(); lastTap[target] = 0;
        } else { lastTap[target] = now; }
    });
});


// ---- OPEN FOLDER ----
function openFolder(id) {
    const files = FOLDER_CONTENTS[id];
    if (!files) return;

    let html = '<div class="folder-grid">';
    files.forEach(f => {
        html += `<div class="folder-item" data-file="${f.id}" ondblclick="openFile('${f.id}')" ontouchend="handleFolderTap(event, '${f.id}')">
            ${f.icon || FILE_ICON_32}
            <span class="folder-item-label">${f.name}</span>
        </div>`;
    });
    html += '</div>';

    const folderNames = { 'agent-docs': 'Agent Docs', 'trust-research': 'Trust Research', 'apple-notes': 'Apple Notes', 'hardware-scaling': 'Hardware Scaling', 'design': 'Design', 'launch-product': 'How to launch a new product', 'reduction': 'Reduction' };
    WM.open('folder-' + id, folderNames[id] || id, html, {
        icon: FOLDER_ICON_SMALL,
        width: 420, height: 320,
        menuBar: '<span>File</span><span>Edit</span><span>View</span><span>Help</span>',
        statusText: `${files.length} object(s)`
    });
}

let folderTaps = {};
window.handleFolderTap = function(e, fileId) {
    const now = Date.now();
    if (folderTaps[fileId] && now - folderTaps[fileId] < 400) {
        e.preventDefault(); openFile(fileId); folderTaps[fileId] = 0;
    } else { folderTaps[fileId] = now; }
};


// ---- OPEN FILE ----
function openFile(id) {
    if (id === 'reduction-graph') { openKnowledgeGraph(); return; }
    if (typeof PDFS !== 'undefined' && PDFS[id]) { openPdf(id); return; }
    const contentEl = document.getElementById('content-' + id);
    if (!contentEl) return;
    const title = contentEl.dataset.title || id;
    const html = `<div class="notepad-body">${contentEl.innerHTML}</div>`;
    WM.open(id, title + ' - Notepad', html, {
        icon: FILE_ICON_SMALL,
        width: Math.min(700, window.innerWidth - 40),
        height: Math.min(520, window.innerHeight - 80),
        menuBar: '<span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>',
    });
}


// ---- OPEN IMAGE ----
function openImage(id) {
    const contentEl = document.getElementById('content-' + id);
    if (!contentEl) return;
    const title = contentEl.dataset.title || id;
    WM.open(id, title + ' - Image Viewer', contentEl.innerHTML, {
        icon: IMG_ICON_SMALL,
        width: Math.min(480, window.innerWidth - 20),
        height: Math.min(400, window.innerHeight - 60),
        bodyClass: 'win-body viewer-body',
        menuBar: '<span>File</span><span>Edit</span><span>View</span><span>Help</span>',
        statusText: 'palm_tree.bmp - 400 x 300 pixels'
    });
}


// ---- FOLDER CONTENTS ----
const FOLDER_CONTENTS = {
    'agent-docs': [
        { id: 'what-are-agents', name: 'What Are Agents.txt', icon: FILE_ICON_32 },
        { id: 'claude-ecosystem', name: 'Claude & the SDK.txt', icon: FILE_ICON_32 },
        { id: 'agent-history', name: 'History of Agents.txt', icon: FILE_ICON_32 },
    ],
    'trust-research': [
        { id: 'trust-state', name: 'Where We Stand on Trust.txt', icon: FILE_ICON_32 },
    ],
    'apple-notes': [
        { id: 'john-ternus', name: 'John Ternus.txt', icon: FILE_ICON_32 },
        { id: 'ternus-five-decisions', name: 'Five Decisions.txt', icon: FILE_ICON_32 },
        { id: 'apple-silicon', name: 'Apple Silicon Transition.txt', icon: FILE_ICON_32 },
        { id: 'operations-strategy', name: 'Operations as Strategy.txt', icon: FILE_ICON_32 },
    ],
    'hardware-scaling': [
        { id: 'npi-phase-gates', name: 'From EVT to MP.txt', icon: FILE_ICON_32 },
        { id: 'vertical-integration', name: 'Vertical Integration.txt', icon: FILE_ICON_32 },
        { id: 'supply-chain-moat', name: 'Supply Chain as Moat.txt', icon: FILE_ICON_32 },
        { id: 'dfm', name: 'Design for Manufacturing.txt', icon: FILE_ICON_32 },
    ],
    'design': [
        { id: 'jony-ive', name: 'Becoming a Student of Jony Ive.txt', icon: FILE_ICON_32 },
    ],
    'launch-product': [
        { id: 'launch-iphone-timeline', name: 'iPhone - Announce, Then Ship.txt', icon: FILE_ICON_32 },
        { id: 'launch-iphone-sourcing', name: 'iPhone - Glass & Foxconn.txt', icon: FILE_ICON_32 },
        { id: 'launch-iphone-gtm', name: 'iPhone - The Carrier Deal.txt', icon: FILE_ICON_32 },
        { id: 'launch-process', name: 'A Launch Is a Process.txt', icon: FILE_ICON_32 },
        { id: 'launch-operations', name: 'Having Something to Sell.txt', icon: FILE_ICON_32 },
        { id: 'launch-gtm', name: 'Getting It Into Hands.txt', icon: FILE_ICON_32 },
    ],
    'reduction': [
        { id: 'reduction-intro', name: "Reduce, Don't Produce.txt", icon: FILE_ICON_32 },
        { id: 'reduction-architecture', name: 'Architecture - Less but Better.txt', icon: FILE_ICON_32 },
        { id: 'reduction-music', name: "Music - The Notes You Don't Play.txt", icon: FILE_ICON_32 },
        { id: 'reduction-art', name: 'Art - Carving Away.txt', icon: FILE_ICON_32 },
        { id: 'reduction-film', name: 'Film - Cutting to the Essential.txt', icon: FILE_ICON_32 },
        { id: 'reduction-writing', name: 'Writing - Omit Needless Words.txt', icon: FILE_ICON_32 },
        { id: 'reduction-product', name: 'Product - Saying No.txt', icon: FILE_ICON_32 },
        { id: 'reduction-graph', name: 'Knowledge Graph.app', icon: APP_ICON_32 },
        { id: 'reduction-sources', name: 'Sources & Further Reading.txt', icon: FILE_ICON_32 },
        { id: 'reduction-onstyle', name: 'On Style - Quiller-Couch (1916).txt', icon: FILE_ICON_32 },
        { id: 'reduction-andrea', name: 'Andrea del Sarto - Browning (1855).txt', icon: FILE_ICON_32 },
        { id: 'pdf-elements', name: 'The Elements of Style (1918).pdf', icon: PDF_ICON_32 },
        { id: 'pdf-oaw', name: 'On the Art of Writing (1916).pdf', icon: PDF_ICON_32 },
    ]
};


// ---- START MENU ----
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', e => {
    e.stopPropagation();
    startMenu.classList.toggle('open');
    startBtn.classList.toggle('active');
});

document.addEventListener('click', () => {
    startMenu.classList.remove('open');
    startBtn.classList.remove('active');
});

startMenu.addEventListener('click', e => e.stopPropagation());

document.querySelectorAll('.start-item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.dataset.action;
        startMenu.classList.remove('open');
        startBtn.classList.remove('active');
        if (action === 'about') showAbout();
        if (action === 'docs') openFolder('agent-docs');
        if (action === 'trust') openFolder('trust-research');
        if (action === 'apple') openFolder('apple-notes');
        if (action === 'hardware') openFolder('hardware-scaling');
        if (action === 'design') openFolder('design');
        if (action === 'launch') openFolder('launch-product');
        if (action === 'reduction') openFolder('reduction');
        if (action === 'reading') openFile('reading-list');
        if (action === 'readme') openFile('readme');
        if (action === 'image') openImage('vaporwave');
        if (action === 'shutdown') showShutdown();
    });
});


// ---- DIALOGS ----
function showDialog(title, icon, text, buttons = ['OK']) {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
        <div class="dialog">
            <div class="title-bar">
                <span class="title-bar-text">${title}</span>
            </div>
            <div class="dialog-body">
                <span class="dialog-icon">${icon}</span>
                <div class="dialog-text">${text}</div>
            </div>
            <div class="dialog-actions">
                ${buttons.map(b => `<button>${b}</button>`).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('button').focus();
    overlay.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => overlay.remove());
    });
    return overlay;
}

function showAbout() {
    showDialog('About Desktop 95', '💻',
        `<strong>Desktop 95</strong>
        Version 1.0<br><br>
        A retro desktop for reading and exploring.<br>
        Open folders. Read articles. Enjoy the vibes.`
    );
}

function showShutdown() {
    showDialog('Shut Down', '⚠️',
        `<strong>Are you sure?</strong>
        You haven't opened the palm tree yet.`,
        ['Stay', 'Cancel']
    );
}


// ---- CLOCK ----
function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    document.getElementById('clock').textContent = `${h % 12 || 12}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 10000);




// ============================================================
// PDF VIEWER (public-domain books in the library)
// ============================================================
const PDFS = {
    'pdf-elements': { file: 'pdfs/elements-of-style-1918.pdf', title: 'The Elements of Style (1918)' },
    'pdf-oaw':      { file: 'pdfs/on-the-art-of-writing-1916.pdf', title: 'On the Art of Writing (1916)' },
};

function openPdf(id) {
    const p = PDFS[id];
    if (!p) return;
    const html = `<iframe class="pdf-frame" src="${p.file}" title="${p.title}"></iframe>`;
    WM.open(id, p.title + ' - PDF', html, {
        icon: PDF_ICON_SMALL,
        width: Math.min(780, window.innerWidth - 30),
        height: Math.min(640, window.innerHeight - 60),
        bodyClass: 'win-body pdf-body',
        menuBar: '<span>File</span><span>View</span><span>Help</span>',
        statusText: p.title + '  ·  public domain'
    });
}


// ============================================================
// INTERACTIVE KNOWLEDGE GRAPH
// ============================================================
const KG_DOMAINS = {
    core:    { name: 'The idea',            color: '#5b6470' },
    arch:    { name: 'Architecture',        color: '#c0566f' },
    music:   { name: 'Music',               color: '#3f7cb8' },
    art:     { name: 'Visual art',          color: '#4f9e63' },
    film:    { name: 'Film',                color: '#c08a3e' },
    writing: { name: 'Writing',             color: '#8a63b5' },
    product: { name: 'Product & software',  color: '#2f9aa3' },
};

const KG_NODES = [
    { id:'reduction', l:'Reduction',          d:'core',    b:'Find the essential core of a thing by removing everything that is not essential.', open:'reduction-intro' },
    { id:'subtract',  l:'Subtraction bias',   d:'core',    b:'Klotz and colleagues showed in Nature (2021) that people default to adding, not removing.' },
    { id:'saintex',   l:'Saint-Exupery',      d:'core',    b:'Perfection is reached not when there is nothing more to add, but when there is nothing left to take away (1939).' },
    { id:'rams',      l:'Dieter Rams',        d:'core',    b:'Less, but better. Good design is as little design as possible.' },

    { id:'mies',      l:'Mies van der Rohe',  d:'arch',    b:'Popularized "less is more"; the Farnsworth House reduces a building to structure, glass, and proportion.' },
    { id:'browning',  l:'Browning',           d:'arch',    b:'Coined "Well, less is more" in the 1855 poem "Andrea del Sarto."', open:'reduction-andrea' },
    { id:'loos',      l:'Adolf Loos',         d:'arch',    b:'"Ornament and Crime": decoration dates and wastes; a plain wall outlives a busy one.' },
    { id:'ando',      l:'Tadao Ando',         d:'arch',    b:'Concrete, glass, and light; the Church of the Light makes a cross of daylight carry the room.' },
    { id:'ma',        l:'Ma (negative space)',d:'arch',    b:'The Japanese idea that the empty interval is the active part of a composition.' },

    { id:'rubin',     l:'Rick Rubin',         d:'music',   b:'Reduce, do not produce: remove what hides the song.', open:'reduction-music' },
    { id:'cash',      l:'Johnny Cash',        d:'music',   b:'American Recordings (1994): a voice and a guitar, nothing to hide behind.' },
    { id:'miles',     l:'Miles Davis',        d:'music',   b:'Built solos out of space; the notes you do not play.' },
    { id:'cage',      l:'John Cage',          d:'music',   b:'4’33" (1952): remove the intended sound and the room becomes the piece.' },
    { id:'eno',       l:'Brian Eno',          d:'music',   b:'Ambient music from a few looped notes; asks what not to play.' },

    { id:'picasso',   l:'Picasso',            d:'art',     b:'The Bull (1945): eleven states reducing a heavy animal to a few essential lines.', open:'reduction-art' },
    { id:'brancusi',  l:'Brancusi',           d:'art',     b:'Simplicity is the residue of approaching the real sense of a thing.' },
    { id:'michel',    l:'Michelangelo',       d:'art',     b:'The figure is already in the marble; the work is removing the surplus stone.' },
    { id:'matisse',   l:'Matisse',            d:'art',     b:'Drawing with scissors: reduction toward flat color.' },
    { id:'enso',      l:'Enso / sumi-e',      d:'art',     b:'The empty paper does as much work as the brushstroke.' },

    { id:'bresson',   l:'Bresson',            d:'film',    b:'Notes on the Cinematograph: strip acting, music, and movement to make a truer thing visible.', open:'reduction-film' },
    { id:'ozu',       l:'Ozu',                d:'film',    b:'A still, low camera and missing dramatic peaks; the small moments become the subject.' },
    { id:'hitchcock', l:'Hitchcock',          d:'film',    b:'Drama is life with the dull bits cut out.' },
    { id:'murch',     l:'Walter Murch',       d:'film',    b:'Editing is removal; rank emotion first and lose the rest.' },

    { id:'strunk',    l:'Strunk & White',     d:'writing', b:'Omit needless words. Every word should tell.', open:'reduction-writing' },
    { id:'heming',    l:'Hemingway',          d:'writing', b:'The iceberg: what you leave out still presses on what you keep, if you know it.' },
    { id:'qc',        l:'Quiller-Couch',      d:'writing', b:'Murder your darlings (1916).', open:'reduction-onstyle' },
    { id:'carver',    l:'Carver & Lish',      d:'writing', b:'A spare style largely made by an editor’s cuts.' },
    { id:'leonard',   l:'Elmore Leonard',     d:'writing', b:'Leave out the parts readers skip; if it sounds like writing, rewrite it.' },

    { id:'jobs',      l:'Steve Jobs',         d:'product', b:'Focus is saying no to a thousand things; the 1997 product line cut to four.', open:'reduction-product' },
    { id:'ive',       l:'Jony Ive',           d:'product', b:'Simplicity describes the purpose and place of an object, not the absence of clutter.' },
    { id:'maeda',     l:'John Maeda',         d:'product', b:'The simplest way to achieve simplicity is through thoughtful reduction.' },
    { id:'unix',      l:'Unix philosophy',    d:'product', b:'Do one thing and do it well.' },
    { id:'tesler',    l:'Tesler’s Law',  d:'product', b:'Complexity is conserved; let the builder absorb it, not the user.' },
];

const KG_EDGES = [
    ['reduction','subtract'],['reduction','saintex'],['reduction','rams'],
    ['reduction','mies'],['reduction','rubin'],['reduction','picasso'],
    ['reduction','bresson'],['reduction','strunk'],['reduction','jobs'],
    ['browning','mies'],['saintex','jobs'],['saintex','rams'],
    ['rams','ive'],['rams','jobs'],['rams','mies'],['rams','maeda'],['ive','jobs'],
    ['mies','loos'],['ando','ma'],['enso','ma'],
    ['rubin','cash'],['rubin','miles'],['miles','cage'],['cage','eno'],['cage','enso'],
    ['picasso','michel'],['picasso','brancusi'],['picasso','matisse'],['picasso','jobs'],
    ['bresson','ozu'],['bresson','murch'],['hitchcock','murch'],['murch','heming'],
    ['strunk','heming'],['strunk','qc'],['heming','carver'],['heming','leonard'],['leonard','strunk'],
    ['jobs','unix'],['unix','tesler'],['maeda','unix'],
];

function openKnowledgeGraph() {
    const id = 'reduction-graph';
    if (WM.windows[id]) { WM.unminimize(id); WM.focus(id); return; }
    const isMobile = window.innerWidth <= 600;
    const html = `
        <div class="kg-root">
            <svg class="kg-svg" xmlns="http://www.w3.org/2000/svg"></svg>
            <div class="kg-legend"></div>
            <div class="kg-panel">
                <div class="kg-panel-title">Reduction, mapped</div>
                <div class="kg-panel-body">Drag the canvas to pan, scroll to zoom, drag any node to move it. Click a node to read about it. Lit nodes link to a full article.</div>
                <a class="kg-panel-link" href="#" style="display:none"></a>
            </div>
        </div>`;
    WM.open(id, 'Knowledge Graph', html, {
        icon: APP_ICON_SMALL,
        width: isMobile ? window.innerWidth - 4 : 760,
        height: isMobile ? window.innerHeight - 40 : 540,
        bodyClass: 'win-body kg-body',
        menuBar: '<span>File</span><span>View</span><span>Help</span>',
        statusText: 'Reduction — interactive map of ' + KG_NODES.length + ' ideas'
    });
    buildGraph(id);
}

function buildGraph(winId) {
    const win = WM.windows[winId];
    if (!win) return;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = win.el.querySelector('.kg-svg');
    const legend = win.el.querySelector('.kg-legend');
    const pTitle = win.el.querySelector('.kg-panel-title');
    const pBody = win.el.querySelector('.kg-panel-body');
    const pLink = win.el.querySelector('.kg-panel-link');

    legend.innerHTML = Object.keys(KG_DOMAINS).map(k =>
        `<span class="kg-leg"><i style="background:${KG_DOMAINS[k].color}"></i>${KG_DOMAINS[k].name}</span>`).join('');

    const W = 1000, H = 720;
    const vb = { x: 0, y: 0, w: W, h: H };
    function setVB() { svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`); }
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    setVB();

    const domOrder = Object.keys(KG_DOMAINS);
    const nodes = KG_NODES.map(n => {
        const di = domOrder.indexOf(n.d);
        const ang = (di / domOrder.length) * Math.PI * 2;
        const R = n.d === 'core' ? 70 : 270;
        return Object.assign({}, n, {
            x: W / 2 + Math.cos(ang) * R + (Math.random() * 80 - 40),
            y: H / 2 + Math.sin(ang) * R + (Math.random() * 80 - 40),
            vx: 0, vy: 0, fixed: false
        });
    });
    const byId = {}; nodes.forEach(n => byId[n.id] = n);
    const edges = KG_EDGES.map(p => ({ a: byId[p[0]], b: byId[p[1]] })).filter(e => e.a && e.b);

    const gEdges = document.createElementNS(NS, 'g');
    const gNodes = document.createElementNS(NS, 'g');
    svg.appendChild(gEdges); svg.appendChild(gNodes);

    edges.forEach(e => {
        const ln = document.createElementNS(NS, 'line');
        ln.setAttribute('class', 'kg-edge');
        e.el = ln; gEdges.appendChild(ln);
    });

    nodes.forEach(n => {
        const g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'kg-node');
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('r', n.d === 'core' ? 15 : 10);
        c.setAttribute('fill', KG_DOMAINS[n.d].color);
        if (n.open) c.setAttribute('stroke-width', '3');
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('class', 'kg-label');
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dy', n.d === 'core' ? -21 : -15);
        t.textContent = n.l;
        g.appendChild(c); g.appendChild(t);
        n.el = g;
        g.addEventListener('mousedown', ev => { ev.stopPropagation(); startDrag(n, ev); });
        g.addEventListener('touchstart', ev => { ev.stopPropagation(); if (ev.touches[0]) startDrag(n, ev.touches[0]); }, { passive: true });
        g.addEventListener('click', ev => { ev.stopPropagation(); select(n); });
        gNodes.appendChild(g);
    });

    function select(n) {
        const nbr = new Set([n.id]);
        edges.forEach(e => { if (e.a === n) nbr.add(e.b.id); if (e.b === n) nbr.add(e.a.id); });
        nodes.forEach(m => {
            m.el.classList.toggle('sel', m === n);
            m.el.classList.toggle('dim', !nbr.has(m.id));
        });
        edges.forEach(e => e.el.classList.toggle('hot', e.a === n || e.b === n));
        pTitle.textContent = n.l;
        pBody.textContent = n.b;
        if (n.open) {
            pLink.style.display = 'inline-block';
            pLink.textContent = 'Open the ' + KG_DOMAINS[n.d].name.toLowerCase() + ' article →';
            pLink.onclick = ev => { ev.preventDefault(); openFile(n.open); };
        } else {
            pLink.style.display = 'none';
        }
    }
    function clearSel() {
        nodes.forEach(m => { m.el.classList.remove('sel'); m.el.classList.remove('dim'); });
        edges.forEach(e => e.el.classList.remove('hot'));
        pTitle.textContent = 'Reduction, mapped';
        pBody.textContent = 'Drag the canvas to pan, scroll to zoom, drag any node to move it. Click a node to read about it. Lit nodes link to a full article.';
        pLink.style.display = 'none';
    }

    function toSvg(cx, cy) {
        const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    let drag = null, pan = null;
    function startDrag(n, pointer) {
        const p = toSvg(pointer.clientX, pointer.clientY);
        drag = { node: n, dx: n.x - p.x, dy: n.y - p.y };
        n.fixed = true; kick();
    }
    function onMove(ev) {
        if (!svg.isConnected) return;
        const pt = ev.touches ? ev.touches[0] : ev;
        if (!pt) return;
        if (drag) {
            const p = toSvg(pt.clientX, pt.clientY);
            drag.node.x = p.x + drag.dx; drag.node.y = p.y + drag.dy;
            drag.node.vx = 0; drag.node.vy = 0;
            if (ev.cancelable) ev.preventDefault();
        } else if (pan) {
            const r = svg.getBoundingClientRect();
            vb.x = pan.x - (pt.clientX - pan.cx) / r.width * vb.w;
            vb.y = pan.y - (pt.clientY - pan.cy) / r.height * vb.h;
            setVB();
        }
    }
    function onUp() { if (drag) drag.node.fixed = false; drag = null; pan = null; }

    svg.addEventListener('mousedown', ev => { pan = { cx: ev.clientX, cy: ev.clientY, x: vb.x, y: vb.y }; });
    svg.addEventListener('click', ev => { if (ev.target === svg) clearSel(); });
    svg.addEventListener('wheel', ev => {
        ev.preventDefault();
        const r = svg.getBoundingClientRect();
        const mx = vb.x + (ev.clientX - r.left) / r.width * vb.w;
        const my = vb.y + (ev.clientY - r.top) / r.height * vb.h;
        const f = ev.deltaY > 0 ? 1.12 : 0.89;
        const nw = Math.max(320, Math.min(2000, vb.w * f));
        const nh = nw * (H / W);
        vb.x = mx - (mx - vb.x) * (nw / vb.w);
        vb.y = my - (my - vb.y) * (nh / vb.h);
        vb.w = nw; vb.h = nh; setVB();
    }, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);

    let alpha = 1, running = false, raf = null;
    function kick() { alpha = Math.max(alpha, 0.6); if (!running) loop(); }
    function loop() { running = true; tick(); }
    function tick() {
        if (!svg.isConnected) { running = false; return; }
        if (win.minimized) { raf = requestAnimationFrame(tick); return; }
        if (alpha <= 0.03 && !drag) { running = false; render(); return; }
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                let dx = a.x - b.x, dy = a.y - b.y;
                let d2 = dx * dx + dy * dy || 0.01;
                const rep = 2600 / d2, d = Math.sqrt(d2);
                const fx = dx / d * rep, fy = dy / d * rep;
                a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
            }
        }
        edges.forEach(e => {
            let dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
            const k = 0.02 * (d - 135), fx = dx / d * k, fy = dy / d * k;
            e.a.vx += fx; e.a.vy += fy; e.b.vx -= fx; e.b.vy -= fy;
        });
        nodes.forEach(n => { n.vx += (W / 2 - n.x) * 0.0022; n.vy += (H / 2 - n.y) * 0.0022; });
        nodes.forEach(n => {
            if (n.fixed) { n.vx = 0; n.vy = 0; return; }
            n.vx *= 0.86; n.vy *= 0.86;
            n.x += n.vx * alpha; n.y += n.vy * alpha;
            n.x = Math.max(28, Math.min(W - 28, n.x));
            n.y = Math.max(28, Math.min(H - 28, n.y));
        });
        alpha *= 0.985;
        render();
        raf = requestAnimationFrame(tick);
    }
    function render() {
        edges.forEach(e => {
            e.el.setAttribute('x1', e.a.x); e.el.setAttribute('y1', e.a.y);
            e.el.setAttribute('x2', e.b.x); e.el.setAttribute('y2', e.b.y);
        });
        nodes.forEach(n => n.el.setAttribute('transform', `translate(${n.x},${n.y})`));
    }

    kick();
    setTimeout(() => { const r = byId['reduction']; if (r) select(r); }, 400);
}
