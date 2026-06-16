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
    hd: `<svg viewBox="0 0 48 48"><defs><linearGradient id="hdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fafdff"/><stop offset="0.5" stop-color="#cfe0f3"/><stop offset="0.5" stop-color="#a9c4e6"/><stop offset="1" stop-color="#dceafb"/></linearGradient></defs><rect x="7" y="13" width="34" height="22" rx="4" fill="url(#hdg)" stroke="#7d97b8" stroke-width="1"/><rect x="9" y="15" width="30" height="9" rx="2" fill="#ffffff" opacity="0.55"/><circle cx="34" cy="30" r="2" fill="#6d88ab"/><rect x="11" y="28" width="13" height="2.4" rx="1.2" fill="#8aa3c4"/></svg>`,

    folder: `<svg viewBox="0 0 48 48"><defs><linearGradient id="fld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0fb"/><stop offset="1" stop-color="#5fa8ea"/></linearGradient><linearGradient id="fldb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d4f7"/><stop offset="1" stop-color="#4f9ce6"/></linearGradient></defs><path d="M6 14c0-1.7 1.3-3 3-3h11l3 3.5h13c1.7 0 3 1.3 3 3V36c0 1.7-1.3 3-3 3H9c-1.7 0-3-1.3-3-3z" fill="url(#fldb)" stroke="#3f86c9" stroke-width="1"/><path d="M6 19h36V36c0 1.7-1.3 3-3 3H9c-1.7 0-3-1.3-3-3z" fill="url(#fld)" stroke="#3f86c9" stroke-width="1"/><path d="M7 20h34c-.6 3-2 5-4 5H11c-2 0-3.4-2-4-5z" fill="#ffffff" opacity="0.35"/></svg>`,

    doc: `<svg viewBox="0 0 48 48"><defs><linearGradient id="dcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e9eef4"/></linearGradient></defs><path d="M12 5h17l8 8v29a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="url(#dcg)" stroke="#9aa4ad" stroke-width="1"/><path d="M29 5v8h8z" fill="#d3dae1" stroke="#9aa4ad" stroke-width="1"/><g stroke="#5e85c4" stroke-width="1.6" stroke-linecap="round"><line x1="16" y1="19" x2="32" y2="19"/><line x1="16" y1="24" x2="32" y2="24"/><line x1="16" y1="29" x2="32" y2="29"/><line x1="16" y1="34" x2="26" y2="34"/></g></svg>`,

    pdf: `<svg viewBox="0 0 48 48"><defs><linearGradient id="pdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef0f2"/></linearGradient></defs><path d="M12 5h17l8 8v29a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="url(#pdg)" stroke="#9aa4ad" stroke-width="1"/><path d="M29 5v8h8z" fill="#d3dae1" stroke="#9aa4ad" stroke-width="1"/><rect x="9" y="27" width="30" height="13" rx="2" fill="#d6322b"/><text x="24" y="37" font-family="Helvetica, Arial" font-size="9" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text></svg>`,

    app: `<svg class="icon-glyph" viewBox="0 0 48 48"><defs><radialGradient id="apg" cx="0.5" cy="0.3" r="0.8"><stop offset="0" stop-color="#8fd0ff"/><stop offset="1" stop-color="#1f6fd0"/></radialGradient></defs><rect x="7" y="7" width="34" height="34" rx="9" fill="url(#apg)" stroke="#19589f" stroke-width="1"/><ellipse cx="24" cy="17" rx="13" ry="7" fill="#ffffff" opacity="0.35"/><circle cx="24" cy="25" r="9" fill="none" stroke="#fff" stroke-width="2.4"/><circle cx="24" cy="25" r="3" fill="#fff"/></svg>`,

    textedit: `<svg viewBox="0 0 48 48"><defs><linearGradient id="teg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6eaf0"/></linearGradient></defs><path d="M11 5h18l8 8v30H11z" fill="url(#teg)" stroke="#9aa4ad" stroke-width="1"/><path d="M29 5v8h8z" fill="#d3dae1" stroke="#9aa4ad"/><g stroke="#3c3c3c" stroke-width="1.4"><line x1="15" y1="20" x2="31" y2="20"/><line x1="15" y1="25" x2="31" y2="25"/><line x1="15" y1="30" x2="27" y2="30"/></g><path d="M30 33l9-9 5 5-9 9-6 1z" fill="#febc2e" stroke="#a9791a" stroke-width="1" stroke-linejoin="round"/></svg>`,

    safari: `<svg viewBox="0 0 48 48"><defs><radialGradient id="sfg" cx="0.5" cy="0.3" r="0.9"><stop offset="0" stop-color="#dff1ff"/><stop offset="0.5" stop-color="#7fb8ee"/><stop offset="1" stop-color="#1f6ec6"/></radialGradient></defs><circle cx="24" cy="24" r="19" fill="url(#sfg)" stroke="#15538f" stroke-width="1"/><circle cx="24" cy="24" r="14" fill="#eef6ff"/><g stroke="#9bb4cc" stroke-width="0.8"><line x1="24" y1="10" x2="24" y2="38"/><line x1="10" y1="24" x2="38" y2="24"/></g><path d="M24 24l11-11-7 14-15 8 7-14z" fill="#e4453a"/><path d="M24 24l11-11-7 14z" fill="#fff" opacity="0.85"/><circle cx="24" cy="24" r="2" fill="#444"/></svg>`,

    photos: `<svg viewBox="0 0 48 48"><defs><linearGradient id="phg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbfb"/><stop offset="1" stop-color="#dfe3e8"/></linearGradient></defs><rect x="6" y="9" width="36" height="30" rx="3" fill="url(#phg)" stroke="#9aa4ad"/><rect x="9" y="12" width="30" height="20" fill="#bfe0fb"/><circle cx="17" cy="19" r="3" fill="#ffd23f"/><path d="M9 32l9-9 6 5 7-8 8 9v3H9z" fill="#5aa45f"/></svg>`,

    win95: `<svg viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="26" rx="2" fill="#c9d2dc" stroke="#7e8896"/><rect x="9" y="11" width="30" height="20" fill="#0a6cba"/><g transform="translate(15 15)"><rect x="0" y="0" width="7" height="7" fill="#f24e4e"/><rect x="9" y="0" width="7" height="7" fill="#3fbf4b"/><rect x="0" y="9" width="7" height="7" fill="#3f7fe0"/><rect x="9" y="9" width="7" height="7" fill="#fbbf2e"/></g><rect x="14" y="34" width="20" height="3" fill="#9aa4b0"/><rect x="11" y="37" width="26" height="4" rx="1" fill="#b6bfc9" stroke="#7e8896"/></svg>`,

    twitter: `<svg viewBox="0 0 48 48"><rect x="5" y="5" width="38" height="38" rx="9" fill="#111"/><path d="M13 13l8.5 11.4L13 35h2.6l7-7.6 5.7 7.6H35l-9-12 8.2-10H31.6l-6.4 7-5.2-7z" fill="#fff"/></svg>`,

    trash: `<svg viewBox="0 0 48 48"><defs><linearGradient id="trg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset="1" stop-color="#aeb8c2"/></linearGradient></defs><path d="M13 16h22l-2 24c-.1 1.6-1.4 2.8-3 2.8H18c-1.6 0-2.9-1.2-3-2.8z" fill="url(#trg)" stroke="#7d8894"/><g stroke="#8893a0" stroke-width="1.6"><line x1="19" y1="21" x2="20" y2="38"/><line x1="24" y1="21" x2="24" y2="38"/><line x1="29" y1="21" x2="28" y2="38"/></g><rect x="10" y="11" width="28" height="5" rx="2.5" fill="#c2ccd6" stroke="#7d8894"/><path d="M19 11l1-3h8l1 3" fill="none" stroke="#7d8894" stroke-width="1.6"/></svg>`,

    finder: `<svg viewBox="0 0 48 48"><defs><linearGradient id="fng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0ff"/><stop offset="0.5" stop-color="#2f8be6"/><stop offset="0.5" stop-color="#1f6fd0"/><stop offset="1" stop-color="#6fc0ff"/></linearGradient></defs><rect x="7" y="7" width="34" height="34" rx="9" fill="url(#fng)" stroke="#15538f"/><path d="M19 18c0 3-1 6-3 8 3 1 7 1 10 0-1-3-1-6 0-9-2 1-5 1-7 1z" fill="#fff" opacity="0.95"/><path d="M19 16c1.5 1.5 7 1.5 9 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M18 30c2 2 8 2 11 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,

    home: `<svg viewBox="0 0 48 48"><path d="M24 9 7 23h5v15h24V23h5z" fill="#bfe0fb" stroke="#3f86c9"/><rect x="20" y="28" width="8" height="10" fill="#5fa8ea"/></svg>`
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
            { type: 'iframe', icon: 'photos', name: 'Coffee Photography', url: 'coffee.html', w: 880, h: 620 },
            { type: 'iframe', icon: 'photos', name: 'Photography', url: 'photography.html', w: 880, h: 620 },
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
        { icon: ICON.hd, label: 'Macintosh HD', action: () => Finder.open('home') },
        { icon: ICON.win95, label: 'Library', action: openLibrary },
        { icon: ICON.textedit, label: 'About Me', action: () => openDoc('about') }
    ];
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
    window.MacOS = { Finder, openDoc, openLibrary, openIframe };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
