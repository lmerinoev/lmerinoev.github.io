// ============================================================
// Dark mode
// ============================================================

(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();
})();

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.querySelector('.nav-theme-toggle');
    if (!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.textContent = isDark ? '\u2600' : '\u263E';
}

// ============================================================
// Mobile menu
// ============================================================

function toggleMobileMenu() {
    const links = document.querySelector('.nav-links');
    const btn = document.querySelector('.nav-mobile-toggle');
    if (!links || !btn) return;

    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '\u2715' : '\u2630';
}

// Close mobile menu on link click
document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-link')) {
        const links = document.querySelector('.nav-links');
        const btn = document.querySelector('.nav-mobile-toggle');
        if (links && links.classList.contains('open')) {
            links.classList.remove('open');
            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
                btn.textContent = '\u2630';
            }
        }
    }
});

// ============================================================
// Intersection Observer — fade in on scroll
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
});

// ============================================================
// Active nav link (scroll-based, homepage only)
// ============================================================

(function () {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    var links = document.querySelectorAll('.nav-link[href^="#"]');
    if (!links.length) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                var scrollY = window.scrollY + 100;
                var current = '';
                sections.forEach(function (s) {
                    if (s.offsetTop <= scrollY) {
                        current = s.getAttribute('id');
                    }
                });
                links.forEach(function (l) {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
                });
                ticking = false;
            });
            ticking = true;
        }
    });
})();
