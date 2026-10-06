/* Reward Math: shared behavior for every page.
   No network calls, no analytics. Progress and the theme choice live in localStorage only,
   and every read and write is wrapped so the site still works when storage is blocked. */
(function () {
  'use strict';

  var MODULES = window.REWARD_MATH_MODULES || [];
  var PROGRESS_KEY = 'reward-math:progress:v1';
  var THEME_KEY = 'reward-math:theme';
  var root = document.documentElement;

  /* ---------------- storage ---------------- */
  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeStore(key, value) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
      return true;
    } catch (e) { return false; }
  }

  function moduleBySlug(slug) {
    for (var i = 0; i < MODULES.length; i++) if (MODULES[i].slug === slug) return MODULES[i];
    return null;
  }

  /* Keep only known modules and valid question numbers, whatever the source. */
  function cleanProgress(raw) {
    var out = { v: 1, modules: {} };
    if (!raw || typeof raw !== 'object' || !raw.modules || typeof raw.modules !== 'object') return out;
    MODULES.forEach(function (m) {
      var r = raw.modules[m.slug];
      if (!r || typeof r !== 'object') return;
      var qs = [];
      if (Array.isArray(r.q)) {
        r.q.forEach(function (n) {
          n = Number(n);
          if (Number.isInteger(n) && n >= 1 && n <= m.questions && qs.indexOf(n) < 0) qs.push(n);
        });
      }
      qs.sort(function (a, b) { return a - b; });
      if (r.done === true || qs.length) out.modules[m.slug] = { done: r.done === true, q: qs };
    });
    return out;
  }
  function loadProgress() {
    var s = readStore(PROGRESS_KEY);
    if (!s) return cleanProgress(null);
    try { return cleanProgress(JSON.parse(s)); } catch (e) { return cleanProgress(null); }
  }
  function saveProgress(p) {
    return writeStore(PROGRESS_KEY, JSON.stringify(cleanProgress(p)));
  }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function totals(p) {
    var mods = 0, qs = 0, qTotal = 0;
    MODULES.forEach(function (m) {
      qTotal += m.questions;
      var r = p.modules[m.slug];
      if (r) { if (r.done) mods++; qs += r.q.length; }
    });
    return { mods: mods, qs: qs, qTotal: qTotal };
  }

  /* ---------------- theme ---------------- */
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function systemDark() { return !!(mq && mq.matches); }
  function isDark() { return root.dataset.theme ? root.dataset.theme === 'dark' : systemDark(); }
  function labelTheme() {
    var b = document.getElementById('theme');
    if (!b) return;
    b.textContent = isDark() ? 'Light' : 'Dark';
    b.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
  }
  function initTheme() {
    var b = document.getElementById('theme');
    if (!b) return;
    b.hidden = false;
    b.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      // Matching the system setting clears the override, so the page follows the system again.
      if ((next === 'dark') === systemDark()) { delete root.dataset.theme; writeStore(THEME_KEY, null); }
      else { root.dataset.theme = next; writeStore(THEME_KEY, next); }
      labelTheme();
    });
    if (mq && mq.addEventListener) mq.addEventListener('change', labelTheme);
    labelTheme();
  }

  /* ---------------- math ---------------- */
  // Color roles. Each macro wraps its argument in a class the stylesheet colors.
  var MACROS = {
    '\\Cw': '\\htmlClass{t-win}{#1}', '\\Cl': '\\htmlClass{t-lose}{#1}', '\\Cm': '\\htmlClass{t-model}{#1}',
    '\\Cf': '\\htmlClass{t-fn}{#1}', '\\Cr': '\\htmlClass{t-ref}{#1}', '\\Cx': '\\htmlClass{t-x}{#1}'
  };
  function stripMacros(tex) { return tex.replace(/\\C[wlmfrx]\{/g, '{'); }
  function renderTex(el) {
    var tex = el.getAttribute('data-tex');
    var display = el.classList.contains('eq');
    if (window.katex) {
      try {
        window.katex.render(tex, el, {
          displayMode: display, throwOnError: false, strict: false,
          trust: function (ctx) { return ctx.command === '\\htmlClass'; },
          macros: Object.assign({}, MACROS)
        });
        return;
      } catch (e) { /* fall through to plain text */ }
    }
    el.textContent = stripMacros(tex);
    el.classList.add('tex-fallback');
  }
  function renderAllTex() {
    var els = document.querySelectorAll('[data-tex]');
    for (var i = 0; i < els.length; i++) renderTex(els[i]);
  }

  // Pointing at a row of a symbol key lights up that symbol in its formula.
  var ROLE_VAR = { win: '--win', lose: '--lose', model: '--model', fn: '--fn', ref: '--ref', x: '--ink' };
  function initKeys() {
    document.querySelectorAll('.key[data-for]').forEach(function (key) {
      var eq = document.getElementById(key.getAttribute('data-for'));
      if (!eq) return;
      var pinned = null;
      function light(t) {
        var on = !!t && t !== 'none';
        eq.classList.toggle('hl', on);
        eq.querySelectorAll('.enclosing').forEach(function (n) { n.classList.toggle('lit', on && n.classList.contains('t-' + t)); });
        if (on) eq.style.setProperty('--hl', 'var(' + ROLE_VAR[t] + ')');
      }
      key.querySelectorAll('button[data-t]').forEach(function (b) {
        var t = b.getAttribute('data-t');
        b.addEventListener('mouseenter', function () { light(t); });
        b.addEventListener('mouseleave', function () { light(pinned); });
        b.addEventListener('focus', function () { light(t); });
        b.addEventListener('blur', function () { light(pinned); });
        b.addEventListener('click', function () {
          pinned = pinned === t ? null : t;
          key.querySelectorAll('button[data-t]').forEach(function (x) {
            var on = x.getAttribute('data-t') === pinned;
            x.classList.toggle('on', on);
            x.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          light(pinned);
        });
      });
    });
  }

  /* ---------------- module page: exercises and completion ---------------- */
  function initModule() {
    var slug = document.body.getAttribute('data-module');
    if (!slug || !moduleBySlug(slug)) return;
    var p = loadProgress();
    var rec = p.modules[slug] || { done: false, q: [] };

    document.querySelectorAll('.ex .ans').forEach(function (a) { a.hidden = true; });
    document.querySelectorAll('.ex [data-reveal]').forEach(function (b) {
      var a = document.getElementById(b.getAttribute('aria-controls'));
      b.hidden = false;
      b.addEventListener('click', function () {
        a.hidden = !a.hidden;
        b.setAttribute('aria-expanded', a.hidden ? 'false' : 'true');
        b.textContent = a.hidden ? 'Show answer' : 'Hide answer';
      });
    });

    function persist() {
      var cur = loadProgress();
      cur.modules[slug] = rec;
      if (!saveProgress(cur)) showStorageNote();
    }
    document.querySelectorAll('.ex input[data-q]').forEach(function (c) {
      var n = Number(c.getAttribute('data-q'));
      c.checked = rec.q.indexOf(n) >= 0;
      c.addEventListener('change', function () {
        rec.q = rec.q.filter(function (x) { return x !== n; });
        if (c.checked) rec.q.push(n);
        persist();
      });
    });
    var done = document.getElementById('mod-done');
    if (done) {
      done.checked = !!rec.done;
      done.addEventListener('change', function () { rec.done = done.checked; persist(); });
    }
  }
  var noteShown = false;
  function showStorageNote() {
    if (noteShown) return;
    noteShown = true;
    var end = document.querySelector('.end');
    if (!end) return;
    var p = document.createElement('p');
    p.className = 'small';
    p.setAttribute('role', 'status');
    p.textContent = 'This browser is blocking storage, so progress will not be kept after you close the page.';
    end.appendChild(p);
  }

  /* ---------------- contents page: status, export, import ---------------- */
  function initContents() {
    var sum = document.getElementById('progress-sum');
    if (!sum) return;
    var undoState = null;

    function paint() {
      var p = loadProgress(), t = totals(p);
      sum.textContent = 'You have finished ' + t.mods + ' of ' + MODULES.length + ' modules and ' +
        t.qs + ' of ' + t.qTotal + ' exercises.';
      MODULES.forEach(function (m) {
        var el = document.querySelector('[data-status="' + m.slug + '"]');
        if (!el) return;
        var r = p.modules[m.slug];
        el.textContent = r && r.done ? 'finished' : r && r.q.length ? r.q.length + ' of ' + m.questions + ' exercises' : '';
      });
    }
    paint();

    var status = document.getElementById('io-status');
    function say(msg, withUndo) {
      status.textContent = msg + ' ';
      if (withUndo) {
        var u = document.createElement('button');
        u.type = 'button'; u.className = 'linkbtn'; u.textContent = 'Undo';
        u.addEventListener('click', function () {
          writeStore(PROGRESS_KEY, undoState);
          undoState = null; paint(); say('Import undone.');
        });
        status.appendChild(u);
      }
    }

    document.getElementById('export').addEventListener('click', function () {
      var data = { app: 'reward-math', version: 1, exported: new Date().toISOString(), progress: loadProgress() };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'reward-math-progress-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      var t = totals(loadProgress());
      say('Saved a file with ' + plural(t.mods, 'finished module', 'finished modules') + ' and ' + plural(t.qs, 'exercise', 'exercises') + '. Open this page on your other device and choose Import progress.');
    });

    var file = document.getElementById('import-file');
    document.getElementById('import').addEventListener('click', function () { file.click(); });
    file.addEventListener('change', function () {
      var f = file.files && file.files[0];
      file.value = '';
      if (!f) return;
      if (f.size > 200000) { say('That file is too large to be a progress file. Choose the .json file saved by Export.'); return; }
      var reader = new FileReader();
      reader.onload = function () {
        var data;
        try { data = JSON.parse(reader.result); } catch (e) { say('That file is not valid JSON. Choose the .json file saved by Export.'); return; }
        if (!data || data.app !== 'reward-math' || !data.progress) { say('That file was not saved by this site. Choose the .json file saved by Export.'); return; }
        var incoming = cleanProgress(data.progress);
        undoState = readStore(PROGRESS_KEY);
        if (!saveProgress(incoming)) { say('This browser is blocking storage, so the progress could not be saved.'); return; }
        paint();
        var t = totals(incoming);
        say('Imported ' + plural(t.mods, 'finished module', 'finished modules') + ' and ' + plural(t.qs, 'exercise', 'exercises') + '. This replaced the progress that was here.', true);
      };
      reader.onerror = function () { say('The file could not be read. Try choosing it again.'); };
      reader.readAsText(f);
    });
    document.getElementById('io').hidden = false;
  }

  /* ---------------- glossary filter ---------------- */
  function initGlossary() {
    var input = document.getElementById('gloss-filter');
    if (!input) return;
    var groups = document.querySelectorAll('.gloss [data-letter]');
    var count = document.getElementById('gloss-count');
    input.parentNode.hidden = false;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase(), shown = 0;
      groups.forEach(function (g) {
        var any = false;
        g.querySelectorAll('[data-term]').forEach(function (item) {
          var hit = !q || item.getAttribute('data-term').indexOf(q) >= 0 || item.textContent.toLowerCase().indexOf(q) >= 0;
          item.hidden = !hit;
          if (hit) { any = true; shown++; }
        });
        g.hidden = !any;
      });
      count.textContent = q ? shown + (shown === 1 ? ' term matches.' : ' terms match.') : '';
    });
  }

  /* ---------------- small helpers for figures ---------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function fmt(v, d) {
    var s = Math.abs(v).toFixed(d === undefined ? 1 : d);
    return (v < 0 && Number(s) !== 0 ? '−' : '') + s;
  }
  function sigmoid(z) { return 1 / (1 + Math.exp(-z)); }
  function svgEl(tag, attrs) {
    var n = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function pathFrom(fn, x0, x1, sx, sy) {
    var d = '', steps = 120;
    for (var i = 0; i <= steps; i++) {
      var x = x0 + (x1 - x0) * i / steps;
      d += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(fn(x)).toFixed(1);
    }
    return d;
  }

  var WIDGETS = {};

  /* Module 1: gradient descent on one neuron. */
  WIDGETS.gd = function (fig) {
    var x = 2, y = 1, w, b, step, eta = 0.5;
    var body = $('tbody', fig), out = $('[data-out]', fig);
    function row() {
      var z = w * x + b, yh = sigmoid(z), L = (yh - y) * (yh - y);
      var tr = document.createElement('tr');
      [step, w.toFixed(4), b.toFixed(4), yh.toFixed(4), L.toFixed(4)].forEach(function (v) {
        var td = document.createElement('td'); td.textContent = v; tr.appendChild(td);
      });
      body.appendChild(tr);
      out.textContent = 'After step ' + step + ', the loss is ' + L.toFixed(4) + '.';
    }
    function reset() { w = 0.5; b = 0; step = 0; body.textContent = ''; row(); }
    $('[data-act="step"]', fig).addEventListener('click', function () {
      if (step >= 30) { out.textContent = 'That is 30 steps. Reset to start again.'; return; }
      var z = w * x + b, yh = sigmoid(z), dz = 2 * (yh - y) * yh * (1 - yh);
      w -= eta * dz * x; b -= eta * dz; step++; row();
    });
    $('[data-act="reset"]', fig).addEventListener('click', reset);
    fig.querySelectorAll('[data-eta]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        eta = Number(btn.getAttribute('data-eta'));
        fig.querySelectorAll('[data-eta]').forEach(function (o) { o.setAttribute('aria-pressed', o === btn ? 'true' : 'false'); });
        reset();
      });
    });
    reset();
  };

  /* Module 4: Bradley-Terry probability and loss for two adjustable rewards. */
  WIDGETS.bt = function (fig) {
    var rw = 2.0, rl = 0.5;
    var svg = $('.plot svg', fig);
    var X0 = 30, X1 = 272, Y0 = 150, Y1 = 12;
    function sx(z) { return X0 + (z + 6) / 12 * (X1 - X0); }
    function sy(p) { return Y0 - p * (Y0 - Y1); }
    svg.appendChild(svgEl('path', { 'class': 'grid', d: 'M' + X0 + ' ' + sy(0.5) + 'H' + X1 }));
    svg.appendChild(svgEl('path', { 'class': 'axis', d: 'M' + X0 + ' ' + Y1 + 'V' + Y0 + 'H' + X1 }));
    [[1, '1'], [0.5, '0.5'], [0, '0']].forEach(function (t) {
      var tx = svgEl('text', { x: X0 - 6, y: sy(t[0]) + 4, 'text-anchor': 'end' }); tx.textContent = t[1]; svg.appendChild(tx);
    });
    [-6, -3, 0, 3, 6].forEach(function (z) {
      var tx = svgEl('text', { x: sx(z), y: Y0 + 16, 'text-anchor': 'middle' }); tx.textContent = z < 0 ? '−' + (-z) : String(z); svg.appendChild(tx);
    });
    var lab = svgEl('text', { x: X1, y: Y0 + 30, 'text-anchor': 'end' }); lab.textContent = 'reward gap'; svg.appendChild(lab);
    svg.appendChild(svgEl('path', { 'class': 'curve', d: pathFrom(sigmoid, -6, 6, sx, sy) }));
    var guide = svgEl('path', { 'class': 'guide' }), pt = svgEl('circle', { 'class': 'pt', r: 4.5 }), val = svgEl('text', { 'class': 'val' });
    svg.appendChild(guide); svg.appendChild(pt); svg.appendChild(val);
    function clamp(v) { return Math.max(-4, Math.min(4, Math.round(v * 10) / 10)); }
    function upd() {
      var d = Math.round((rw - rl) * 10) / 10, ez = Math.exp(-d), p = 1 / (1 + ez), L = -Math.log(p);
      $('[data-out="w"]', fig).textContent = fmt(rw);
      $('[data-out="l"]', fig).textContent = fmt(rl);
      $('.lines', fig).innerHTML =
        'gap   <span class="w">' + fmt(rw) + '</span> − <span class="l">' + (rl < 0 ? '(' + fmt(rl) + ')' : fmt(rl)) + '</span> = <strong>' + fmt(d) + '</strong>\n' +
        'P     <span class="f">σ</span>(' + fmt(d) + ') = 1/(1+e<sup>' + fmt(-d) + '</sup>) = <strong>' + p.toFixed(3) + '</strong>\n' +
        'loss  −<span class="f">log</span> ' + p.toFixed(3) + ' = <strong>' + L.toFixed(3) + '</strong>';
      var cx = sx(Math.max(-6, Math.min(6, d))), cy = sy(p), right = cx < 190;
      guide.setAttribute('d', 'M' + cx + ' ' + Y0 + 'V' + cy);
      pt.setAttribute('cx', cx); pt.setAttribute('cy', cy);
      val.textContent = p.toFixed(3);
      val.setAttribute('text-anchor', right ? 'start' : 'end');
      val.setAttribute('x', cx + (right ? 9 : -9)); val.setAttribute('y', cy + (p > 0.8 ? 16 : -8));
    }
    var acts = { 'w+': function () { rw = clamp(rw + 0.5); }, 'w-': function () { rw = clamp(rw - 0.5); },
                 'l+': function () { rl = clamp(rl + 0.5); }, 'l-': function () { rl = clamp(rl - 0.5); } };
    fig.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () { acts[b.getAttribute('data-act')](); upd(); });
    });
    upd();
  };

  /* Modules 5 and 6 share a three-response example. */
  var REF = [0.5, 0.3, 0.2], TUNED = [0.7, 0.2, 0.1], REWARD = [1.0, 0.5, 0.0];
  function expReward(p) { return p.reduce(function (s, v, i) { return s + v * REWARD[i]; }, 0); }
  function kl(p, q) { return p.reduce(function (s, v, i) { return v > 0 ? s + v * Math.log(v / q[i]) : s; }, 0); }

  /* Module 5: how beta trades reward against KL. */
  WIDGETS.kl = function (fig) {
    var input = $('input[type=range]', fig), outB = $('output', fig), lines = $('.lines', fig);
    function upd() {
      var beta = Number(input.value), erRef = expReward(REF), erT = expReward(TUNED), k = kl(TUNED, REF);
      var oRef = erRef, oT = erT - beta * k;
      outB.textContent = beta.toFixed(2);
      var win = oT > oRef + 1e-9 ? 'The tuned policy scores higher, so the update is worth making.'
        : oT < oRef - 1e-9 ? 'The reference policy scores higher. The penalty outweighs the extra reward.'
        : 'The two policies tie.';
      lines.innerHTML =
        'reference  E[r] = ' + erRef.toFixed(3) + '\n' +
        '           KL   = 0.000\n' +
        '           objective = <strong>' + oRef.toFixed(3) + '</strong>\n' +
        'tuned      E[r] = ' + erT.toFixed(3) + '\n' +
        '           KL   = ' + k.toFixed(3) + '\n' +
        '           objective = <strong>' + oT.toFixed(3) + '</strong>';
      $('[data-out]', fig).textContent = win;
    }
    input.addEventListener('input', upd);
    upd();
  };

  /* Module 6: the closed-form optimal policy for a chosen beta. */
  WIDGETS.pistar = function (fig) {
    var input = $('input[type=range]', fig), outB = $('output', fig), bars = $('.bars', fig), lines = $('.lines', fig);
    var names = ['A', 'B', 'C'];
    var rows = names.map(function (n, i) {
      var r = document.createElement('div'); r.className = 'bar';
      r.innerHTML = '<span>' + n + ' <span class="small">(r = ' + REWARD[i].toFixed(1) + ')</span></span>' +
        '<span class="track"><span class="fillr" style="width:' + (REF[i] * 100) + '%"></span><span class="fillm"></span></span><span class="v"></span>';
      bars.appendChild(r);
      return r;
    });
    function upd() {
      var beta = Math.pow(10, Number(input.value));
      var u = REF.map(function (p, i) { return p * Math.exp(REWARD[i] / beta); });
      var Z = u.reduce(function (s, v) { return s + v; }, 0);
      var pi = u.map(function (v) { return v / Z; });
      outB.textContent = beta < 1 ? beta.toFixed(2) : beta.toFixed(1);
      rows.forEach(function (r, i) {
        $('.fillm', r).style.width = (pi[i] * 100).toFixed(1) + '%';
        $('.v', r).textContent = pi[i].toFixed(3);
      });
      var er = expReward(pi), k = kl(pi, REF);
      lines.innerHTML = 'Z(x)      = ' + Z.toFixed(3) + '\nE[r]      = ' + er.toFixed(3) + '\nKL        = ' + k.toFixed(3) +
        '\nobjective = <strong>' + (er - beta * k).toFixed(3) + '</strong>   (E[r] \u2212 \u03b2\u00b7KL)\n\u03b2\u00b7log Z   = ' + (beta * Math.log(Z)).toFixed(3);
    }
    input.addEventListener('input', upd);
    upd();
  };

  /* Module 7: group-normalized advantages from binary rewards. */
  WIDGETS.grpo = function (fig) {
    var boxes = fig.querySelectorAll('input[type=checkbox]'), out = $('[data-out]', fig);
    function upd() {
      var r = Array.prototype.map.call(boxes, function (b) { return b.checked ? 1 : 0; });
      var n = r.length, mean = r.reduce(function (s, v) { return s + v; }, 0) / n;
      var sd = Math.sqrt(r.reduce(function (s, v) { return s + (v - mean) * (v - mean); }, 0) / n);
      Array.prototype.forEach.call(boxes, function (b, i) {
        var a = sd > 0 ? (r[i] - mean) / sd : 0;
        var s = b.closest('.sample');
        s.style.setProperty('--c', r[i] ? 'var(--win)' : 'var(--lose)');
        $('.adv', s).textContent = 'reward ' + r[i] + ', advantage ' + fmt(a, 2);
      });
      out.textContent = sd > 0
        ? 'Mean reward ' + mean.toFixed(2) + ', standard deviation ' + sd.toFixed(2) + '. Correct answers are pushed up and wrong ones down.'
        : 'Every sample has the same reward, so every advantage is 0 and this prompt teaches the model nothing.';
    }
    Array.prototype.forEach.call(boxes, function (b) { b.addEventListener('change', upd); });
    upd();
  };

  /* Module 8: an illustrative overoptimization curve. */
  WIDGETS.gao = function (fig) {
    var svg = $('.plot svg', fig), input = $('input[type=range]', fig), outD = $('output', fig), lines = $('.lines', fig);
    var A = 1.0, B = 0.25, X0 = 34, X1 = 272, Y0 = 150, Y1 = 12, DMAX = 5, RMIN = -1.5, RMAX = 3;
    function sx(d) { return X0 + d / DMAX * (X1 - X0); }
    function sy(r) { return Y0 - (r - RMIN) / (RMAX - RMIN) * (Y0 - Y1); }
    function gold(d) { return d * (A - B * d); }
    function proxy(d) { return 0.8 * d * (A - 0.05 * d); }
    svg.appendChild(svgEl('path', { 'class': 'grid', d: 'M' + X0 + ' ' + sy(0) + 'H' + X1 }));
    svg.appendChild(svgEl('path', { 'class': 'axis', d: 'M' + X0 + ' ' + Y1 + 'V' + Y0 + 'H' + X1 }));
    [[3, '3'], [2, '2'], [1, '1'], [0, '0'], [-1, '−1']].forEach(function (t) {
      var tx = svgEl('text', { x: X0 - 6, y: sy(t[0]) + 4, 'text-anchor': 'end' }); tx.textContent = t[1]; svg.appendChild(tx);
    });
    [0, 1, 2, 3, 4, 5].forEach(function (d) {
      var tx = svgEl('text', { x: sx(d), y: Y0 + 16, 'text-anchor': 'middle' }); tx.textContent = String(d); svg.appendChild(tx);
    });
    var lab = svgEl('text', { x: X1, y: Y0 + 30, 'text-anchor': 'end' }); lab.textContent = 'd = √KL'; svg.appendChild(lab);
    svg.appendChild(svgEl('path', { 'class': 'curve proxy', d: pathFrom(proxy, 0, DMAX, sx, sy) }));
    svg.appendChild(svgEl('path', { 'class': 'curve gold', d: pathFrom(gold, 0, DMAX, sx, sy) }));
    var guide = svgEl('path', { 'class': 'guide' }), pg = svgEl('circle', { 'class': 'pt', r: 4.5 }), pp = svgEl('circle', { 'class': 'pt m', r: 4.5 });
    svg.appendChild(guide); svg.appendChild(pg); svg.appendChild(pp);
    function upd() {
      var d = Number(input.value), g = gold(d), p = proxy(d);
      outD.textContent = d.toFixed(1);
      guide.setAttribute('d', 'M' + sx(d) + ' ' + Y0 + 'V' + Y1);
      pg.setAttribute('cx', sx(d)); pg.setAttribute('cy', sy(g));
      pp.setAttribute('cx', sx(d)); pp.setAttribute('cy', sy(p));
      lines.innerHTML = 'd = ' + d.toFixed(1) + '   KL = d² = ' + (d * d).toFixed(2) + '\n' +
        '<span class="m">proxy score</span> = ' + p.toFixed(3) + '\n' +
        'gold score  = d(1 − 0.25d) = <strong>' + g.toFixed(3) + '</strong>';
    }
    input.addEventListener('input', upd);
    upd();
  };

  function initWidgets() {
    document.querySelectorAll('[data-widget]').forEach(function (fig) {
      var w = WIDGETS[fig.getAttribute('data-widget')];
      if (!w) return;
      try { w(fig); fig.classList.add('live'); } catch (e) { /* the static text still explains the example */ }
    });
  }

  /* ---------------- cats ---------------- */
  // Drawn in the page's gray ink. The pages place <use> references; this adds the drawings once.
  var CATS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="pencil" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="1.4"/></filter>' +
    '<symbol id="cat-sit" viewBox="0 0 64 72"><g filter="url(#pencil)" fill="none" stroke="currentColor" stroke-width="1.7">' +
      '<path class="fill" d="M22 35 C15 43 14.5 57 17.5 70.5 L42.5 70.5 C46 57 45 43 38.5 35 Z" stroke="none"/>' +
      '<path d="M22 35 C15 43 14.5 57 17.5 70.5 M38.5 35 C45 43 46 57 42.5 70.5"/>' +
      '<path class="fill" d="M18.5 23 C17.6 16 18.4 10.5 19.6 6.8 L25.6 13.2 C28.6 12.2 31.8 12.3 34.8 13.3 L40.6 7.2 C42 11 42.8 16.4 42 23 C41.4 30.6 36.6 35.4 30.2 35.4 C23.6 35.4 19.1 30.4 18.5 23 Z"/>' +
      '<path d="M21.2 12.2 L23.2 14.6 M39 12.4 L37.1 14.8" stroke-width="1.2"/>' +
      '<circle cx="25.4" cy="23.4" r="1.25" fill="currentColor" stroke="none"/><circle cx="35" cy="23.4" r="1.25" fill="currentColor" stroke="none"/>' +
      '<path d="M29.2 27.4 L30.2 28.4 L31.2 27.4 M30.2 28.4 C29.6 30 28.2 30.4 27.2 29.6 M30.2 28.4 C30.8 30 32.2 30.4 33.2 29.6" stroke-width="1.2"/>' +
      '<path d="M17.6 27.2 L10.4 26 M17.8 29.6 L10.8 30.8 M42.8 27.2 L50 26 M42.6 29.6 L49.6 30.8" stroke-width="1"/>' +
      '<path d="M26 70.5 C25.6 66 26.4 61.6 27.6 59.4 M34.6 70.5 C35 66 34.2 61.6 33 59.4" stroke-width="1.3"/>' +
      '<path d="M43 67 C53.5 67.6 58.6 60.2 55.4 52.4 C53.6 48.4 50 48.8 50.6 51.8"/>' +
    '</g></symbol>' +
    '<symbol id="cat-sleep" viewBox="0 0 90 46"><g filter="url(#pencil)" fill="none" stroke="currentColor" stroke-width="1.7">' +
      '<path class="fill" d="M14 44.5 C9 33 18 18.5 40 17.6 C62 16.8 77 25 77.4 37 C77.6 42 74 44.5 68 44.5 Z"/>' +
      '<path class="fill" d="M7 41 C5 32.6 9.4 25.6 16.6 24.2 L16.2 16.2 L22.4 22.6 C25.6 22.4 28.6 23.2 31 24.6 L35.6 18.4 L36.4 27.6 C38.8 32 38.4 38.2 35.6 44.5 L9.6 44.5 C8.4 43.6 7.4 42.4 7 41 Z"/>' +
      '<path d="M14.6 34.2 C16 35.6 18 35.6 19.4 34.2 M25.6 34.2 C27 35.6 29 35.6 30.4 34.2" stroke-width="1.2"/>' +
      '<path d="M21.4 38.4 L22.4 39.2 L23.4 38.4" stroke-width="1.1"/>' +
      '<path d="M72 41 C76 45.6 60 46.4 50 44.5" stroke-width="1.5"/>' +
      '<path d="M40 6.5 L45 6.5 L40 11.5 L45 11.5 M48.5 1.5 L52 1.5 L48.5 5 L52 5" stroke-width="1.1"/>' +
    '</g></symbol>' +
    '<symbol id="cat-peek" viewBox="0 0 52 28"><g filter="url(#pencil)" fill="none" stroke="currentColor" stroke-width="1.7">' +
      '<path class="fill" d="M7 27.5 C6.4 17 10.4 10.4 13.6 3.4 L19.4 9.6 C23.4 8.4 28.6 8.4 32.6 9.6 L38.4 3.4 C41.6 10.4 45.6 17 45 27.5"/>' +
      '<path d="M15.6 7.2 L17.4 9.6 M36.4 7.2 L34.6 9.6" stroke-width="1.2"/>' +
      '<circle cx="19.6" cy="17.8" r="1.6" fill="currentColor" stroke="none"/><circle cx="32.4" cy="17.8" r="1.6" fill="currentColor" stroke="none"/>' +
      '<path d="M25 21.4 L26 22.4 L27 21.4" stroke-width="1.2"/>' +
      '<path d="M9.4 21 L2.6 19.6 M9.8 23.4 L3.2 24.4 M42.6 21 L49.4 19.6 M42.2 23.4 L48.8 24.4" stroke-width="1"/>' +
      '<path class="fill" d="M9 27.6 C9.6 23.4 16.4 23.4 17 27.6 M35 27.6 C35.6 23.4 42.4 23.4 43 27.6"/>' +
    '</g></symbol></defs></svg>';
  function initCats() {
    if (!document.querySelector('.cat')) return;
    var holder = document.createElement('div');
    holder.innerHTML = CATS;
    document.body.insertBefore(holder.firstChild, document.body.firstChild);
  }

  /* ---------------- start ---------------- */
  function start() {
    initTheme();
    renderAllTex();
    initKeys();
    initModule();
    initContents();
    initGlossary();
    initWidgets();
    initCats();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
