const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

isSine = false;

class Cosine extends Sine {
    constructor(ctx, canvas) {
        super(ctx, canvas);
        this.name = "Kosinus(θ)";
    }

    getPoint() {
        return {
            x: this.cx + Math.sin(this.angle + this.phase) * this.radius,
            y: this.cy - Math.cos(this.angle + this.phase) * this.radius * this.amplitude - this.offset
        };
    }
}

const cosinus = new Cosine(ctx1, canvas1);
cosinus.reset();
cosinus.draw();