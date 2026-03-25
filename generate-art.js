/**
 * Generative Art Engine
 * Minimal geometric compositions from a seed string.
 * See ART_GENERATION.md for design rules.
 */

(function (root) {
    'use strict';

    var SIZE = 600;
    var BG = '#FAFAF8';
    var FG = '#1C1C19';
    var ACCENT = '#E8B931';
    var STROKE_W = 1.5;

    // Deterministic PRNG (mulberry32)
    function mkRng(seed) {
        var h = 0;
        for (var i = 0; i < seed.length; i++) {
            h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
        }
        var t = Math.abs(h) | 0x6D2B79F5;
        return function () {
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Grid helpers
    function snap(rng, divisions) {
        divisions = divisions || 6;
        return Math.floor(rng() * (divisions + 1)) * (SIZE / divisions);
    }

    function snapRange(rng, min, max, div) {
        div = div || 12;
        var step = SIZE / div;
        var lo = Math.ceil(min / step);
        var hi = Math.floor(max / step);
        if (hi < lo) hi = lo;
        return (lo + Math.floor(rng() * (hi - lo + 1))) * step;
    }

    // Shape generators — each returns an SVG element string
    var shapes = {
        filledCircle: function (cx, cy, r, color) {
            return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '"/>';
        },
        strokedCircle: function (cx, cy, r, color) {
            return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        halfCircle: function (cx, cy, r, rotation, color) {
            return '<path d="M ' + (cx - r) + ' ' + cy + ' A ' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + cy + ' Z" fill="' + color + '" transform="rotate(' + rotation + ' ' + cx + ' ' + cy + ')"/>';
        },
        quarterCircle: function (cx, cy, r, rotation, color) {
            return '<path d="M ' + cx + ' ' + cy + ' L ' + (cx + r) + ' ' + cy + ' A ' + r + ' ' + r + ' 0 0 0 ' + cx + ' ' + (cy - r) + ' Z" fill="' + color + '" transform="rotate(' + rotation + ' ' + cx + ' ' + cy + ')"/>';
        },
        line: function (x1, y1, x2, y2, color) {
            return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        rect: function (x, y, w, h, color, filled) {
            if (filled) {
                return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + color + '"/>';
            }
            return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        arc: function (cx, cy, r, startDeg, endDeg, color) {
            var s = startDeg * Math.PI / 180;
            var e = endDeg * Math.PI / 180;
            var x1 = cx + r * Math.cos(s);
            var y1 = cy + r * Math.sin(s);
            var x2 = cx + r * Math.cos(e);
            var y2 = cy + r * Math.sin(e);
            var large = (endDeg - startDeg > 180) ? 1 : 0;
            return '<path d="M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        }
    };

    // Composition strategies
    var compositions = [
        // 0: Two circles, one large filled, one small stroked
        function (rng, accent) {
            var els = [];
            var r1 = snapRange(rng, 100, 200, 6);
            var cx1 = snap(rng, 6);
            var cy1 = snap(rng, 6);
            els.push(shapes.filledCircle(cx1, cy1, r1, FG));
            var r2 = snapRange(rng, 40, 80, 12);
            var cx2 = snap(rng, 12);
            var cy2 = snap(rng, 12);
            els.push(shapes.strokedCircle(cx2, cy2, r2, accent ? ACCENT : FG));
            return els;
        },
        // 1: Half-circle + line
        function (rng, accent) {
            var els = [];
            var r = snapRange(rng, 80, 180, 6);
            var cx = snap(rng, 6);
            var cy = snap(rng, 6);
            var rot = [0, 90, 180, 270][Math.floor(rng() * 4)];
            els.push(shapes.halfCircle(cx, cy, r, rot, FG));
            var x1 = snap(rng, 12);
            var y1 = snap(rng, 12);
            var x2 = snap(rng, 12);
            var y2 = snap(rng, 12);
            els.push(shapes.line(x1, y1, x2, y2, accent ? ACCENT : FG));
            return els;
        },
        // 2: Rectangle + circle intersection
        function (rng, accent) {
            var els = [];
            var w = snapRange(rng, 120, 280, 6);
            var h = snapRange(rng, 120, 280, 6);
            var x = snap(rng, 6);
            var y = snap(rng, 6);
            els.push(shapes.rect(x, y, w, h, FG, false));
            var r = snapRange(rng, 60, 140, 6);
            var cx = snap(rng, 6);
            var cy = snap(rng, 6);
            els.push(shapes.filledCircle(cx, cy, r, accent ? ACCENT : FG));
            return els;
        },
        // 3: Multiple lines (rhythm pattern)
        function (rng, accent) {
            var els = [];
            var count = 3 + Math.floor(rng() * 3);
            var vertical = rng() > 0.5;
            var base = snapRange(rng, 100, 400, 12);
            for (var i = 0; i < count; i++) {
                var offset = base + i * snapRange(rng, 20, 60, 12);
                var len1 = snap(rng, 12);
                var len2 = snap(rng, 12);
                var c = (accent && i === count - 1) ? ACCENT : FG;
                if (vertical) {
                    els.push(shapes.line(offset, len1, offset, len2, c));
                } else {
                    els.push(shapes.line(len1, offset, len2, offset, c));
                }
            }
            return els;
        },
        // 4: Quarter-circle corner composition
        function (rng, accent) {
            var els = [];
            var r1 = snapRange(rng, 150, 300, 6);
            var corners = [[0, 0, 0], [SIZE, 0, 90], [SIZE, SIZE, 180], [0, SIZE, 270]];
            var idx = Math.floor(rng() * 4);
            var c = corners[idx];
            els.push(shapes.quarterCircle(c[0], c[1], r1, c[2], FG));
            if (rng() > 0.4) {
                var r2 = snapRange(rng, 40, 100, 12);
                var cx = snap(rng, 6);
                var cy = snap(rng, 6);
                els.push(shapes.filledCircle(cx, cy, r2, accent ? ACCENT : FG));
            }
            return els;
        },
        // 5: Large arc + small filled shape
        function (rng, accent) {
            var els = [];
            var r = snapRange(rng, 150, 350, 6);
            var cx = snap(rng, 6);
            var cy = snap(rng, 6);
            var start = Math.floor(rng() * 360);
            var span = 60 + Math.floor(rng() * 180);
            els.push(shapes.arc(cx, cy, r, start, start + span, FG));
            var r2 = snapRange(rng, 20, 60, 12);
            var cx2 = snap(rng, 6);
            var cy2 = snap(rng, 6);
            els.push(shapes.filledCircle(cx2, cy2, r2, accent ? ACCENT : FG));
            return els;
        },
        // 6: Two half-circles facing each other
        function (rng, accent) {
            var els = [];
            var r = snapRange(rng, 80, 160, 6);
            var gap = snapRange(rng, 10, 60, 12);
            var cy = snap(rng, 6);
            var cx = SIZE / 2;
            els.push(shapes.halfCircle(cx - gap / 2, cy, r, 90, FG));
            els.push(shapes.halfCircle(cx + gap / 2, cy, r, 270, accent ? ACCENT : FG));
            return els;
        },
        // 7: Concentric circles
        function (rng, accent) {
            var els = [];
            var cx = snap(rng, 6);
            var cy = snap(rng, 6);
            var count = 2 + Math.floor(rng() * 3);
            var rBase = snapRange(rng, 30, 60, 12);
            for (var i = count - 1; i >= 0; i--) {
                var r = rBase + i * snapRange(rng, 30, 60, 12);
                if (i === 0) {
                    els.push(shapes.filledCircle(cx, cy, r, accent ? ACCENT : FG));
                } else {
                    els.push(shapes.strokedCircle(cx, cy, r, FG));
                }
            }
            return els;
        },
        // 8: Grid of small shapes
        function (rng, accent) {
            var els = [];
            var cols = 3 + Math.floor(rng() * 2);
            var rows = cols;
            var cellSize = SIZE / (cols + 2);
            var offset = cellSize;
            var shapeR = cellSize * 0.25;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < cols; c++) {
                    var cx = offset + c * cellSize + cellSize / 2;
                    var cy = offset + r * cellSize + cellSize / 2;
                    var col = (accent && r === rows - 1 && c === cols - 1) ? ACCENT : FG;
                    if (rng() > 0.3) {
                        els.push(shapes.filledCircle(cx, cy, shapeR, col));
                    }
                }
            }
            return els;
        },
        // 9: Diagonal line + shapes
        function (rng, accent) {
            var els = [];
            var flip = rng() > 0.5;
            if (flip) {
                els.push(shapes.line(0, SIZE, SIZE, 0, FG));
            } else {
                els.push(shapes.line(0, 0, SIZE, SIZE, FG));
            }
            var r = snapRange(rng, 40, 120, 6);
            var cx = snap(rng, 6);
            var cy = snap(rng, 6);
            els.push(shapes.filledCircle(cx, cy, r, accent ? ACCENT : FG));
            if (rng() > 0.5) {
                var w = snapRange(rng, 60, 160, 6);
                var h = snapRange(rng, 60, 160, 6);
                var x = snap(rng, 6);
                var y = snap(rng, 6);
                els.push(shapes.rect(x, y, w, h, FG, false));
            }
            return els;
        }
    ];

    // Main class
    function GenerativeArt(seed) {
        this.seed = seed || 'default';
        this.rng = mkRng(this.seed);
        this.useAccent = this.rng() < 0.25;
        this.compIdx = Math.floor(this.rng() * compositions.length);
        this.elements = compositions[this.compIdx](this.rng, this.useAccent);
    }

    GenerativeArt.prototype.toSVG = function () {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + SIZE + ' ' + SIZE + '" width="' + SIZE + '" height="' + SIZE + '">';
        svg += '<rect width="' + SIZE + '" height="' + SIZE + '" fill="' + BG + '"/>';
        for (var i = 0; i < this.elements.length; i++) {
            svg += this.elements[i];
        }
        svg += '</svg>';
        return svg;
    };

    GenerativeArt.prototype.toCanvas = function (canvas) {
        canvas = canvas || document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        var img = new Image();
        var svgBlob = new Blob([this.toSVG()], { type: 'image/svg+xml' });
        var url = URL.createObjectURL(svgBlob);
        img.onload = function () {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
        };
        img.src = url;
        return canvas;
    };

    GenerativeArt.prototype.toDataURI = function () {
        return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(this.toSVG())));
    };

    // Static helpers
    GenerativeArt.SIZE = SIZE;
    GenerativeArt.SEEDS = [
        'research-decision-making', 'research-trust-teams', 'research-hri-studies', 'research-conformity',
        'blog-sleeper-agents',
        'demo-trust', 'demo-emotion', 'demo-pose', 'demo-object', 'demo-ar', 'demo-personality', 'demo-drum', 'demo-jarvis',
        'project-coffee', 'project-photography', 'project-creative', 'project-color'
    ];

    // Export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = GenerativeArt;
    } else {
        root.GenerativeArt = GenerativeArt;
    }

})(typeof window !== 'undefined' ? window : this);
