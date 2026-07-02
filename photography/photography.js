// ============================================================
// Street Practice — deck, weekly rotation, stamps
//
// To add a challenge: append an object to CHALLENGES below.
// slug: stable id (share links + saved progress — don't rename)
// difficulty: 1 easy afternoon … 3 test of nerve
// themes: light | people | composition | courage | discipline | play
// study: optional link to a master's official archive
// images: optional [{src, alt, credit}] — CC-licensed only,
//         credit must name author + license + source
// ============================================================

(function () {
    'use strict';

    var STUDY = {
        meyerowitz: { label: 'Joel Meyerowitz', url: 'https://www.joelmeyerowitz.com/' },
        moriyama: { label: 'Daidō Moriyama', url: 'https://www.moriyamadaido.com/en/' },
        maier: { label: 'Vivian Maier', url: 'https://www.vivianmaier.com/' },
        lintaro: { label: 'Samuel Lintaro', url: 'https://www.youtube.com/@samuelstreetlife' }
    };

    var CHALLENGES = [
        {
            slug: 'work-the-corner',
            title: 'Work the Corner',
            brief: 'Pick one busy corner and stay for 45 minutes. Don’t chase anything. The stage refills itself — shoot only what walks into your frame.',
            difficulty: 1,
            themes: ['people'],
            camera: 'X100V',
            master: 'after Joel Meyerowitz',
            study: STUDY.meyerowitz
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
            master: 'after Daidō Moriyama',
            study: STUDY.moriyama
        },
        {
            slug: 'two-worlds',
            title: 'Two Worlds, One Frame',
            brief: 'Shop windows, puddles, mirrors. Layer the street and its reflection so both read clearly. Bonus: put yourself in one.',
            difficulty: 2,
            themes: ['composition'],
            camera: 'any',
            master: 'after Vivian Maier',
            study: STUDY.maier
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
            master: 'after Vivian Maier',
            study: STUDY.maier
        },
        {
            slug: 'follow-the-light',
            title: 'Follow the Light, Not the Subject',
            brief: 'For one hour, walk only toward the best light you can see — and photograph whatever happens to be standing in it.',
            difficulty: 1,
            themes: ['light'],
            camera: 'any',
            master: 'after Joel Meyerowitz',
            study: STUDY.meyerowitz
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
            master: 'after Daidō Moriyama',
            study: STUDY.moriyama
        },
        {
            slug: 'three-planes',
            title: 'Three Planes',
            brief: 'One frame, three depths: something happening in the foreground, the middle ground, and the background. The hardest picture in street photography.',
            difficulty: 3,
            themes: ['composition'],
            camera: 'any',
            master: 'after Joel Meyerowitz',
            study: STUDY.meyerowitz
        },
        {
            slug: 'visual-pun',
            title: 'The Visual Pun',
            brief: 'Sign plus person, poster plus passerby — the accidental joke the city writes. You just have to be standing in the right place.',
            difficulty: 2,
            themes: ['composition'],
            camera: 'any',
            master: 'after Vivian Maier',
            study: STUDY.maier
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
            master: 'after Vivian Maier',
            study: STUDY.maier
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
            master: 'after Samuel Lintaro',
            study: STUDY.lintaro
        },
        {
            slug: 'one-scene-thirty-frames',
            title: 'One Scene, Thirty Frames',
            brief: 'Find one good scene and work it for thirty frames — angles, distances, waits — before walking away. The first frame is never the picture.',
            difficulty: 2,
            themes: ['discipline'],
            camera: 'X100V',
            master: 'after Samuel Lintaro',
            study: STUDY.lintaro
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

    // progress carries over from the previous design — same key
    var STORAGE_KEY = 'photo-challenges-done';
    // Monday, Jan 5 2026 UTC — anchor for the weekly rotation
    var WEEK_ANCHOR = Date.UTC(2026, 0, 5);
    var MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

    var KANJI = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

    var list = document.getElementById('chal-list');
    var weeklySlot = document.getElementById('weekly-slot');
    var filterWrap = document.getElementById('chal-filters');
    var progressCount = document.getElementById('progress-count');
    var progressEnso = document.getElementById('progress-enso');
    var progressReset = document.getElementById('progress-reset');
    var dealBtn = document.getElementById('deal-btn');

    var activeFilter = 'all';

    // ---------- helpers ----------

    function kanjiNum(n) {
        if (n <= 10) return KANJI[n - 1];
        if (n < 20) return '十' + (n % 10 ? KANJI[n % 10 - 1] : '');
        return KANJI[Math.floor(n / 10) - 1] + '十' + (n % 10 ? KANJI[n % 10 - 1] : '');
    }

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
        } catch (e) { /* private mode — stamps just won't persist */ }
    }

    function isDone(slug) {
        return loadDone().indexOf(slug) !== -1;
    }

    function toggleDone(slug) {
        var done = loadDone();
        var i = done.indexOf(slug);
        if (i === -1) done.push(slug); else done.splice(i, 1);
        saveDone(done);
        return i === -1;
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

    function difficultyHtml(d) {
        var out = [];
        for (var i = 1; i <= 3; i++) {
            out.push('<span' + (i <= d ? '' : ' class="dim"') + '>' + KANJI[i - 1] + '</span>');
        }
        return '<span class="entry-difficulty" title="Difficulty ' + d + ' of 3">' + out.join(' ') + '</span>';
    }

    function entryHtml(ch, opts) {
        var weekly = opts && opts.weekly;
        var done = isDone(ch.slug);
        var num = kanjiNum(CHALLENGES.indexOf(ch) + 1);

        var images = '';
        if (ch.images && ch.images.length) {
            images =
                '<div class="entry-strip' + (ch.images.length < 3 ? ' entry-strip--' + ch.images.length : '') + '">' +
                ch.images.map(function (im) {
                    var src = 'https://commons.wikimedia.org/wiki/Special:FilePath/' +
                        encodeURIComponent(im.file.replace(/^File:/, '')) + '?width=900';
                    return '<img src="' + src + '" alt="' + im.alt + '" loading="lazy">';
                }).join('') +
                '</div>' +
                '<p class="entry-credit">Photos: ' +
                ch.images.map(function (im) {
                    return '<a href="' + im.pageUrl + '" target="_blank" rel="noopener">' +
                        im.author + '</a> (' + im.license + ')';
                }).join(' · ') +
                ' · via Wikimedia Commons</p>';
        }

        var study = ch.study
            ? '<p class="entry-study">Study: <a href="' + ch.study.url + '" target="_blank" rel="noopener">' + ch.study.label + '</a></p>'
            : '';

        return '' +
            '<article class="entry' + (weekly ? ' entry--weekly' : '') + (done ? ' entry--done' : '') + '"' +
            ' data-slug="' + ch.slug + '"' + (weekly ? '' : ' id="' + ch.slug + '"') + '>' +
            (weekly ? '<span class="entry-vertical" aria-hidden="true">今週の課題</span>' : '') +
            (done ? '<span class="entry-hanko" aria-hidden="true">済</span>' : '') +
            (weekly
                ? '<p class="entry-week">This week · ' + weekLabel() + '</p>'
                : '<p class="entry-num" aria-label="Challenge ' + (CHALLENGES.indexOf(ch) + 1) + '">' + num + '</p>') +
            '<h3 class="entry-title">' + ch.title + '</h3>' +
            '<p class="entry-brief">' + ch.brief + '</p>' +
            (ch.master ? '<p class="entry-master">' + ch.master + '</p>' : '') +
            '<div class="entry-meta">' +
            difficultyHtml(ch.difficulty) +
            '<span>' + ch.camera + '</span>' +
            ch.themes.map(function (t) { return '<span>' + t + '</span>'; }).join('') +
            '</div>' +
            images +
            study +
            '<div class="entry-actions">' +
            '<button class="entry-done-btn" type="button" data-action="done" aria-pressed="' + done + '">' +
            (done ? 'Stamped 済' : 'Mark done') +
            '</button>' +
            '<button class="entry-share-btn" type="button" data-action="share">Copy link</button>' +
            '</div>' +
            '</article>';
    }

    function render() {
        var visible = CHALLENGES.filter(function (ch) {
            return activeFilter === 'all' || ch.themes.indexOf(activeFilter) !== -1;
        });
        list.innerHTML = visible.map(function (ch) { return entryHtml(ch); }).join('');
        weeklySlot.innerHTML = entryHtml(weeklyChallenge(), { weekly: true });

        var doneCount = loadDone().filter(function (slug) {
            return CHALLENGES.some(function (ch) { return ch.slug === slug; });
        }).length;

        progressCount.textContent = doneCount + ' / ' + CHALLENGES.length;

        // ink the ensō in proportion to stamped challenges
        var len = progressEnso.getTotalLength();
        var drawn = len * (doneCount / CHALLENGES.length);
        progressEnso.style.strokeDasharray = drawn + ' ' + len;
    }

    // ---------- interactions ----------

    function flash(entry) {
        entry.classList.remove('entry--flash');
        void entry.offsetWidth; // restart the animation
        entry.classList.add('entry--flash');
    }

    function goToEntry(slug) {
        var entry = list.querySelector('[data-slug="' + slug + '"]');
        if (!entry) {
            activeFilter = 'all';
            filterWrap.querySelectorAll('.deck-filter').forEach(function (f) {
                f.classList.toggle('active', f.dataset.filter === 'all');
            });
            render();
            entry = list.querySelector('[data-slug="' + slug + '"]');
        }
        if (entry) {
            entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
            flash(entry);
        }
    }

    function copyLink(slug, btn) {
        var url = location.origin + location.pathname + '#' + slug;
        function ok() {
            var prev = btn.textContent;
            btn.textContent = 'Copied';
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
        var entry = btn.closest('.entry');
        if (!entry) return;
        var slug = entry.dataset.slug;

        if (btn.dataset.action === 'done') {
            var nowDone = toggleDone(slug);
            render();
            if (nowDone) {
                // press the fresh stamp(s) for this slug
                document.querySelectorAll('.entry[data-slug="' + slug + '"] .entry-hanko')
                    .forEach(function (h) { h.classList.add('pressed'); });
            }
        } else if (btn.dataset.action === 'share') {
            copyLink(slug, btn);
        }
    });

    filterWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.deck-filter');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        filterWrap.querySelectorAll('.deck-filter').forEach(function (f) {
            f.classList.toggle('active', f === btn);
        });
        render();
    });

    progressReset.addEventListener('click', function () {
        if (loadDone().length === 0) return;
        if (window.confirm('Clear all stamps on this device?')) {
            saveDone([]);
            render();
        }
    });

    dealBtn.addEventListener('click', function () {
        var pool = CHALLENGES.filter(function (ch) { return !isDone(ch.slug); });
        if (pool.length === 0) pool = CHALLENGES;
        var pick = pool[Math.floor(Math.random() * pool.length)];
        goToEntry(pick.slug);
    });

    // ---------- init ----------

    render();

    if (location.hash) {
        var slug = location.hash.slice(1);
        if (CHALLENGES.some(function (ch) { return ch.slug === slug; })) {
            // let layout settle before scrolling to the shared entry
            setTimeout(function () { goToEntry(slug); }, 100);
        }
    }
})();
