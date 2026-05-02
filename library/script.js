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

    const folderNames = { 'agent-docs': 'Agent Docs', 'trust-research': 'Trust Research', 'apple-notes': 'Apple Notes', 'hardware-scaling': 'Hardware Scaling', 'design': 'Design' };
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


