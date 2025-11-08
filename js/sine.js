const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isSine = true;

class Sine {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.reset();
        this.amplitude = 1;
        this.offset = 0;
        this.phase = 0;
        this.isPlaying = true;
        this.name = "Sinus(θ)";
        this.radiants = true;
    }

    reset() {
        this.radius = 100;
        this.speed = 0.02;
        this.cx = 130;
        this.cy = window.innerHeight * 0.5;
        this.startX = this.cx + 150;
        this.angle = 0;
        this.points = [];
    }

    setAmplitude(amplitude) {
        this.amplitude = amplitude;
    }

    setOffset(offset) {
        this.offset = offset * 100;
    }

    setPhase(phase) {
        this.phase = phase;
    }

    getPoint() {
        return {
            x: this.cx + Math.cos(this.angle + this.phase) * this.radius,
            y: this.cy - Math.sin(this.angle + this.phase) * this.radius * this.amplitude - this.offset
        };
    }

    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.clearRect(0, 0, width, height);

        // --- Achsen ---
        ctx.strokeStyle = "#555";
        ctx.beginPath();
        ctx.moveTo(0, this.cy);
        ctx.lineTo(width, this.cy);
        ctx.moveTo(this.cx, 0);
        ctx.lineTo(this.cx, height);
        ctx.stroke();

        // --- Kreis ---
        ctx.strokeStyle = "#666";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(this.cx, this.cy - this.offset, this.radius, this.radius * this.amplitude, 0, 0, Math.PI * 2);
        ctx.stroke();

        // --- Punkt auf Kreis ---

        const { x: px, y: py } = this.getPoint();

        // --- Dreieck ---
        ctx.strokeStyle = "#888";
        ctx.beginPath();
        ctx.moveTo(this.cx, this.cy - this.offset);
        ctx.lineTo(px, py);
        ctx.lineTo(px, this.cy - this.offset);
        ctx.closePath();
        ctx.stroke();

        // --- Punkt auf Kreis markieren ---
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        // --- Projektion zur Sinuskurve ---
        const curveX = this.startX + this.angle * this.radius;
        const curveY = py;

        ctx.strokeStyle = "gold";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(curveX, curveY);
        ctx.stroke();

        // --- Punkt auf Sinuskurve ---
        ctx.beginPath();
        ctx.arc(curveX, curveY, 5, 0, Math.PI * 2);
        ctx.fill();

        // --- Sinuskurve aufzeichnen ---
        this.points.push({ x: curveX, y: curveY });
        ctx.strokeStyle = "#0f0";
        ctx.beginPath();
        for (let i = 0; i < this.points.length - 1; i++) {
            ctx.moveTo(this.points[i].x, this.points[i].y);
            ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
        }
        ctx.stroke();

        // --- Achsenbeschriftungen ---
        ctx.fillStyle = "#aaa";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "left";

        ctx.fillText("x", this.cx + this.radius + 10, this.cy + 15);
        ctx.fillText("y", this.cx - 10, this.cy - this.radius - 15);
        ctx.fillText("0", this.cx - 10, this.cy + 15);

        ctx.fillText(this.name, this.startX + 180, this.cy - this.radius * 2 - 20);

        // --- X-Achse: π-Skalen ---
        ctx.textAlign = "center";
        ctx.fillStyle = "#888";
        const labels = this.radiants ? ["0", "π/2", "π", "3π/2", "2π", "5π/2", "3π", "7π/2", "4π", "5π/2", "6π"] : ["0°", "90°", "180°", "270°", "360°", "450°", "540°", "630°", "720°", "810°", "900°"];
        for (let i = 0; i < labels.length; i++) {
            const xPos = this.startX + i * (Math.PI / 2) * this.radius;
            if (xPos > width - 20) {
                break;
            };
            ctx.fillText(labels[i], xPos, this.cy + 20);
            ctx.beginPath();
            ctx.moveTo(xPos, this.cy - 5);
            ctx.lineTo(xPos, this.cy + 5);
            ctx.strokeStyle = "#444";
            ctx.stroke();
        }

        // --- Y-Achse der Sinuskurve ---
        ctx.strokeStyle = "#444";
        ctx.beginPath();
        ctx.moveTo(this.startX, this.cy - this.radius * 4 - 10);
        ctx.lineTo(this.startX, this.cy + this.radius * 4 + 10);
        ctx.stroke();

        // --- Y-Beschriftung ---
        ctx.fillStyle = "#888";
        ctx.textAlign = "right";
        ctx.fillText("+4", this.startX - 8, this.cy - this.radius * 4 + 4);
        ctx.fillText("+3", this.startX - 8, this.cy - this.radius * 3 + 4);
        ctx.fillText("+2", this.startX - 8, this.cy - this.radius * 2 + 4);
        ctx.fillText("+1", this.startX - 8, this.cy - this.radius + 4);
        ctx.fillText("0", this.startX - 8, this.cy + 4);
        ctx.fillText("-1", this.startX - 8, this.cy + this.radius + 4);
        ctx.fillText("-2", this.startX - 8, this.cy + this.radius * 2 + 4);
        ctx.fillText("-3", this.startX - 8, this.cy + this.radius * 3 + 4);
        ctx.fillText("-4", this.startX - 8, this.cy + this.radius * 4 + 4);

        // --- kleine Markierungen an Y-Achse ---
        ctx.beginPath();
        ctx.moveTo(this.startX - 5, this.cy - this.radius * 4);
        ctx.lineTo(this.startX + 5, this.cy - this.radius * 4);
        ctx.moveTo(this.startX - 5, this.cy - this.radius * 3);
        ctx.lineTo(this.startX + 5, this.cy - this.radius * 3);
        ctx.moveTo(this.startX - 5, this.cy - this.radius * 2);
        ctx.lineTo(this.startX + 5, this.cy - this.radius * 2);
        ctx.moveTo(this.startX - 5, this.cy - this.radius);
        ctx.lineTo(this.startX + 5, this.cy - this.radius);
        ctx.moveTo(this.startX - 5, this.cy);
        ctx.lineTo(this.startX + 5, this.cy);
        ctx.moveTo(this.startX - 5, this.cy + this.radius);
        ctx.lineTo(this.startX + 5, this.cy + this.radius);
        ctx.moveTo(this.startX - 5, this.cy + this.radius * 2);
        ctx.lineTo(this.startX + 5, this.cy + this.radius * 2);
        ctx.moveTo(this.startX - 5, this.cy + this.radius * 3);
        ctx.lineTo(this.startX + 5, this.cy + this.radius * 3);
        ctx.moveTo(this.startX - 5, this.cy + this.radius * 4);
        ctx.lineTo(this.startX + 5, this.cy + this.radius * 4);
        ctx.stroke();

        // --- Update ---
        this.angle += this.speed;

        if (this.startX + this.angle * this.radius > canvas.width - 20) {
            this.angle = 0;
            this.points = [];
        }

        if (this.isPlaying) {
            requestAnimationFrame(() => this.draw());
        }

    }
}
