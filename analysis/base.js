/* ══════════════════════════════════════════════
   Base JS — Strategic Intelligence Briefs
   Sidebar toggle for mobile navigation
   ══════════════════════════════════════════════ */

(function () {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (!hamburger || !sidebar || !overlay) return;

    function toggleMenu() {
        hamburger.classList.toggle('open');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close sidebar when clicking a nav link on mobile
    sidebar.querySelectorAll('nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 840) {
                toggleMenu();
            }
        });
    });
})();
