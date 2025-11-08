const sinus = new Sine(ctx, canvas);
sinus.reset();
sinus.draw();

const ampSlider = isSine ? document.getElementById('ampSlider') : document.getElementById('ampSlider2');
ampSlider.addEventListener("input", () => {
    const target = isSine ? sinus : cosinus;
    const amplitude = parseFloat(ampSlider.value);
    target.setAmplitude(amplitude);
});

const offsetValue = isSine ? document.getElementById('offset') : document.getElementById('offset2');
offsetValue.addEventListener('input', () => {
    const target = isSine ? sinus : cosinus;
    const offset = parseFloat(offsetValue.value);
    target.setOffset(offset);
});

const phaseValue = isSine ? document.getElementById('phase') : document.getElementById('phase2');
phaseValue.addEventListener('input', () => {
    const target = isSine ? sinus : cosinus;
    const phase = parseFloat(phaseValue.value);
    target.setPhase(phase);
});


const toggle = isSine ? document.getElementById("toggle") : document.getElementById('toggle2');
toggle.addEventListener("click", () => {
    const target = isSine ? sinus : cosinus;
    target.isPlaying = !target.isPlaying;
    toggle.textContent = target.isPlaying ? "⏸ Pause" : "▶ Play";
    if (target.isPlaying) {
        target.draw();
    }
});