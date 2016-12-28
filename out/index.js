(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var tinker_game_1 = require("tinker-game");
var tinker_core_1 = require("tinker-core");
class Turbodillo extends tinker_game_1.Game {
    update(dt) {
    }
    render(surface) {
    }
}
exports.Turbodillo = Turbodillo;
tinker_core_1.Tinker(Turbodillo);

},{"tinker-core":6,"tinker-game":12}],2:[function(require,module,exports){
"use strict";
class Component extends HTMLElement {
    constructor() {
        super();
        this.prepareVisibilityApi();
    }
    createShadowRoot() {
        if (!this.root) {
            this.root = this.attachShadow({ mode: 'open' });
            this.root.appendChild(this.el());
        }
    }
    connectedCallback() {
        this.createShadowRoot();
    }
    disconnectedCallback() {
        delete this.root;
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
    prepareVisibilityApi() {
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                this.pause();
            }
            else {
                this.resume();
            }
        });
    }
    pause() { }
    resume() { }
}
exports.Component = Component;

},{}],3:[function(require,module,exports){
"use strict";
function Tinker(who) {
    let name = ('tinker-' + who.name).toLowerCase();
    if (window.customElements) {
        window.customElements.define(name, who);
    }
    else if (document.registerElement) {
        document.registerElement(name, who);
    }
    else {
        throw 'custom elements not supported.';
    }
}
exports.Tinker = Tinker;

},{}],4:[function(require,module,exports){
"use strict";
class ColorRGB {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    scale(scalar) {
        return new ColorRGB(this.r * scalar, this.g * scalar, this.b * scalar);
    }
    toString() {
        let c = normalize(this);
        return `rgb(${c.r}, ${c.g}, ${c.b})`;
    }
}
exports.ColorRGB = ColorRGB;
class ColorRGBA {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    scale(scalar) {
        return new ColorRGBA(this.r * scalar, this.g * scalar, this.b * scalar, this.a * scalar);
    }
    toString() {
        let c = normalize(this);
        return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
    }
}
exports.ColorRGBA = ColorRGBA;
;
function normalize(color) {
    let c = (x) => x > 1 ? 1 : x < 0 ? 0 : x;
    let s = (x) => (c(x) * 255) | 0;
    let n;
    if (color instanceof ColorRGB)
        n = new ColorRGB(s(color.r), s(color.g), s(color.b));
    if (color instanceof ColorRGBA)
        n = new ColorRGBA(s(color.r), s(color.g), s(color.b), s(color.a));
    return n;
}

},{}],5:[function(require,module,exports){
"use strict";
class Font {
    constructor(name, ptSize) {
        this.name = name;
        this.ptSize = ptSize;
        // Clamp to a whole pt size
        this.ptSize = this.ptSize | 0;
    }
    toString() {
        return `${this.ptSize}pt ${this.name}`;
    }
}
exports.Font = Font;

},{}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./core/component.js"));
__export(require("./core/tinker.js"));
__export(require("./graphics/color.js"));
__export(require("./graphics/font.js"));
__export(require("./math/vector.js"));
__export(require("./utility/timer.js"));

},{"./core/component.js":2,"./core/tinker.js":3,"./graphics/color.js":4,"./graphics/font.js":5,"./math/vector.js":7,"./utility/timer.js":8}],7:[function(require,module,exports){
"use strict";
class Vector2D {
    get x() { return this.point.x; }
    get y() { return this.point.y; }
    constructor(point) {
        this.point = point;
    }
    clone() {
        return new Vector2D(this.point);
    }
    negative() {
        return new Vector2D({
            x: -this.x,
            y: -this.y
        });
    }
    add(other) {
        return new Vector2D({
            x: this.x + other.x,
            y: this.y + other.y
        });
    }
    iadd(other) {
        this.point.x += other.x;
        this.point.y += other.y;
        return this;
    }
    sub(other) {
        return new Vector2D({
            x: this.x - other.x,
            y: this.y - other.y
        });
    }
    mul(scalar) {
        return new Vector2D({
            x: this.x * scalar,
            y: this.y * scalar
        });
    }
    div(scalar) {
        let s = 1.0 / scalar;
        return this.mul(s);
    }
    dot(other) {
        return (this.x * other.x) + (this.y * other.y);
    }
    rot(angle) {
        let sangle = Math.sin(angle);
        let cangle = Math.cos(angle);
        let ox = this.x;
        let oy = this.y;
        return new Vector2D({
            x: ox * cangle - oy * sangle,
            y: ox * sangle + oy * cangle
        });
    }
    squareLength() {
        return this.dot(this);
    }
    length() {
        return Math.sqrt(this.squareLength());
    }
    squareDistance(other) {
        return this.sub(other).squareLength();
    }
    distance(other) {
        return this.sub(other).length();
    }
}
exports.Vector2D = Vector2D;
class Vector3D {
    get x() { return this.point.x; }
    get y() { return this.point.y; }
    get z() { return this.point.z; }
    constructor(point) {
        this.point = point;
    }
    clone() {
        return new Vector3D(this.point);
    }
    negative() {
        return new Vector3D({
            x: -this.x,
            y: -this.y,
            z: -this.z
        });
    }
    add(other) {
        return new Vector3D({
            x: this.x + other.x,
            y: this.y + other.y,
            z: this.z + other.z
        });
    }
    iadd(other) {
        this.point.x += other.x;
        this.point.y += other.y;
        this.point.z += other.z;
        return this;
    }
    sub(other) {
        return new Vector3D({
            x: this.x - other.x,
            y: this.y - other.y,
            z: this.z - other.z
        });
    }
    mul(scalar) {
        return new Vector3D({
            x: this.x * scalar,
            y: this.y * scalar,
            z: this.z * scalar
        });
    }
    div(scalar) {
        let s = 1.0 / scalar;
        return this.mul(s);
    }
    dot(other) {
        return (this.x * other.x) + (this.y * other.y) + (this.z + other.z);
    }
    squareLength() {
        return this.dot(this);
    }
    length() {
        return Math.sqrt(this.squareLength());
    }
    squareDistance(other) {
        return this.sub(other).squareLength();
    }
    distance(other) {
        return this.sub(other).length();
    }
}
exports.Vector3D = Vector3D;
function accumulate2D(data) {
    let sum = new Vector2D({ x: 0, y: 0 });
    for (let i = 0, n = data.length; i < n; ++i) {
        sum.iadd(data[i]);
    }
    return sum;
}
function accumulate3D(data) {
    let sum = new Vector3D({ x: 0, y: 0, z: 0 });
    for (let i = 0, n = data.length; i < n; ++i) {
        sum.iadd(data[i]);
    }
    return sum;
}
function accumulator(data) {
    let is2d = data[0] instanceof Vector2D;
    return is2d ? accumulate2D(data) : accumulate3D(data);
}
exports.accumulator = accumulator;

},{}],8:[function(require,module,exports){
"use strict";
class Timer {
    delta() {
        let now = new Date().getTime(), dt = now - (this.last || now);
        this.last = now;
        return dt / 1000.0;
    }
    reset() {
        this.last = new Date().getTime();
    }
}
exports.Timer = Timer;

},{}],9:[function(require,module,exports){
"use strict";
const tinker_core_1 = require("tinker-core");
const canvas_1 = require("../graphics/canvas");
class Game extends tinker_core_1.Component {
    get width() { return parseInt(this.getAttribute('width')); }
    set width(val) { this.setAttribute('wdith', val.toString()); }
    get height() { return parseInt(this.getAttribute('height')); }
    set height(val) { this.setAttribute('height', val.toString()); }
    constructor() {
        super();
        document.addEventListener('keydown', e => { if (e instanceof KeyboardEvent) {
            this.onKeyDown(e.which);
        } }, false);
        document.addEventListener('keyup', e => { if (e instanceof KeyboardEvent) {
            this.onKeyUp(e.which);
        } }, false);
        document.addEventListener('keypress', e => { if (e instanceof KeyboardEvent) {
            this.onKeyPress(e.which);
        } }, false);
        this.updateServices = [];
    }
    el() { return this.frontBuffer.el(); }
    onUpdate(service) {
        this.updateServices.push(service);
        return this;
    }
    onKeyDown(code) { }
    onKeyUp(code) { }
    onKeyPress(code) { }
    pause() { super.pause(); }
    resume() {
        super.resume();
        this.gameTimer.reset();
    }
    frame() {
        let dt = this.gameTimer.delta();
        let updates = this.doUpdates();
        updates({ deltaTime: dt }, function (context) {
            this.update(context);
        });
        this.render(this.backBuffer);
        this.frontBuffer.draw(this.backBuffer);
        requestAnimationFrame(() => this.frame());
    }
    doUpdates() {
        let middleware = this.updateServices;
        let self = this;
        return function (context, next) {
            let index = -1;
            return dispatch(0);
            function dispatch(i) {
                if (i > index) {
                    index = i;
                    let fn = (i === middleware.length) ? next : middleware[i].invoke;
                    fn.call(middleware[i] || self, context, () => { return dispatch(i + 1); });
                }
            }
        };
    }
    connectedCallback() {
        this.frontBuffer = new canvas_1.Canvas2D({ width: this.width, height: this.height });
        this.backBuffer = new canvas_1.Canvas2D({ width: this.width, height: this.height });
        this.gameTimer = new tinker_core_1.Timer();
        super.connectedCallback();
        this.frame();
    }
}
exports.Game = Game;

},{"../graphics/canvas":11,"tinker-core":6}],10:[function(require,module,exports){
"use strict";
class Updater {
}
exports.Updater = Updater;

},{}],11:[function(require,module,exports){
"use strict";
class Canvas2D {
    get width() { return this.size.width; }
    get height() { return this.size.height; }
    constructor(size) {
        this.size = size;
        this.canvas = document.createElement('canvas');
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.context = this.canvas.getContext('2d');
    }
    el() {
        return this.canvas;
    }
    clear(colors) {
        if (colors) {
            if (colors.fill) {
                this.context.fillStyle = colors.fill.toString();
                this.context.fillRect(0, 0, this.width, this.height);
            }
            if (colors.stroke) {
                this.context.strokeStyle = colors.stroke.color.toString();
                this.context.lineWidth = colors.stroke.size || 0;
                this.context.strokeRect(0, 0, this.width, this.height);
            }
        }
        else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        return this;
    }
    drawText(text, color, font, pos) {
        pos = pos || { x: 0, y: 0 };
        if (font) {
            this.context.font = font.toString();
        }
        if (color.stroke) {
            this.context.strokeStyle = color.stroke.color.toString();
            this.context.lineWidth = color.stroke.size;
            this.context.strokeText(text, pos.x, pos.y);
        }
        if (color.fill) {
            this.context.fillStyle = color.fill.toString();
            this.context.fillText(text, pos.x, pos.y);
        }
    }
    predraw(pos, angle, scale) {
        this.context.save();
        if (pos)
            this.context.translate(pos.x, pos.y);
        if (angle)
            this.context.rotate(angle);
        if (scale)
            this.context.scale(scale.width, scale.height);
        return this;
    }
    postdraw() {
        this.context.restore();
        return this;
    }
    drawShape(coloredShape) {
        this.context.beginPath();
        let shape = coloredShape;
        switch (shape.type) {
            case "circle":
                this.context.arc(0, 0, shape.radius, 0, 2 * Math.PI);
                break;
            case "rect":
                this.context.rect(-shape.size.width / 2, -shape.size.height / 2, shape.size.width, shape.size.height);
                break;
            case "ngon":
                let p = shape.points, c = this.context;
                c.moveTo(p[0].x, p[1].y);
                for (let i = 1; i < p.length; ++i) {
                    c.lineTo(p[i].x, p[i].y);
                }
                c.closePath();
                break;
        }
        if (coloredShape.fill) {
            this.context.fillStyle = coloredShape.fill.toString();
            this.context.fill();
        }
        if (coloredShape.stroke) {
            this.context.strokeStyle = coloredShape.stroke.color.toString();
            this.context.lineWidth = coloredShape.stroke.size;
            this.context.stroke();
        }
        return this;
    }
    drawShapeAt(coloredShape, pos) {
        return this.predraw(pos)
            .drawShape(coloredShape)
            .postdraw();
    }
    drawShapeScale(coloredShape, scale) {
        return this.predraw(null, null, scale)
            .drawShape(coloredShape)
            .postdraw();
    }
    drawShapeRotate(coloredShape, angle) {
        return this.predraw(null, angle)
            .drawShape(coloredShape)
            .postdraw();
    }
    drawShapeAtScale(coloredShape, pos, scale) {
        return this.predraw(pos, null, scale)
            .drawShape(coloredShape)
            .postdraw();
    }
    drawShapeAtRotate(coloredShape, pos, angle) {
        return this.predraw(pos, angle)
            .drawShape(coloredShape)
            .postdraw();
    }
    drawShapeAtScaleRotate(coloredShape, pos, scale, angle) {
        return this.predraw(pos, angle, scale)
            .drawShape(coloredShape)
            .postdraw();
    }
    draw(drawable) {
        this.context.drawImage(drawable.el(), 0, 0, drawable.width, drawable.height);
        return this;
    }
    drawAt(drawable, pos) {
        this.predraw(pos);
        this.draw(drawable);
        this.postdraw();
        return this;
    }
    drawScale(drawable, scale) {
        this.context.save();
        this.context.scale(scale.width, scale.height);
        this.draw(drawable);
        this.context.restore();
        return this;
    }
    drawRotate(drawable, angle) {
        this.context.save();
        this.context.rotate(angle);
        this.draw(drawable);
        this.context.restore();
        return this;
    }
    drawAtScale(drawable, pos, scale) {
        this.context.save();
        this.context.translate(pos.x, pos.y);
        this.context.scale(scale.width, scale.height);
        this.draw(drawable);
        this.context.restore();
        return this;
    }
    drawAtRotate(drawable, pos, angle) {
        this.context.save();
        this.context.translate(pos.x, pos.y);
        this.context.rotate(angle);
        this.draw(drawable);
        this.context.restore();
        return this;
    }
    drawAtScaleRotate(drawable, pos, scale, angle) {
        this.context.save();
        this.context.translate(pos.x, pos.y);
        this.context.scale(scale.width, scale.height);
        this.context.rotate(angle);
        this.draw(drawable);
        this.context.restore();
        return this;
    }
}
exports.Canvas2D = Canvas2D;
class Canvas3D {
    get width() { return this.size.width; }
    get height() { return this.size.height; }
    constructor(size) {
        this.size = size;
        this.canvas = document.createElement('canvas');
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.context = this.canvas.getContext('webgl');
    }
    el() {
        return this.canvas;
    }
    clear(colors) { throw "Canvas3D.clear not implemented."; }
    draw(drawable) { throw "Canvas3D.draw not implemented"; }
    drawAt(drawable, pos) { throw "Canvas3D.drawAt not implemented."; }
    drawScale(drawable, scale) { throw "Canvas3D.drawScale not implemented."; }
    drawRotate(drawable, angle) { throw "Canvas3D.drawRotated not implemented."; }
    drawAtScale(drawable, pos, scale) { throw "Canvas3D.drawAtScale not implemented."; }
    drawAtRotate(drawable, pos, angle) { throw "Canvas3D.drawAtRotated not implemented."; }
    drawAtScaleRotate(drawable, pos, scale, angle) { throw "Canvas3D.drawAtScaleRotated not implemented."; }
}
exports.Canvas3D = Canvas3D;
var CanvasType;
(function (CanvasType) {
    CanvasType[CanvasType["Canvas2D"] = 0] = "Canvas2D";
    CanvasType[CanvasType["Canvas3D"] = 1] = "Canvas3D";
})(CanvasType = exports.CanvasType || (exports.CanvasType = {}));
function MakeCanvas(size, type) {
    return type === CanvasType.Canvas2D ?
        new Canvas2D(size) :
        new Canvas3D(size);
}
exports.MakeCanvas = MakeCanvas;

},{}],12:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./core/game"));
__export(require("./core/updater"));
__export(require("./graphics/canvas"));

},{"./core/game":9,"./core/updater":10,"./graphics/canvas":11}]},{},[1]);
