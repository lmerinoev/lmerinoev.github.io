// ============================================================
// Photography Challenges — deck, weekly rotation, progress
//
// To add a challenge: append an object to CHALLENGES below.
// slug: stable id (used for share links + saved progress)
// difficulty: 1 easy afternoon … 3 test of nerve
// themes: light | people | composition | courage | discipline | play
// ============================================================

(function () {
    'use strict';

    var CHALLENGES = [
        {
            slug: 'work-the-corner',
            title: 'Work the Corner',
            brief: 'Pick one busy corner and stay for 45 minutes. Don’t chase anything. The stage refills itself — shoot only what walks into your frame.',
            difficulty: 1,
            themes: ['people'],
            camera: 'X100V',
            master: 'after Joel Meyerowitz'
        },
        {
            slug: 'snap-no-chimping',
            title: 'Snap Focus, No Chimping',
            brief: 'Snap focus at 2m, f/8, auto ISO. Shoot 100 frames and don’t look at the screen once until you’re home.',
            difficulty: 2,
            themes: ['courage', 'discipline'],
            camera: 'GR II'
        },
        {
            slug: 'are-bure-boke',
            title: 'Are, Bure, Boke',
            brief: 'Rough, blurred, out of focus — on purpose. High-contrast black and white, ISO 3200+, shoot while walking, through glass, from a moving bus.',
            difficulty: 2,
            themes: ['play'],
            camera: 'GR II',
            master: 'after Daidō Moriyama'
        },
        {
            slug: 'two-worlds',
            title: 'Two Worlds, One Frame',
            brief: 'Shop windows, puddles, mirrors. Layer the street and its reflection so both read clearly. Bonus: put yourself in one.',
            difficulty: 2,
            themes: ['composition'],
            camera: 'any',
            master: 'after Vivian Maier'
        },
        {
            slug: 'noon-light',
            title: 'Noon Is Not the Enemy',
            brief: 'Go out at the worst hour. Expose for the highlights, let the shadows go black, and use the hard edges as walls in your frame.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any'
        },
        {
            slug: 'follow-one-color',
            title: 'Follow One Color',
            brief: 'Pick a color at your front door and follow it across the city for an afternoon. It’s a leash: you only shoot where it appears.',
            difficulty: 1,
            themes: ['play'],
            camera: 'X-M1'
        },
        {
            slug: 'mono-week',
            title: 'Seven Days of Monochrome',
            brief: 'Black and white JPEG only, for a week. No color safety net, no converting later. Learn what survives without color.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'X100V'
        },
        {
            slug: 'hands',
            title: 'Hands',
            brief: 'An afternoon of gestures only: pointing, carrying, waving, holding. No faces required. The hand is the most candid part of a person.',
            difficulty: 2,
            themes: ['people'],
            camera: 'any'
        },
        {
            slug: 'not-close-enough',
            title: 'Not Close Enough',
            brief: 'Everything at arm’s length: 1.5 meters or less at 28mm. If your pictures aren’t good enough — you know the line.',
            difficulty: 3,
            themes: ['courage'],
            camera: 'GR II'
        },
        {
            slug: 'theatre-of-waiting',
            title: 'The Theatre of Waiting',
            brief: 'Bus stops, platforms, queues, laundromats. People waiting are people unguarded. Photograph the pause, not the action.',
            difficulty: 1,
            themes: ['people'],
            camera: 'any',
            master: 'after Vivian Maier'
        },
        {
            slug: 'follow-the-light',
            title: 'Follow the Light, Not the Subject',
            brief: 'For one hour, walk only toward the best light you can see — and photograph whatever happens to be standing in it.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any',
            master: 'after Joel Meyerowitz'
        },
        {
            slug: 'thirty-six-exposures',
            title: 'Thirty-Six Exposures',
            brief: 'One day, 36 frames, no deleting. When the roll is done, you’re done. Every press of the shutter has to earn itself.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'digicam'
        },
        {
            slug: 'bad-weather-only',
            title: 'Bad Weather Only',
            brief: 'Only shoot when it rains. Umbrellas, hunched shoulders, neon in puddles. The city changes costume — be there for it.',
            difficulty: 2,
            themes: ['light', 'courage'],
            camera: 'any'
        },
        {
            slug: 'tourist-at-home',
            title: 'Tourist at Home',
            brief: 'Photograph your daily route as if you land there tomorrow and will never come back. Familiarity is the enemy; break it.',
            difficulty: 1,
            themes: ['discipline'],
            camera: 'any'
        },
        {
            slug: 'after-dark',
            title: 'After Dark, No Flash',
            brief: 'Night. ISO 6400, shutter as slow as you dare, streetlights as your studio strobes. Embrace the grain and the blur.',
            difficulty: 3,
            themes: ['light'],
            camera: 'X100V',
            master: 'after Daidō Moriyama'
        },
        {
            slug: 'three-planes',
            title: 'Three Planes',
            brief: 'One frame, three depths: something happening in the foreground, the middle ground, and the background. The hardest picture in street photography.',
            difficulty: 3,
            themes: ['composition'],
            camera: 'any',
            master: 'after Joel Meyerowitz'
        },
        {
            slug: 'visual-pun',
            title: 'The Visual Pun',
            brief: 'Sign plus person, poster plus passerby — the accidental joke the city writes. You just have to be standing in the right place.',
            difficulty: 2,
            themes: ['composition'],
            camera: 'any',
            master: 'after Vivian Maier'
        },
        {
            slug: 'same-spot-four-lights',
            title: 'Same Spot, Four Lights',
            brief: 'One location, four visits: morning, noon, dusk, night. Same framing every time. Watch the light do all the work.',
            difficulty: 2,
            themes: ['light', 'discipline'],
            camera: 'any'
        },
        {
            slug: 'shadow-is-the-subject',
            title: 'The Shadow Is the Subject',
            brief: 'Shoot only shadows for a day. The person casting one is incidental. Long morning light or hard noon light both work.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any'
        },
        {
            slug: 'waist-level',
            title: 'Waist Level',
            brief: 'No viewfinder, no screen, all day. Camera at your chest or hip, like Maier’s Rolleiflex. Learn to frame with your body.',
            difficulty: 2,
            themes: ['courage'],
            camera: 'GR II',
            master: 'after Vivian Maier'
        },
        {
            slug: 'the-exit',
            title: 'The Exit',
            brief: 'Station exits, escalators, doorways: thresholds where people step from dark into light. Stand on the bright side and wait.',
            difficulty: 2,
            themes: ['people', 'light'],
            camera: 'any'
        },
        {
            slug: 'digicam-sunday',
            title: 'Digicam Sunday',
            brief: 'Take the worst camera you own. CCD colors, tiny sensor, slow autofocus. When the tool can’t be precise, you stop being precious.',
            difficulty: 1,
            themes: ['play'],
            camera: 'digicam'
        },
        {
            slug: 'carry-the-big-camera',
            title: 'Carry the Big Camera',
            brief: 'Take the DSLR to the street. You’ll be visible — so be visible. Nod, smile, keep shooting. Learn how presence changes the scene.',
            difficulty: 3,
            themes: ['courage'],
            camera: 'Nikon DSLR',
            master: 'after Samuel Lintaro'
        },
        {
            slug: 'one-scene-thirty-frames',
            title: 'One Scene, Thirty Frames',
            brief: 'Find one good scene and work it for thirty frames — angles, distances, waits — before walking away. The first frame is never the picture.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'X100V',
            master: 'after Samuel Lintaro'
        },
        {
            slug: 'no-people-street',
            title: 'Street Without People',
            brief: 'A candid photo of the city itself: chairs left mid-conversation, a glove on a railing, steam from a grate. Evidence of people, no people.',
            difficulty: 1,
            themes: ['composition', 'play'],
            camera: 'X-M1'
        }
    ];

    var STORAGE_KEY = 'photo-challenges-done';
    // Monday, Jan 5 2026 UTC — anchor for the weekly rotation
    var WEEK_ANCHOR = Date.UTC(2026, 0, 5);
    var MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

    var grid = document.getElementById('chal-grid');
    var weeklySlot = document.getElementById('weekly-slot');
    var filterWrap = document.getElementById('chal-filters');
    var progressCount = document.getElementById('progress-count');
    var progressFill = document.getElementById('progress-fill');
    var progressReset = document.getElementById('progress-reset');
    var dealBtn = document.getElementById('deal-btn');

    var activeFilter = 'all';

    // ---------- progress (localStorage, this device only) ----------

    function loadDone() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) {
            return [];
        }
    }

    function saveDone(slugs) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
        } catch (e) { /* private mode — progress just won't persist */ }
    }

    function isDone(slug) {
        return loadDone().indexOf(slug) !== -1;
    }

    function toggleDone(slug) {
        var done = loadDone();
        var i = done.indexOf(slug);
        if (i === -1) done.push(slug); else done.splice(i, 1);
        saveDone(done);
    }

    // ---------- weekly rotation (same for every visitor) ----------

    function weekIndex() {
        return Math.floor((Date.now() - WEEK_ANCHOR) / MS_PER_WEEK);
    }

    function weeklyChallenge() {
        var n = CHALLENGES.length;
        var idx = ((weekIndex() % n) + n) % n;
        return CHALLENGES[idx];
    }

    function weekLabel() {
        var monday = new Date(WEEK_ANCHOR + weekIndex() * MS_PER_WEEK);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return 'Week of ' + months[monday.getUTCMonth()] + ' ' + monday.getUTCDate() + ', ' + monday.getUTCFullYear();
    }

    // ---------- rendering ----------

    function dotsHtml(difficulty) {
        var html = '';
        for (var i = 1; i <= 3; i++) {
            html += '<span class="chal-card-dot' + (i <= difficulty ? ' chal-card-dot--on' : '') + '"></span>';
        }
        return html;
    }

    function cardHtml(ch, opts) {
        var num = String(CHALLENGES.indexOf(ch) + 1);
        if (num.length < 2) num = '0' + num;
        var done = isDone(ch.slug);
        var weekly = opts && opts.weekly;

        return '' +
            '<article class="chal-card' + (weekly ? ' chal-card--weekly' : '') + (done ? ' chal-card--done' : '') + '"' +
            ' data-slug="' + ch.slug + '"' + (weekly ? '' : ' id="' + ch.slug + '"') + '>' +
            '  <div class="chal-card-top">' +
            '    <span class="chal-card-num">' + (weekly ? weekLabel() : 'No. ' + num) + '</span>' +
            '    <span class="chal-card-dots" title="Difficulty ' + ch.difficulty + ' of 3">' + dotsHtml(ch.difficulty) + '</span>' +
            '  </div>' +
            '  <h3 class="chal-card-title">' + ch.title + '</h3>' +
            '  <p class="chal-card-brief">' + ch.brief + '</p>' +
            (ch.master ? '<div class="chal-card-master">' + ch.master + '</div>' : '') +
            '  <div class="chal-card-meta">' +
            '    <span class="chal-tag chal-tag--camera">' + ch.camera + '</span>' +
            ch.themes.map(function (t) { return '<span class="chal-tag">' + t + '</span>'; }).join('') +
            '  </div>' +
            '  <div class="chal-card-actions">' +
            '    <button class="chal-done-btn" type="button" data-action="done" aria-pressed="' + done + '">' +
            '      <span class="chal-done-box">&#10003;</span>' + (done ? 'Done' : 'Mark done') +
            '    </button>' +
            '    <button class="chal-share-btn" type="button" data-action="share">Copy link</button>' +
            '  </div>' +
            '</article>';
    }

    function render() {
        var visible = CHALLENGES.filter(function (ch) {
            return activeFilter === 'all' || ch.themes.indexOf(activeFilter) !== -1;
        });
        grid.innerHTML = visible.map(function (ch) { return cardHtml(ch); }).join('');
        weeklySlot.innerHTML = cardHtml(weeklyChallenge(), { weekly: true });

        var doneCount = loadDone().filter(function (slug) {
            return CHALLENGES.some(function (ch) { return ch.slug === slug; });
        }).length;
        progressCount.textContent = doneCount + ' / ' + CHALLENGES.length + ' done';
        progressFill.style.width = (doneCount / CHALLENGES.length * 100) + '%';
    }

    // ---------- interactions ----------

    function flash(card) {
        card.classList.remove('chal-card--flash');
        void card.offsetWidth; // restart the animation
        card.classList.add('chal-card--flash');
    }

    function goToCard(slug) {
        var card = grid.querySelector('[data-slug="' + slug + '"]');
        if (!card) {
            // hidden by the active filter — show everything, then find it
            activeFilter = 'all';
            filterWrap.querySelectorAll('.chal-filter').forEach(function (f) {
                f.classList.toggle('active', f.dataset.filter === 'all');
            });
            render();
            card = grid.querySelector('[data-slug="' + slug + '"]');
        }
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            flash(card);
        }
    }

    function copyLink(slug, btn) {
        var url = location.origin + location.pathname + '#' + slug;
        function ok() {
            var prev = btn.textContent;
            btn.textContent = 'Copied ✓';
            btn.classList.add('copied');
            setTimeout(function () {
                btn.textContent = prev;
                btn.classList.remove('copied');
            }, 1600);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(ok, function () {
                window.prompt('Copy this link:', url);
            });
        } else {
            window.prompt('Copy this link:', url);
        }
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var card = btn.closest('.chal-card');
        if (!card) return;
        var slug = card.dataset.slug;

        if (btn.dataset.action === 'done') {
            toggleDone(slug);
            render();
        } else if (btn.dataset.action === 'share') {
            copyLink(slug, btn);
        }
    });

    filterWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.chal-filter');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        filterWrap.querySelectorAll('.chal-filter').forEach(function (f) {
            f.classList.toggle('active', f === btn);
        });
        render();
    });

    progressReset.addEventListener('click', function () {
        if (loadDone().length === 0) return;
        if (window.confirm('Clear all completed marks on this device?')) {
            saveDone([]);
            render();
        }
    });

    dealBtn.addEventListener('click', function () {
        var pool = CHALLENGES.filter(function (ch) { return !isDone(ch.slug); });
        if (pool.length === 0) pool = CHALLENGES;
        var pick = pool[Math.floor(Math.random() * pool.length)];
        goToCard(pick.slug);
    });

    // ---------- init ----------

    render();

    if (location.hash) {
        var slug = location.hash.slice(1);
        if (CHALLENGES.some(function (ch) { return ch.slug === slug; })) {
            // let layout settle before scrolling to the shared card
            setTimeout(function () { goToCard(slug); }, 100);
        }
    }
})();
