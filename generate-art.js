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

    // Safe zone: shapes stay within this margin to avoid clipping
    var MARGIN = 60;
    var INNER = SIZE - MARGIN * 2;

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

    // Grid helpers — snapped to grid but within safe bounds
    function snap(rng, divisions) {
        divisions = divisions || 6;
        var step = INNER / divisions;
        return MARGIN + Math.floor(rng() * (divisions + 1)) * step;
    }

    function snapInner(rng, divisions) {
        // More conservative: stays 1 step inside the margins
        divisions = divisions || 6;
        var step = INNER / divisions;
        return MARGIN + step + Math.floor(rng() * (divisions - 1)) * step;
    }

    function snapSize(rng, minPx, maxPx) {
        // Returns a size value snapped to a grid
        var step = 25;
        var lo = Math.ceil(minPx / step);
        var hi = Math.floor(maxPx / step);
        if (hi < lo) hi = lo;
        return (lo + Math.floor(rng() * (hi - lo + 1))) * step;
    }

    // Clamp a circle so it stays within bounds
    function clampCircle(cx, cy, r) {
        var minC = MARGIN + r;
        var maxC = SIZE - MARGIN - r;
        if (minC > maxC) { r = INNER / 2; minC = MARGIN + r; maxC = minC; }
        cx = Math.max(minC, Math.min(maxC, cx));
        cy = Math.max(minC, Math.min(maxC, cy));
        return { cx: cx, cy: cy, r: r };
    }

    // Clamp a rect so it stays within bounds
    function clampRect(x, y, w, h) {
        if (w > INNER) w = INNER;
        if (h > INNER) h = INNER;
        if (x < MARGIN) x = MARGIN;
        if (y < MARGIN) y = MARGIN;
        if (x + w > SIZE - MARGIN) x = SIZE - MARGIN - w;
        if (y + h > SIZE - MARGIN) y = SIZE - MARGIN - h;
        return { x: x, y: y, w: w, h: h };
    }

    // Shape generators — each returns an SVG element string
    var shapes = {
        filledCircle: function (cx, cy, r, color) {
            var c = clampCircle(cx, cy, r);
            return '<circle cx="' + c.cx + '" cy="' + c.cy + '" r="' + c.r + '" fill="' + color + '"/>';
        },
        strokedCircle: function (cx, cy, r, color) {
            var c = clampCircle(cx, cy, r);
            return '<circle cx="' + c.cx + '" cy="' + c.cy + '" r="' + c.r + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        halfCircle: function (cx, cy, r, rotation, color) {
            var c = clampCircle(cx, cy, r);
            return '<path d="M ' + (c.cx - c.r) + ' ' + c.cy + ' A ' + c.r + ' ' + c.r + ' 0 0 1 ' + (c.cx + c.r) + ' ' + c.cy + ' Z" fill="' + color + '" transform="rotate(' + rotation + ' ' + c.cx + ' ' + c.cy + ')"/>';
        },
        quarterCircle: function (cx, cy, r, rotation, color) {
            var c = clampCircle(cx, cy, r);
            return '<path d="M ' + c.cx + ' ' + c.cy + ' L ' + (c.cx + c.r) + ' ' + c.cy + ' A ' + c.r + ' ' + c.r + ' 0 0 0 ' + c.cx + ' ' + (c.cy - c.r) + ' Z" fill="' + color + '" transform="rotate(' + rotation + ' ' + c.cx + ' ' + c.cy + ')"/>';
        },
        filledRect: function (x, y, w, h, color) {
            var b = clampRect(x, y, w, h);
            return '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" fill="' + color + '"/>';
        },
        strokedRect: function (x, y, w, h, color) {
            var b = clampRect(x, y, w, h);
            return '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        filledTriangle: function (cx, cy, size, rotation, color) {
            var h = size * Math.sqrt(3) / 2;
            var pts = [
                [cx, cy - h * 2/3],
                [cx - size/2, cy + h * 1/3],
                [cx + size/2, cy + h * 1/3]
            ];
            return '<polygon points="' + pts.map(function(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '" fill="' + color + '" transform="rotate(' + rotation + ' ' + cx + ' ' + cy + ')"/>';
        },
        strokedTriangle: function (cx, cy, size, rotation, color) {
            var h = size * Math.sqrt(3) / 2;
            var pts = [
                [cx, cy - h * 2/3],
                [cx - size/2, cy + h * 1/3],
                [cx + size/2, cy + h * 1/3]
            ];
            return '<polygon points="' + pts.map(function(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '" transform="rotate(' + rotation + ' ' + cx + ' ' + cy + ')"/>';
        },
        diamond: function (cx, cy, size, color, filled) {
            var half = size / 2;
            var pts = [[cx, cy - half], [cx + half, cy], [cx, cy + half], [cx - half, cy]];
            var pStr = pts.map(function(p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
            if (filled) return '<polygon points="' + pStr + '" fill="' + color + '"/>';
            return '<polygon points="' + pStr + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        line: function (x1, y1, x2, y2, color) {
            return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        cross: function (cx, cy, size, color) {
            var half = size / 2;
            return '<line x1="' + (cx - half) + '" y1="' + cy + '" x2="' + (cx + half) + '" y2="' + cy + '" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>' +
                   '<line x1="' + cx + '" y1="' + (cy - half) + '" x2="' + cx + '" y2="' + (cy + half) + '" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        },
        arc: function (cx, cy, r, startDeg, endDeg, color) {
            var c = clampCircle(cx, cy, r);
            var s = startDeg * Math.PI / 180;
            var e = endDeg * Math.PI / 180;
            var x1 = c.cx + c.r * Math.cos(s);
            var y1 = c.cy + c.r * Math.sin(s);
            var x2 = c.cx + c.r * Math.cos(e);
            var y2 = c.cy + c.r * Math.sin(e);
            var large = (endDeg - startDeg > 180) ? 1 : 0;
            return '<path d="M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' A ' + c.r + ' ' + c.r + ' 0 ' + large + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + '" fill="none" stroke="' + color + '" stroke-width="' + STROKE_W + '"/>';
        }
    };

    // Composition strategies
    var compositions = [
        // 0: Circle + square overlap
        function (rng, accent) {
            var els = [];
            var r = snapSize(rng, 60, 120);
            var cx = snapInner(rng, 6);
            var cy = snapInner(rng, 6);
            els.push(shapes.filledCircle(cx, cy, r, FG));
            var s = snapSize(rng, 80, 180);
            var sx = snapInner(rng, 6) - s/2;
            var sy = snapInner(rng, 6) - s/2;
            els.push(shapes.strokedRect(sx, sy, s, s, accent ? ACCENT : FG));
            return els;
        },
        // 1: Triangle + circle
        function (rng, accent) {
            var els = [];
            var size = snapSize(rng, 100, 200);
            var cx = snapInner(rng, 4);
            var cy = snapInner(rng, 4);
            var rot = [0, 60, 120, 180][Math.floor(rng() * 4)];
            els.push(shapes.filledTriangle(cx, cy, size, rot, FG));
            var r = snapSize(rng, 25, 60);
            var cx2 = snapInner(rng, 6);
            var cy2 = snapInner(rng, 6);
            els.push(shapes.filledCircle(cx2, cy2, r, accent ? ACCENT : FG));
            return els;
        },
        // 2: Rect + circle intersection
        function (rng, accent) {
            var els = [];
            var w = snapSize(rng, 120, 250);
            var h = snapSize(rng, 120, 250);
            var x = snapInner(rng, 6) - w/2;
            var y = snapInner(rng, 6) - h/2;
            els.push(shapes.strokedRect(x, y, w, h, FG));
            var r = snapSize(rng, 40, 100);
            var cx = snapInner(rng, 6);
            var cy = snapInner(rng, 6);
            els.push(shapes.filledCircle(cx, cy, r, accent ? ACCENT : FG));
            return els;
        },
        // 3: Rhythm lines (vertical or horizontal)
        function (rng, accent) {
            var els = [];
            var count = 3 + Math.floor(rng() * 4);
            var vertical = rng() > 0.5;
            var spacing = INNER / (count + 1);
            for (var i = 0; i < count; i++) {
                var pos = MARGIN + spacing * (i + 1);
                var start = MARGIN + snapSize(rng, 50, 200);
                var end = SIZE - MARGIN - snapSize(rng, 50, 200);
                var c = (accent && i === count - 1) ? ACCENT : FG;
                if (vertical) {
                    els.push(shapes.line(pos, start, pos, end, c));
                } else {
                    els.push(shapes.line(start, pos, end, pos, c));
                }
            }
            return els;
        },
        // 4: Quarter circle from corner + small shape
        function (rng, accent) {
            var els = [];
            var r = snapSize(rng, 120, 220);
            var corners = [
                [MARGIN, MARGIN, 0],
                [SIZE - MARGIN, MARGIN, 90],
                [SIZE - MARGIN, SIZE - MARGIN, 180],
                [MARGIN, SIZE - MARGIN, 270]
            ];
            var idx = Math.floor(rng() * 4);
            var c = corners[idx];
            els.push(shapes.quarterCircle(c[0], c[1], r, c[2], FG));
            // Add a contrasting small shape on the opposite side
            var cx2 = SIZE - c[0];
            var cy2 = SIZE - c[1];
            var pick = rng();
            if (pick < 0.33) {
                els.push(shapes.filledCircle(cx2, cy2, snapSize(rng, 25, 50), accent ? ACCENT : FG));
            } else if (pick < 0.66) {
                var ts = snapSize(rng, 40, 80);
                els.push(shapes.filledTriangle(cx2, cy2, ts, 0, accent ? ACCENT : FG));
            } else {
                var ds = snapSize(rng, 40, 80);
                els.push(shapes.diamond(cx2, cy2, ds, accent ? ACCENT : FG, true));
            }
            return els;
        },
        // 5: Diamond grid
        function (rng, accent) {
            var els = [];
            var cols = 2 + Math.floor(rng() * 2);
            var rows = cols;
            var spacing = INNER / (cols + 1);
            var dSize = spacing * 0.5;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < cols; c++) {
                    var cx = MARGIN + spacing * (c + 1);
                    var cy = MARGIN + spacing * (r + 1);
                    var col = (accent && r === rows - 1 && c === cols - 1) ? ACCENT : FG;
                    if (rng() > 0.25) {
                        els.push(shapes.diamond(cx, cy, dSize, col, rng() > 0.5));
                    }
                }
            }
            return els;
        },
        // 6: Two triangles
        function (rng, accent) {
            var els = [];
            var s1 = snapSize(rng, 100, 180);
            var cx1 = snapInner(rng, 4);
            var cy1 = snapInner(rng, 4);
            var rot1 = Math.floor(rng() * 4) * 90;
            els.push(shapes.filledTriangle(cx1, cy1, s1, rot1, FG));
            var s2 = snapSize(rng, 60, 120);
            var cx2 = snapInner(rng, 4);
            var cy2 = snapInner(rng, 4);
            var rot2 = Math.floor(rng() * 4) * 90;
            els.push(shapes.strokedTriangle(cx2, cy2, s2, rot2, accent ? ACCENT : FG));
            return els;
        },
        // 7: Concentric shapes (centered)
        function (rng, accent) {
            var els = [];
            var cx = SIZE / 2;
            var cy = SIZE / 2;
            var count = 2 + Math.floor(rng() * 2);
            var step = snapSize(rng, 30, 50);
            var useSquares = rng() > 0.5;
            for (var i = count - 1; i >= 0; i--) {
                var dim = step * (i + 1);
                if (i === 0) {
                    if (useSquares) {
                        els.push(shapes.filledRect(cx - dim, cy - dim, dim * 2, dim * 2, accent ? ACCENT : FG));
                    } else {
                        els.push(shapes.filledCircle(cx, cy, dim, accent ? ACCENT : FG));
                    }
                } else {
                    if (useSquares) {
                        els.push(shapes.strokedRect(cx - dim, cy - dim, dim * 2, dim * 2, FG));
                    } else {
                        els.push(shapes.strokedCircle(cx, cy, dim, FG));
                    }
                }
            }
            return els;
        },
        // 8: Grid of mixed small shapes
        function (rng, accent) {
            var els = [];
            var cols = 3 + Math.floor(rng() * 2);
            var rows = cols;
            var spacing = INNER / (cols + 1);
            var shapeSize = spacing * 0.3;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < cols; c++) {
                    var cx = MARGIN + spacing * (c + 1);
                    var cy = MARGIN + spacing * (r + 1);
                    var col = (accent && r === rows - 1 && c === cols - 1) ? ACCENT : FG;
                    if (rng() > 0.25) {
                        var pick = rng();
                        if (pick < 0.3) {
                            els.push(shapes.filledCircle(cx, cy, shapeSize, col));
                        } else if (pick < 0.5) {
                            els.push(shapes.strokedCircle(cx, cy, shapeSize, col));
                        } else if (pick < 0.7) {
                            els.push(shapes.filledRect(cx - shapeSize, cy - shapeSize, shapeSize * 2, shapeSize * 2, col));
                        } else if (pick < 0.85) {
                            els.push(shapes.filledTriangle(cx, cy, shapeSize * 2, 0, col));
                        } else {
                            els.push(shapes.cross(cx, cy, shapeSize * 2, col));
                        }
                    }
                }
            }
            return els;
        },
        // 9: Large rect + diagonal line + small shape
        function (rng, accent) {
            var els = [];
            var w = snapSize(rng, 150, 280);
            var h = snapSize(rng, 150, 280);
            var rx = (SIZE - w) / 2;
            var ry = (SIZE - h) / 2;
            els.push(shapes.strokedRect(rx, ry, w, h, FG));
            // Diagonal across the rect
            var flip = rng() > 0.5;
            if (flip) {
                els.push(shapes.line(rx, ry + h, rx + w, ry, FG));
            } else {
                els.push(shapes.line(rx, ry, rx + w, ry + h, FG));
            }
            // Small accent shape
            var pick = rng();
            var scx = snapInner(rng, 4);
            var scy = snapInner(rng, 4);
            var ss = snapSize(rng, 25, 50);
            if (pick < 0.33) {
                els.push(shapes.filledCircle(scx, scy, ss, accent ? ACCENT : FG));
            } else if (pick < 0.66) {
                els.push(shapes.filledTriangle(scx, scy, ss * 2, 0, accent ? ACCENT : FG));
            } else {
                els.push(shapes.diamond(scx, scy, ss * 2, accent ? ACCENT : FG, true));
            }
            return els;
        },
        // 10: Scattered squares
        function (rng, accent) {
            var els = [];
            var count = 3 + Math.floor(rng() * 3);
            for (var i = 0; i < count; i++) {
                var s = snapSize(rng, 40, 120);
                var x = snapInner(rng, 6) - s/2;
                var y = snapInner(rng, 6) - s/2;
                var col = (accent && i === count - 1) ? ACCENT : FG;
                if (rng() > 0.5) {
                    els.push(shapes.filledRect(x, y, s, s, col));
                } else {
                    els.push(shapes.strokedRect(x, y, s, s, col));
                }
            }
            return els;
        },
        // 11: Half circle + triangle
        function (rng, accent) {
            var els = [];
            var r = snapSize(rng, 80, 150);
            var cx = snapInner(rng, 4);
            var cy = snapInner(rng, 4);
            var rot = [0, 90, 180, 270][Math.floor(rng() * 4)];
            els.push(shapes.halfCircle(cx, cy, r, rot, FG));
            var ts = snapSize(rng, 50, 100);
            var tx = snapInner(rng, 4);
            var ty = snapInner(rng, 4);
            var trot = Math.floor(rng() * 4) * 90;
            els.push(shapes.filledTriangle(tx, ty, ts, trot, accent ? ACCENT : FG));
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
        'demo-generative-art',
        'project-coffee', 'project-photography', 'project-creative', 'project-color'
    ];

    // Export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = GenerativeArt;
    } else {
        root.GenerativeArt = GenerativeArt;
    }

})(typeof window !== 'undefined' ? window : this);
